'use client';

import React from 'react';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const navigationItems = ['About', 'Skills', 'Experience', 'Contact'];

export const Navigation: React.FC<NavigationProps> = ({ isMobile = false, onItemClick }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    onItemClick?.();
  };

  if (isMobile) {
    return (
      <nav className="px-4 py-4 space-y-3">
        {navigationItems.map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
          >
            {item}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigationItems.map((item) => (
        <button
          key={item}
          onClick={() => scrollToSection(item.toLowerCase())}
          className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
        >
          {item}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
        </button>
      ))}
    </nav>
  );
};