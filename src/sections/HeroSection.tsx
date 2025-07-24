import React from "react";
import Image from "next/image";
import { THomepage } from "@/types";
import { ScrollButtons, SocialLinks } from "@/components/ui";
import { getProfileImage } from "@/services";

interface HeroSectionProps {
  content: THomepage;
}

export const HeroSection: React.FC<HeroSectionProps> = async ({ content }) => {
  const profileImage = await getProfileImage();
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Available for new opportunities
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              {content.subtitle}
            </p>

            {/* Buttons (client component) */}
            <ScrollButtons />

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              <SocialLinks />
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative lg:order-first order-last">
            <div className="w-80 h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <Image
                src={profileImage ?? '/profile.jpg'}
                alt="Profile"
                width={320}
                height={320}
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};