'use client'

import React from 'react';

interface FooterProps {
  sections: { section_type: string }[];
}

export const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pb-12 pt-8">
      <div className="section-shell flex flex-col gap-5 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted-2)] sm:flex-row sm:items-center sm:justify-between">
        <div>© {currentYear} Abdullah Saad. Built around reliability, clarity, and craft.</div>
        <div className="flex flex-wrap gap-4">
          <a href="mailto:abdullah.sd48@gmail.com" className="transition hover:text-[var(--text)]">Email</a>
          <a href="https://github.com/abd-saad" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--text)]">GitHub</a>
          <a href="https://linkedin.com/in/abdullah-saad-93a0181b3" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--text)]">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};