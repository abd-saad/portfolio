'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface NavigationProps {
  sections: { section_type: string; enabled: boolean }[];
  isMobile?: boolean;
  onItemClick?: () => void;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Navigation: React.FC<NavigationProps> = ({ sections, isMobile = false, onItemClick }) => {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (sectionId: string, enabled: boolean) => {
    if (!enabled) {
      if (pathname === '/') {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/#${sectionId}`);
      }
      onItemClick?.();
      return;
    }

    if (sectionId === 'solutions' || sectionId === 'blog') {
      router.push(`/${sectionId}`);
      onItemClick?.();
      return;
    }

    if (pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      onItemClick?.();
      return;
    }

    router.push(`/#${sectionId}`);
    onItemClick?.();
  };

  const itemClassName = isMobile
    ? 'rounded-[10px] px-3 py-2.5 text-left text-[13px] font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-3)] hover:text-[var(--text)]'
    : 'rounded-[10px] px-[11px] py-2 text-[13px] font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-3)] hover:text-[var(--text)]';

  return (
    <nav
      className={isMobile
        ? 'mx-3 flex flex-col gap-1 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2.5 shadow-[var(--shadow)]'
        : 'hidden items-center gap-1 md:flex'}
      aria-label="Primary navigation"
    >
      {sections.map((section) => (
        <button
          key={section.section_type}
          onClick={() => navigate(section.section_type, section.enabled)}
          className={itemClassName}
          title={section.enabled ? undefined : 'Coming soon'}
          aria-label={`${capitalize(section.section_type)}${section.enabled ? '' : ' — Coming soon'}`}
        >
          {capitalize(section.section_type)}
          {!section.enabled && <span className="ml-1 text-[10px] uppercase tracking-[.08em] text-[var(--muted-2)]">Soon</span>}
        </button>
      ))}
    </nav>
  );
};
