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
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    onItemClick?.();
  };

  if (isMobile) {
    return (
      <nav className="px-4 py-4 space-y-3">
        {sections.map((section) => (
          <button
            key={section.section_type}
            onClick={() => scrollToSection(section.section_type)}
            className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
          >
            {capitalize(section.section_type)}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {sections.map((section) => (
        <button
          key={section.section_type}
          onClick={() => scrollToSection(section.section_type)}
          className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
        >
          {capitalize(section.section_type)}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
        </button>
      ))}
    </nav>
  );
};