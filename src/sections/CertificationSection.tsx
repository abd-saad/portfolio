import React from 'react';
import Image from 'next/image';
import { Shield, ExternalLink } from 'lucide-react';
import { getCertifications } from '@/services';
import { THomepage } from '@/types';
import { convertDate } from '@/helper';

interface CertificationSectionProps {
  content: THomepage;
}

export const CertificationSection = async ({ content }: CertificationSectionProps) => {
  const certifications = await getCertifications();

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                {cert.credential_url && cert.credential_id ? (
                  <Image
                    src={`${cert.badge_image_url}`}
                    alt={cert.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
              <p className="text-sm text-gray-600 mb-1">{cert.provider}</p>
              {cert.valid_from && (
                <p className="text-xs text-gray-500">
                  Issued: {convertDate(cert.valid_from)} | Expires: {cert.valid_until ? ` ${convertDate(cert.valid_until)}` : ''}
                </p>
              )}
              {cert.credential_url && cert.credential_id && (
                <a
                  href={`${cert.credential_url}/badges/${cert.credential_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View credential <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
