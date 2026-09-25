'use client'

import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Navigation } from './Navigation';

interface HeaderProps {
  sections: { section_type: string }[];
}

export const Header: React.FC<HeaderProps> = ({ sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = window.localStorage.getItem('theme') as 'dark' | 'light' | null;
    const nextTheme = saved ?? 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('theme', nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 py-3.5 backdrop-blur-[18px]">
      <div className="section-shell relative flex items-center justify-between gap-5 rounded-[18px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_83%,transparent)] py-2.5 pl-[18px] pr-3 shadow-[0_12px_40px_rgba(0,0,0,.12)]">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-sm font-[760] tracking-[-.02em] text-[var(--text)]"
          aria-label="Back to top"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_22px_var(--accent)]" />
          abd_saad.dev
        </button>

        <Navigation sections={sections} />

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="grid h-[38px] w-[38px] place-items-center rounded-[11px] border border-[var(--line)] bg-transparent text-[var(--muted)] transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-3)] hover:text-[var(--text)]"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            className="grid h-[38px] w-[38px] place-items-center rounded-[11px] border border-[var(--line)] bg-transparent text-[var(--muted)] transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-3)] hover:text-[var(--text)] md:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-[58px] md:hidden">
            <Navigation sections={sections} isMobile onItemClick={() => setIsMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
};