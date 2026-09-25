import React from "react";
import { THomepage } from "@/types";
import { ScrollButtons, SocialLinks } from "@/components/ui";

interface HeroSectionProps {
  content: THomepage;
}

export const HeroSection: React.FC<HeroSectionProps> = async ({ content }) => {
  return (
    <section id="about" className="pt-[108px] pb-[72px] sm:pt-[132px]">
      <div className="section-shell grid items-end gap-12 lg:grid-cols-[1.28fr_.72fr] lg:gap-[72px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[13px] font-bold text-[var(--muted)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--accent)] shadow-[0_0_16px_var(--accent)]" />
            Available for new opportunities
          </div>

          <h1 className="mt-6 max-w-[850px] text-[clamp(54px,8vw,100px)] font-[760] leading-[.94] tracking-[-.062em] text-[var(--text)]">
            {content.title}
          </h1>

          <p className="mt-6 max-w-[710px] text-[clamp(17px,2vw,21px)] leading-[1.68] tracking-[-.018em] text-[var(--muted)]">
            {content.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ScrollButtons />
            <SocialLinks />
          </div>
        </div>

        <aside className="rounded-[28px] border border-[var(--line)] bg-[linear-gradient(145deg,var(--surface),var(--surface-2))] p-6 shadow-[var(--shadow)] sm:p-[26px]" aria-label="DevOps profile snapshot">
          <div className="mb-6 flex gap-[7px]">
            <span className="h-2 w-2 rounded-full bg-[var(--muted-2)] opacity-55" />
            <span className="h-2 w-2 rounded-full bg-[var(--muted-2)] opacity-55" />
            <span className="h-2 w-2 rounded-full bg-[var(--muted-2)] opacity-55" />
          </div>

          <div className="font-mono text-[13px] leading-6 text-[var(--muted)]">
            <p><span className="text-[var(--accent)]">$</span> <span className="text-[var(--text)]">whoami</span></p>
            <p>abdullah-saad / devops-engineer</p>
            <p className="mt-2"><span className="text-[var(--accent)]">$</span> <span className="text-[var(--text)]">focus --current</span></p>
            <p>cloud · platform · reliability · automation</p>
            <p className="mt-2"><span className="text-[var(--accent)]">$</span> <span className="text-[var(--text)]">status</span></p>
            <p><span className="text-[var(--accent)]">●</span> shipping reliable infrastructure</p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2.5">
            <div className="rounded-[14px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_32%,transparent)] p-3 sm:p-4">
              <strong className="block text-xl tracking-[-.04em] text-[var(--text)]">AWS</strong>
              <span className="text-[11px] text-[var(--muted)]">cloud platform</span>
            </div>
            <div className="rounded-[14px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_32%,transparent)] p-3 sm:p-4">
              <strong className="block text-xl tracking-[-.04em] text-[var(--text)]">K8s</strong>
              <span className="text-[11px] text-[var(--muted)]">orchestration</span>
            </div>
            <div className="rounded-[14px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_32%,transparent)] p-3 sm:p-4">
              <strong className="block text-xl tracking-[-.04em] text-[var(--text)]">IaC</strong>
              <span className="text-[11px] text-[var(--muted)]">automation</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};