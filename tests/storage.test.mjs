import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const dependency = createRequire(import.meta.url);
function setEnv(t, name, value) {
  const previous = process.env[name];
  process.env[name] = value;
  t.after(() => {
    if (previous === undefined) delete process.env[name];
    else process.env[name] = previous;
  });
}
function load(file, mocks = {}) {
  const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  const loaded = { exports: {} };
  new Function('require', 'module', 'exports', outputText)(
    id => id === 'server-only' ? {} : Object.hasOwn(mocks, id) ? mocks[id] : dependency(id),
    loaded, loaded.exports,
  );
  return loaded.exports;
}

const project = 'https://example.supabase.co';
const urls = load('src/helper/storageUrl.ts');

test('parses same-project object URLs and discards expired tokens', () => {
  for (const kind of ['public', 'authenticated', 'sign']) {
    assert.deepEqual(urls.parseStorageObjectUrl(`${project}/storage/v1/object/${kind}/assets/folder/badge%20one.png?token=expired`, project), {
      bucket: 'assets', path: 'folder/badge one.png',
    });
  }
});

test('rejects foreign, malformed, and ambiguous storage locations', () => {
  for (const value of [null, 'bad', `${project}.evil.test/storage/v1/object/public/assets/a.png`,
    'https://foreign.supabase.co/storage/v1/object/public/assets/a.png',
    `${project}/storage/v1/object/public/assets/`, `${project}/storage/v1/object/public/assets/%ZZ`,
    `${project}/storage/v1/object/public/assets%2Fother/a.png`,
    `${project}/storage/v1/object/public/assets/a%2F..%2Fb.png`,
    `${project}/storage/v1/object/public/assets/a%00.png`]) {
    assert.equal(urls.parseStorageObjectUrl(value, project), null);
  }
});

test('badge images use stable local URLs, preserve Credly, and hide invalid sources', () => {
  assert.equal(urls.getBadgeImageSrc(7, `${project}/storage/v1/object/public/assets/badge.png`, project), '/api/certifications/7/badge');
  const credly = 'https://images.credly.com/badge.png';
  assert.equal(urls.getBadgeImageSrc(7, credly, project), credly);
  for (const value of [null, 'not-a-url', 'https://foreign.supabase.co/storage/v1/object/public/assets/a.png']) {
    assert.equal(urls.getBadgeImageSrc(7, value, project), null);
  }
});

function signer(result) {
  const calls = [];
  const api = load('src/services/storage.ts', {
    '@/lib/supabase/storage': { createStorageClient: () => ({ storage: {
      from: bucket => ({ createSignedUrl: async (...args) => { calls.push([bucket, ...args]); return result; } }),
    } }) },
  });
  return { api, calls };
}

test('signs for five minutes with explicit download disposition', async () => {
  const { api, calls } = signer({ data: { signedUrl: 'https://signed.example/file' }, error: null });
  const resume = load('src/services/resume.ts', { '@/services/storage': api });
  const hero = load('src/services/hero.ts', { '@/services/storage': api });
  assert.equal(await resume.getResumeUrl(), 'https://signed.example/file');
  await hero.getProfileImage();
  assert.deepEqual(calls, [
    ['assets', 'resume.pdf', 300, { download: true }],
    ['assets', 'profile.jpg', 300, { download: false }],
  ]);
});

test('signing failures are sanitized and missing files map to 404', async () => {
  for (const [error, status] of [[{ statusCode: '404', message: 'private token' }, 404],
    [{ message: 'Object not found' }, 404], [{ message: 'private token' }, 500], [null, 500]]) {
    const { api } = signer({ data: null, error });
    await assert.rejects(api.signStorageAsset('assets', 'a'), failure => {
      assert.equal(failure.status, status);
      assert.ok(!failure.message.includes('private token'));
      return true;
    });
  }
});

const { api: storage } = signer({ data: null, error: null });
const reports = [];
const responses = load('src/lib/storageResponse.ts', {
  '@/services/storage': storage,
  '@sentry/nextjs': { captureException: error => reports.push(error) },
});

test('résumé route awaits signing and returns uncached JSON, including failures', async () => {
  const route = load('src/app/api/resume/route.ts', {
    '@/services/resume': { getResumeUrl: async () => 'https://signed.example/resume' },
    '@/lib/storageResponse': responses,
  });
  const response = await route.GET();
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { url: 'https://signed.example/resume' });
  const failed = load('src/app/api/resume/route.ts', {
    '@/services/resume': { getResumeUrl: async () => { throw new Error('secret token'); } },
    '@/lib/storageResponse': responses,
  });
  const failure = await failed.GET();
  assert.equal(failure.status, 500);
  assert.equal(failure.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await failure.json(), { error: 'Unable to load asset' });
  assert.ok(reports.every(error => !error.message.includes('secret token')));
});

