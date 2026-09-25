'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Navigation } from './Navigation';

interface HeaderProps {
  sections: { section_type: string }[];
}

export const Header: React.FC<HeaderProps> = ({ sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl' : 'bg-transparent'}`}>
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between gap-4">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 font-mono text-sm font-bold text-cyan-200">AS</span>
            <span className="hidden text-sm font-semibold tracking-wide text-white sm:block">abd_saad.dev</span>
          </button>

          <Navigation sections={sections} />

          <div className="hidden md:block">
            <button onClick={scrollToContact} className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              Let&apos;s talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-[72px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-2xl md:hidden">
            <Navigation sections={sections} isMobile onItemClick={() => setIsMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
};