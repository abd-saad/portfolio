import React from 'react';
import Image from 'next/image';
import { getCertifications } from '@/services';
import { THomepage } from '@/types';
import { convertDate } from '@/helper';
import { getBadgeImageSrc } from '@/helper/storageUrl';

interface CertificationSectionProps {
  content: THomepage;
}

export const CertificationSection = async ({ content }: CertificationSectionProps) => {
  const certifications = await getCertifications();
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="proto-section">
      <div className="section-shell">
        <div className="proto-section-head">
          <div>
            <p className="proto-kicker">04 / Certifications</p>
            <h2 className="proto-title">{content.title}</h2>
          </div>
          <p className="proto-intro">{content.subtitle}</p>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2">
          {certifications.map((cert) => {
            const badgeSrc = getBadgeImageSrc(cert.id, cert.badge_image_url, process.env.NEXT_PUBLIC_SUPABASE_URL);
            return (
              <article key={cert.id} className="flex min-h-[250px] flex-col rounded-[28px] border border-[var(--line)] bg-[linear-gradient(145deg,var(--surface),var(--surface-2))] p-7">
                <div className="grid h-[50px] w-[50px] place-items-center overflow-hidden rounded-[14px] border border-[color-mix(in_srgb,var(--accent)_22%,transparent)] bg-[var(--accent-soft)] text-[var(--accent)]">
                  {badgeSrc ? (
                    <Image src={badgeSrc} alt={cert.name} width={42} height={42} className="object-contain" sizes="42px" />
                  ) : (
                    <span className="text-xs font-black">CERT</span>
                  )}
                </div>

                <h3 className="mb-[7px] mt-6 text-2xl font-semibold tracking-[-.035em] text-[var(--text)]">{cert.name}</h3>
                <p className="m-0 text-sm text-[var(--muted)]">{cert.provider}</p>

                <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-end sm:justify-between">
                  {cert.valid_from && (
                    <div className="text-xs text-[var(--muted-2)]">
                      Issued {convertDate(cert.valid_from)}{cert.valid_until ? ` · Expires ${convertDate(cert.valid_until)}` : ''}
                    </div>
                  )}
                  {cert.credential_url && cert.credential_id && (
                    <a href={`${cert.credential_url}/badges/${cert.credential_id}`} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold text-[var(--text)] hover:text-[var(--accent)]">
                      View credential ↗
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};