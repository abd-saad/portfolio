import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/legacy/image";
import { THomepage } from "@/types/homepage";
import { ScrollButtons } from "@/components/ui";

interface HeroSectionProps {
  content: THomepage;
}

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/abd-saad",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abdullah-saad-93a0181b3",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:abdullah.sd48@gmail.com",
    label: "Email",
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
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
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-md transition-all duration-200 group"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative lg:order-first order-last">
            <div className="w-80 h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <Image
                src="/profile.jpg"
                alt="Profile"
                layout="responsive"
                width={320}
                height={320}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};