test('profile route signs on every request and returns uncached redirects', async () => {
  let count = 0;
  const route = load('src/app/api/profile-image/route.ts', {
    '@/services/hero': { getProfileImage: async () => `https://signed.example/profile?token=${++count}` },
    '@/lib/storageResponse': responses,
  });
  const first = await route.GET();
  const second = await route.GET();
  assert.equal(first.status, 307);
  assert.equal(first.headers.get('cache-control'), 'no-store');
  assert.notEqual(first.headers.get('location'), second.headers.get('location'));
});

test('badge route signs only a stored same-project path and rejects invalid IDs and sources', async t => {
  setEnv(t, 'NEXT_PUBLIC_SUPABASE_URL', project);
  let value = `${project}/storage/v1/object/sign/assets/badge.png?token=expired`;
  let databaseError = null;
  const signed = [];
  const route = load('src/app/api/certifications/[id]/badge/route.ts', {
    '@/lib/supabase/public': { createPublicClient: () => ({ from: () => ({ select: () => ({ eq: () => ({
      maybeSingle: async () => ({ data: value ? { badge_image_url: value } : null, error: databaseError }),
    }) }) }) }) },
    '@/helper/storageUrl': urls,
    '@/services/storage': { ...storage, signStorageAsset: async (...args) => { signed.push(args); return 'https://signed.example/badge'; } },
    '@/lib/storageResponse': responses,
  });
  const request = id => route.GET(new Request('http://localhost/api/certifications/7/badge?path=secret'), { params: Promise.resolve({ id }) });
  const response = await request('7');
  assert.equal(response.status, 307);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(signed, [['assets', 'badge.png']]);
  for (const id of ['../secret', '1.5', '9007199254740993']) assert.equal((await request(id)).status, 404);
  for (const source of [null, 'https://foreign.supabase.co/storage/v1/object/public/assets/a.png', 'https://images.credly.com/a.png']) {
    value = source;
    assert.equal((await request('7')).status, 404);
  }
  assert.equal(signed.length, 1);
  databaseError = { message: 'database failed' };
  assert.equal((await request('7')).status, 500);
});

test('storage client requires server credentials and disables session persistence', t => {
  setEnv(t, 'NEXT_PUBLIC_SUPABASE_URL', project);
  setEnv(t, 'SUPABASE_SECRET_KEY', 'test-only-secret');
  let args;
  const client = load('src/lib/supabase/storage.ts', {
    '@supabase/supabase-js': { createClient: (...values) => { args = values; return {}; } },
  });
  client.createStorageClient();
  assert.equal(args[1], 'test-only-secret');
  assert.deepEqual(args[2].auth, { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false });
  process.env.SUPABASE_SECRET_KEY = '';
  assert.throws(() => client.createStorageClient(), /configuration is missing/);
});

test('cached section markup uses stable image routes and preserves external badge optimization', async t => {
  setEnv(t, 'NEXT_PUBLIC_SUPABASE_URL', project);
  const images = [];
  const imageMock = props => {
    images.push(props);
    return React.createElement('img', { src: props.src, alt: props.alt });
  };
  const hero = load('src/sections/HeroSection.tsx', {
    'next/image': imageMock,
    '@/components/ui': { ScrollButtons: () => null, SocialLinks: () => null },
  });
  const content = { title: 'Title', subtitle: 'Subtitle' };
  const heroHtml = renderToStaticMarkup(await hero.HeroSection({ content }));
  assert.equal(images[0].src, '/api/profile-image');
  assert.equal(images[0].unoptimized, true);
  assert.doesNotMatch(heroHtml, /token=|object\/public/);
  const badges = load('src/sections/CertificationSection.tsx', {
    'next/image': imageMock,
    '@/helper/storageUrl': urls,
    '@/helper': { convertDate: value => value },
    '@/services': { getCertifications: async () => [
      { id: 1, name: 'Private badge', badge_image_url: `${project}/storage/v1/object/sign/assets/a.png?token=expired` },
      { id: 2, name: 'External badge', badge_image_url: 'https://images.credly.com/b.png' },
      { id: 3, name: 'Missing badge', badge_image_url: null },
    ] },
  });
  const html = renderToStaticMarkup(await badges.CertificationSection({ content }));
  assert.equal(images.length, 3);
  assert.equal(images[1].src, '/api/certifications/1/badge');
  assert.equal(images[1].unoptimized, true);
  assert.equal(images[2].unoptimized, false);
  assert.doesNotMatch(html, /token=|expired|object\/public/);
  assert.match(html, /lucide-shield/);
});
