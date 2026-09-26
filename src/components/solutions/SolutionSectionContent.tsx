'use client';

import { useEffect, useState } from 'react';
import { MarkdownContent } from '@/components/ui/MarkdownContent';
import type { SolutionSection } from '@/services/solutions';

type BlockData = {
  source?: string;
  svg?: string;
  url?: string;
  alt?: string;
  caption?: string;
};

function getData(section: SolutionSection): BlockData {
  const value = section.data;
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as BlockData) : {};
}

function Figure({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-3">
      {children}
      {caption && <figcaption className="px-2 pb-1 pt-3 text-center text-xs leading-5 text-[var(--muted-2)]">{caption}</figcaption>}
    </figure>
  );
}

function ExcalidrawBlock({ data }: { data: BlockData }) {
  const [svg, setSvg] = useState(data.svg ?? '');

  useEffect(() => {
    let active = true;
    if (data.svg || !data.source) return;

    async function render() {
      try {
        const scene = JSON.parse(data.source!);
        const { exportToSvg } = await import('@excalidraw/excalidraw');
        const node = await exportToSvg({
          elements: scene.elements ?? [],
          appState: { ...(scene.appState ?? {}), exportWithDarkMode: false },
          files: scene.files ?? {},
        });
        if (active) setSvg(node.outerHTML);
      } catch {
        if (active) setSvg('');
      }
    }

    void render();
    return () => {
      active = false;
    };
  }, [data.source, data.svg]);

  if (!svg) return <p className="text-sm text-[var(--muted)]">Diagram preview unavailable.</p>;

  return (
    <Figure caption={data.caption}>
      <div
        className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-h-[720px] [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </Figure>
  );
}

function DrawioBlock({ data }: { data: BlockData }) {
  if (data.svg) {
    return (
      <Figure caption={data.caption}>
        <div
          className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-h-[720px] [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: data.svg }}
        />
      </Figure>
    );
  }

  return <p className="text-sm text-[var(--muted)]">Draw.io source is saved, but this block needs an exported SVG before it can be displayed publicly.</p>;
}

export function SolutionSectionContent({ section }: { section: SolutionSection }) {
  const data = getData(section);

  switch (section.section_type) {
    case 'excalidraw':
      return <ExcalidrawBlock data={data} />;
    case 'drawio':
      return <DrawioBlock data={data} />;
    case 'image':
      return data.url ? (
        <Figure caption={data.caption}>
          {/* CMS-managed image URLs can be external, so keep this as a native image. */}
          <img src={data.url} alt={data.alt ?? ''} className="mx-auto h-auto max-h-[720px] max-w-full rounded-[12px]" />
        </Figure>
      ) : null;
    case 'markdown':
    default:
      return <MarkdownContent content={section.content ?? ''} />;
  }
}
