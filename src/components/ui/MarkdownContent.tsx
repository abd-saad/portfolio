import React, { Fragment, type ReactNode } from 'react';

type MarkdownContentProps = {
  content: string | null | undefined;
  className?: string;
};

type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'code'; language?: string; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

const safeHref = (href: string) => {
  const value = href.trim();
  if (/^(https?:\/\/|mailto:|\/|#)/i.test(value)) return value;
  return '#';
};

function renderInline(input: string): ReactNode[] {
  const tokenPattern = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\([^\s)]+\)|\*[^*]+\*|_[^_]+_)/g;
  const parts = input.split(tokenPattern).filter(Boolean);

  return parts.map((part, index) => {
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      return <strong key={index} className="font-semibold text-[var(--text)]">{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="rounded-md border border-[var(--line)] bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-[.9em] text-[var(--text)]">{part.slice(1, -1)}</code>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (linkMatch) {
      const href = safeHref(linkMatch[2]);
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          key={index}
          href={href}
          className="font-medium text-[var(--text)] underline decoration-[var(--line-strong)] underline-offset-4 hover:text-[var(--accent)]"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {linkMatch[1]}
        </a>
      );
    }

    if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableDivider(line: string) {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseBlocks(content: string): Block[] {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```\s*([\w-]+)?\s*$/);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: 'code', language: fence[1], text: code.join('\n') });
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2].trim() });
      index += 1;
      continue;
    }

    if (line.trimStart().startsWith('> ')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trimStart().startsWith('> ')) {
        quote.push(lines[index].trimStart().slice(2));
        index += 1;
      }
      blocks.push({ type: 'blockquote', text: quote.join('\n') });
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*+]\s+/, '').trim());
        index += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, '').trim());
        index += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const headers = splitTableRow(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^```/.test(lines[index]) &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^\s*[-*+]\s+/.test(lines[index]) &&
      !/^\s*\d+\.\s+/.test(lines[index]) &&
      !lines[index].trimStart().startsWith('> ') &&
      !(lines[index].includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1]))
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return blocks;
}

const headingClass = (level: number) => {
  if (level === 1) return 'text-3xl md:text-4xl';
  if (level === 2) return 'text-2xl md:text-3xl';
  if (level === 3) return 'text-xl md:text-2xl';
  return 'text-lg md:text-xl';
};

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  if (!content?.trim()) return null;

  const blocks = parseBlocks(content);

  return (
    <div className={`markdown-content grid gap-5 text-[15px] leading-8 text-[var(--muted)] md:text-base ${className}`.trim()}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${Math.min(block.level, 6)}` as keyof React.JSX.IntrinsicElements;
            return (
              <Tag key={index} className={`${headingClass(block.level)} mt-2 font-semibold tracking-[-.03em] text-[var(--text)]`}>
                {renderInline(block.text)}
              </Tag>
            );
          }
          case 'paragraph':
            return <p key={index}>{renderInline(block.text)}</p>;
          case 'blockquote':
            return (
              <blockquote key={index} className="border-l-2 border-[var(--accent)] pl-5 italic text-[var(--muted)]">
                {renderInline(block.text)}
              </blockquote>
            );
          case 'code':
            return (
              <div key={index} className="overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--surface-2)]">
                {block.language && <div className="border-b border-[var(--line)] px-4 py-2 text-[10px] font-bold uppercase tracking-[.08em] text-[var(--muted-2)]">{block.language}</div>}
                <pre className="overflow-x-auto p-4 text-sm leading-6 text-[var(--text)]"><code>{block.text}</code></pre>
              </div>
            );
          case 'ul':
            return (
              <ul key={index} className="grid list-disc gap-2 pl-6 marker:text-[var(--accent)]">
                {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
              </ul>
            );
          case 'ol':
            return (
              <ol key={index} className="grid list-decimal gap-2 pl-6 marker:font-semibold marker:text-[var(--accent)]">
                {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
              </ol>
            );
          case 'table':
            return (
              <div key={index} className="overflow-x-auto rounded-[16px] border border-[var(--line)]">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead className="bg-[var(--surface-2)] text-[var(--text)]">
                    <tr>{block.headers.map((header, cellIndex) => <th key={cellIndex} className="border-b border-[var(--line)] px-4 py-3 font-semibold">{renderInline(header)}</th>)}</tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-[var(--line)] last:border-0">
                        {block.headers.map((_, cellIndex) => <td key={cellIndex} className="px-4 py-3 align-top">{renderInline(row[cellIndex] ?? '')}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
