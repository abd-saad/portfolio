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
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = async () => {
    closeMenu();
    setDownloading(true);
    setDownloadError('');
    try {
      const res = await fetch('/api/resume', { cache: 'no-store' });
      if (!res.ok) throw new Error('Download unavailable');
      const { url } = await res.json();
      if (typeof url !== 'string' || !url) throw new Error('Missing download URL');
      // The signed URL requests an attachment; same-tab navigation avoids popup blockers.
      window.location.assign(url);
    } catch {
      setDownloadError('Unable to download the résumé. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-3">
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
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            <FileText aria-hidden="true" className="mr-2 h-5 w-5" />
            {downloading ? 'Preparing download…' : 'Resume'}
            <ChevronDown aria-hidden="true" className={`ml-2 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div
              id={menuId}
              role="menu"
              aria-label="Resume"
              className="absolute left-0 top-full z-30 mt-2 w-full min-w-56 rounded-lg border border-gray-200 bg-white p-1.5 text-gray-800 shadow-xl"
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
                className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
              >
                <Eye aria-hidden="true" className="h-4 w-4 text-blue-600" />
                Preview Resume<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <button
                ref={lastItem}
                type="button"
                role="menuitem"
                tabIndex={-1}
                aria-disabled={downloading}
                onClick={() => { if (!downloading) void downloadResume(); }}
                className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium hover:bg-blue-50 focus:bg-blue-50 focus:outline-none aria-disabled:opacity-50"
              >
                <Download aria-hidden="true" className="h-4 w-4 text-blue-600" />
                Download Resume
              </button>
            </div>
          )}
        </div>
        {downloadError && <p role="alert" className="max-w-64 text-sm text-red-700">{downloadError}</p>}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('skills')}
          className="w-8 h-12 border-2 border-gray-400 rounded-full flex items-end justify-center pb-2 hover:border-blue-600 transition-colors group"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full group-hover:bg-blue-600 transition-colors"></div>
        </button>
      </div>
    </>
  );
};
