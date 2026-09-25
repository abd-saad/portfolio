import React from 'react';
import Image from 'next/image';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { getCertifications } from '@/services';
import { THomepage } from '@/types';
import { convertDate } from '@/helper';
import { getBadgeImageSrc } from '@/helper/storageUrl';

interface CertificationSectionProps {
  content: THomepage;
}

export const CertificationSection = async ({ content }: CertificationSectionProps) => {
  const certifications = await getCertifications();

  return (
    <section id="certifications" className="py-24 sm:py-32">
      <div className="section-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">Credentials</span>
          <h2 className="section-title mt-5">{content.title}</h2>
          <p className="section-copy mt-5">{content.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => {
            const badgeSrc = getBadgeImageSrc(cert.id, cert.badge_image_url, process.env.NEXT_PUBLIC_SUPABASE_URL);
            return (
              <article key={cert.id} className="glass-panel card-hover rounded-3xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                    {badgeSrc ? (
                      <Image src={badgeSrc} sizes="56px" loading="lazy" alt={cert.name} width={56} height={56} className="object-contain p-1" />
                    ) : (
                      <ShieldCheck className="h-7 w-7 text-cyan-300" />
                    )}
                  </div>
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-snug text-white">{cert.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{cert.provider}</p>
                {cert.valid_from && (
                  <p className="mt-4 text-xs leading-5 text-slate-500">
                    Issued {convertDate(cert.valid_from)}{cert.valid_until ? ` · Expires ${convertDate(cert.valid_until)}` : ''}
                  </p>
                )}
                {cert.credential_url && cert.credential_id && (
                  <a href={`${cert.credential_url}/badges/${cert.credential_id}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 transition hover:text-cyan-200">
                    Verify credential <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};