'use client';

import React from 'react';

interface NavigationProps {
  sections: { section_type: string }[];
  isMobile?: boolean;
  onItemClick?: () => void;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Navigation: React.FC<NavigationProps> = ({ sections, isMobile = false, onItemClick }) => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    onItemClick?.();
  };

  const items = sections.filter((section) => section.section_type !== 'contact');

  if (isMobile) {
    return (
      <nav className="flex flex-col gap-1 px-5 py-5">
        {items.map((section) => (
          <button
            key={section.section_type}
            onClick={() => scrollToSection(section.section_type)}
            className="rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            {capitalize(section.section_type)}
          </button>
        ))}
        <button
          onClick={() => scrollToSection('contact')}
          className="mt-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950"
        >
          Let&apos;s talk
        </button>
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl">
      {items.map((section) => (
        <button
          key={section.section_type}
          onClick={() => scrollToSection(section.section_type)}
          className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >
          {capitalize(section.section_type)}
        </button>
      ))}
    </nav>
  );
};