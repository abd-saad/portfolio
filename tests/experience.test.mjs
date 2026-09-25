import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';

const loadDependency = createRequire(import.meta.url);

// Transpile isolated modules with explicit boundary mocks; no live database or email calls.
function load(file, mocks = {}) {
  const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  const loaded = { exports: {} };
  new Function('require', 'module', 'exports', outputText)(
    (id) => id === 'server-only' ? {} : Object.hasOwn(mocks, id) ? mocks[id] : loadDependency(id), loaded, loaded.exports,
  );
  return loaded.exports;
}

const arrays = load('src/helper/normalizeStringArray.ts');
const dates = load('src/helper/formatExperiencePeriod.ts');

test('normalizes supported arrays without changing content or order', () => {
  for (const value of [[' A ', '', '  ', 1, null, {}, 'B'], '[" A ","",1,null,{},"B"]']) {
    assert.deepEqual(arrays.normalizeStringArray(value), [' A ', 'B']);
  }
  for (const value of [null, undefined, {}, 1, 'broken', 'null', '{}', '"text"']) {
    assert.deepEqual(arrays.normalizeStringArray(value), []);
  }
});

test('formats complete dates and preserves fallback for incomplete or invalid ranges', () => {
  assert.equal(dates.formatExperiencePeriod('2020-01-01', '2024-03-01', 'old'), 'Jan 2020 – Mar 2024');
  for (const [start, end] of [
    ['2020-01-01', 'invalid'], [null, '2024-01-01'], ['invalid', '2024-01-01'],
    ['2023-02-29', '2024-01-01'], ['2025-01-01', '2024-01-01'],
  ]) {
    assert.equal(dates.formatExperiencePeriod(start, end, 'Existing period'), 'Existing period');
  }
});

test('null end dates mean Present and override stored period text', () => {
  assert.equal(dates.formatExperiencePeriod('2020-01-01', null, 'old'), 'Jan 2020 – Present');
  for (const start of [null, 'invalid', '2023-02-29']) {
    assert.equal(dates.formatExperiencePeriod(start, null, 'old'), 'Present');
  }
});

function service(result, captures = []) {
  return load('src/services/experience.ts', {
    'next/cache': { unstable_cache: (fn) => fn },
    '@sentry/nextjs': { captureException: (error) => captures.push(error) },
    '@/helper/normalizeStringArray': arrays,
    '@/lib/supabase/public': {
      createPublicClient: () => ({ from: () => ({ select: () => ({ order: async () => result }) }) }),
    },
  });
}

test('distinguishes empty experience results from reported query errors', async () => {
  assert.deepEqual(await service({ data: [], error: null }).getExperiences(), []);
  const captures = [];
  await assert.rejects(service({ data: null, error: { message: 'unavailable' } }, captures).getExperiences(), /Failed to load experiences/);
  assert.equal(captures.length, 1);
});

test('normalizes experience and project content at the service boundary', async () => {
  const api = service({ data: [{ achievements: 'broken', technologies: '["TS",null]', highlights: {} }], error: null });
  const [experience] = await api.getExperiences();
  assert.deepEqual(experience.achievements, []);
  assert.deepEqual(experience.technologies, ['TS']);
  const [project] = await api.getProjects();
  assert.deepEqual(project.highlights, []);
  assert.deepEqual(project.technologies, ['TS']);
});

async function section(experiences) {
  const { ExperienceSection } = load('src/sections/ExperienceSection.tsx', {
    '@/services': { getExperiences: async () => experiences },
    '@/helper/formatExperiencePeriod': dates,
  });
  return ExperienceSection({ content: { title: 'Experience', subtitle: 'Career' } });
}

test('hides an empty section and absent metadata and details', async () => {
  assert.equal(await section([]), null);
  const html = renderToStaticMarkup(await section([{
    id: 1, title: 'Engineer', company: 'A long company name '.repeat(10),
    location: '', period: '', type: '', start: null, end: '2024-03-01', achievements: [], technologies: [],
  }]));
  assert.doesNotMatch(html, /lucide-map-pin|lucide-calendar|lucide-clock|Key Achievements|Technologies Used/);
  assert.match(html, /lg:col-span-3/);
});

test('renders all achievements and formatted dates when details are available', async () => {
  const html = renderToStaticMarkup(await section([{
    id: 1, title: 'Engineer', company: 'Company', location: 'Remote', period: 'old', type: 'Full time',
    start: '2020-01-01', end: '2024-03-01', achievements: ['First outcome', 'Second outcome'], technologies: ['TS'],
  }]));
  for (const text of ['Jan 2020 – Mar 2024', 'First outcome', 'Second outcome', 'Remote', 'Full time', 'TS']) {
    assert.ok(html.includes(text));
  }
});

test('renders ongoing roles with and without a valid start date', async () => {
  for (const start of ['2020-01-01', null, 'invalid']) {
    const html = renderToStaticMarkup(await section([{
      id: 1, title: 'Engineer', company: 'Company', location: '', period: 'Outdated period', type: '',
      start, end: null, achievements: [], technologies: [],
    }]));
    assert.match(html, /Present/);
    assert.match(html, /lucide-calendar/);
    assert.doesNotMatch(html, /Outdated period/);
    if (start === '2020-01-01') assert.ok(html.includes('Jan 2020 – Present'));
  }
});
