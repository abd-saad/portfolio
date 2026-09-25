'use client';

import { Download, FileText, Eye, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

export const ScrollButtons = () => {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstItem = useRef<HTMLAnchorElement>(null);
  const lastItem = useRef<HTMLButtonElement>(null);
  const initialFocus = useRef<'first' | 'last'>('first');
  const closeMenu = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    (initialFocus.current === 'first' ? firstItem : lastItem).current?.focus();
    const dismiss = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const downloadResume = async () => {
    closeMenu();
    setDownloading(true);
    setDownloadError('');
    try {
      const res = await fetch('/api/resume', { cache: 'no-store' });
      if (!res.ok) throw new Error('Download unavailable');
      const { url } = await res.json();
      if (typeof url !== 'string' || !url) throw new Error('Missing download URL');
      window.location.assign(url);
    } catch {
      setDownloadError('Unable to download the résumé. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2.5">
      <div
        ref={container}
        className="relative"
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
        onKeyDown={event => {
          if (event.key === 'Escape' && open) {
            event.preventDefault();
            closeMenu();
          }
        }}
      >
        <button
          ref={trigger}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          aria-busy={downloading}
          onClick={() => {
            initialFocus.current = 'first';
            setOpen(!open);
          }}
          onKeyDown={event => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              initialFocus.current = event.key === 'ArrowUp' ? 'last' : 'first';
              setOpen(true);
            }
          }}
          className="group inline-flex min-h-12 items-center gap-3 rounded-[14px] border border-[color-mix(in_srgb,var(--accent)_38%,var(--line))] bg-[var(--accent)] px-5 py-3 text-sm font-bold text-[var(--bg)] shadow-[0_10px_30px_color-mix(in_srgb,var(--accent)_18%,transparent)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_color-mix(in_srgb,var(--accent)_24%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[color-mix(in_srgb,var(--bg)_14%,transparent)]">
            <FileText aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span>{downloading ? 'Preparing…' : 'Resume'}</span>
            <span className="text-[10px] font-semibold opacity-70">Preview or download</span>
          </span>
          <ChevronDown aria-hidden="true" className={`ml-1 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div
            id={menuId}
            role="menu"
            aria-label="Resume"
            className="absolute left-0 top-full z-30 mt-2.5 w-[260px] overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-[var(--shadow)]"
            onKeyDown={event => {
              if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                event.preventDefault();
                const target = event.key === 'Home' ? firstItem.current
                  : event.key === 'End' ? lastItem.current
                  : document.activeElement === firstItem.current ? lastItem.current : firstItem.current;
                target?.focus();
              }
            }}
          >
            <a
              ref={firstItem}
              role="menuitem"
              tabIndex={-1}
              href="/api/resume?mode=preview"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="group flex items-center gap-3 rounded-[12px] px-3 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus:bg-[var(--surface-3)] focus:outline-none"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] text-[var(--accent)]">
                <Eye aria-hidden="true" className="h-4 w-4" />
              </span>
              <span>
                <span className="block">Preview resume</span>
                <span className="mt-0.5 block text-[11px] font-medium text-[var(--muted-2)]">Open in a new tab</span>
              </span>
            </a>

            <button
              ref={lastItem}
              type="button"
              role="menuitem"
              tabIndex={-1}
              aria-disabled={downloading}
              onClick={() => { if (!downloading) void downloadResume(); }}
              className="group flex w-full items-center gap-3 rounded-[12px] px-3 py-3 text-left text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus:bg-[var(--surface-3)] focus:outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] text-[var(--accent)]">
                <Download aria-hidden="true" className="h-4 w-4" />
              </span>
              <span>
                <span className="block">Download resume</span>
                <span className="mt-0.5 block text-[11px] font-medium text-[var(--muted-2)]">Save a PDF copy</span>
              </span>
            </button>
          </div>
        )}
      </div>

      {downloadError && (
        <p role="alert" className="max-w-72 rounded-[10px] border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400">
          {downloadError}
        </p>
      )}
    </div>
  );
};
