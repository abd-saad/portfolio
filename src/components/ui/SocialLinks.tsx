'use client';

import React from 'react';
import { Github, Linkedin } from 'lucide-react';

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
  username: string;
}

const socialLinks: SocialLink[] = [
  { icon: Github, href: 'https://github.com/abd-saad', label: 'GitHub', username: '@abd-saad' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abdullah-saad-93a0181b3', label: 'LinkedIn', username: '/in/abdullah-saad' }
];

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1"
          title={social.username}
        >
          <social.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {social.username}
          </div>
        </a>
      ))}
    </div>
  );
};