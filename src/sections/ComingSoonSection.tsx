import { THomepage } from '@/types';

interface ComingSoonSectionProps {
  content: THomepage;
}

const formatSectionLabel = (sectionType?: string | null) => {
  if (!sectionType) return 'Section';

  return sectionType
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const ComingSoonSection = ({ content }: ComingSoonSectionProps) => {
  const sectionLabel = formatSectionLabel(content.section_type);

  return (
    <section id={content.section_type ?? undefined} className="proto-section">
      <div className="section-shell">
        <div className="rounded-[20px] border border-dashed border-[var(--line-strong)] bg-[var(--surface)] px-6 py-10 md:px-8 md:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <p className="proto-kicker">{sectionLabel}</p>
                <span className="rounded-full border border-[var(--line-strong)] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--muted-2)]">
                  Coming soon
                </span>
              </div>
              <h2 className="proto-title">{content.title ?? sectionLabel}</h2>
              {content.subtitle && <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">{content.subtitle}</p>}
            </div>

            <p className="max-w-sm text-sm leading-6 text-[var(--muted-2)] md:text-right">
              This section is being prepared and will be available soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
