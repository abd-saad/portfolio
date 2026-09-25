import React from "react";
import Image from "next/image";
import { ArrowDownRight, CheckCircle2, Terminal } from "lucide-react";
import { THomepage } from "@/types";
import { ScrollButtons, SocialLinks } from "@/components/ui";

interface HeroSectionProps {
  content: THomepage;
}

export const HeroSection: React.FC<HeroSectionProps> = async ({ content }) => {
  return (
    <section id="about" className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[420px] w-[420px] rounded-full bg-violet-500/[0.07] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <div className="section-shell relative z-10 flex min-h-[calc(100vh-5rem)] items-center py-20 lg:py-28">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
              Available for new opportunities
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
              {content.title}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              {content.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ScrollButtons />
              <SocialLinks />
            </div>

            <div className="mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ['Cloud-first', 'AWS infrastructure'],
                ['Automation', 'CI/CD & IaC'],
                ['Reliability', 'Observability & scale'],
              ].map(([title, label]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    {title}
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/10 to-violet-500/10 blur-2xl" />
            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] bg-slate-900">
                <Image
                  src="/api/profile-image"
                  alt="Abdullah Saad"
                  fill
                  preload
                  className="object-cover object-center grayscale-[20%]"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Current focus</p>
                      <p className="mt-1 text-sm font-semibold text-white">Platform reliability & automation</p>
                    </div>
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300">
                      <Terminal className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-xs font-medium text-slate-300 shadow-xl backdrop-blur-xl sm:flex">
              Explore the work <ArrowDownRight className="h-4 w-4 text-cyan-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};