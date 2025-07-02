'use client';

import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { fetchSocialLinks, SocialLink } from '@/services/socialLinks';

const iconMap: Record<string, React.ElementType> = {
  Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export const SocialLinks: React.FC = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetchSocialLinks().then(setLinks);
  }, []);

  return (
    <div className="flex space-x-4">
      {links.map((social) => {
        const Icon = iconMap[social.icon] || Github;
        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            title={social.label}
          >
            <Icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {social.label}
            </div>
          </a>
        );
      })}
    </div>
  );
};