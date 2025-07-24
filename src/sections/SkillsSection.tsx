// This is a server component: SSR data fetching from Supabase
import React from 'react';
import { getSkillCategoriesWithSkills } from '@/services';
import { Cloud, Container, Code, GitBranch, Monitor, Shield } from 'lucide-react';
import { THomepage } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  cloud: Cloud,
  containerization: Container,
  iac: Code,
  version_control: GitBranch,
  monitoring: Monitor,
  security: Shield,
};

interface SkillsSectionProps {
  content: THomepage;
}

export const SkillsSection = async ({ content }: SkillsSectionProps) => {
  const categories = await getSkillCategoriesWithSkills();
  function getSkillLevelProps(level: string | null | undefined) {
    switch (level) {
      case "beginner":
        return { label: "Beginner", bg: "bg-yellow-100 text-yellow-800" };
      case "intermediate":
        return { label: "Intermediate", bg: "bg-blue-100 text-blue-800" };
      case "advanced":
        return { label: "Advanced", bg: "bg-green-100 text-green-800" };
      default:
        return { label: "Not Rated", bg: "bg-gray-100 text-gray-500" };
    }
  }
  
  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => {
            const Icon = iconMap[category.type || ''] || Code;
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill) => {
                    const { label, bg } = getSkillLevelProps(skill.level);
                    return (
                      <div key={skill.id} className="relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${bg}`}>
                            {label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}