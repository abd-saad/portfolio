import React from 'react';
import { Shield } from 'lucide-react';
import { getCertifications } from '@/services';
import { THomepage } from '@/types';

interface CertificationSectionProps {
  content: THomepage;
}

export const CertificationSection = async ({ content }: CertificationSectionProps) => {
  const certifications = await getCertifications();

  return (
    <section id="certifications" className="py-20 bg-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h3>
          <p className="text-lg text-gray-600">{content.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
              <p className="text-sm text-gray-600 mb-1">{cert.provider}</p>
              <p className="text-xs text-gray-500">{cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 