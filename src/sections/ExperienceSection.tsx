import React from 'react';
import { Building, Calendar, MapPin, Award, Clock, CheckCircle } from 'lucide-react';
import { getExperiences } from '@/services';
import { THomepage } from '@/types';
import { formatExperiencePeriod } from '@/helper/formatExperiencePeriod';

interface ExperienceSectionProps {
  content: THomepage;
}

export const ExperienceSection = async ({ content }: ExperienceSectionProps) => {
  const experiences = await getExperiences();
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Experience Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.subtitle}
            </p>
          </div>
          <div className="space-y-12">
            {experiences.map((exp) => {
              const period = formatExperiencePeriod(exp.start, exp.end, exp.period);
              const hasDetails = exp.achievements.length > 0 || exp.technologies.length > 0;
              return (
              <div
                key={exp.id}
                className="relative bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Company Info */}
                  <div className={hasDetails ? 'min-w-0 lg:col-span-1' : 'min-w-0 lg:col-span-3'}>
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl mr-4 shrink-0">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0 break-words">
                        <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                        <p className="text-lg font-semibold text-blue-600">{exp.company}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      {exp.location.trim() && <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {exp.location}
                      </div>}
                      {period.trim() && <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {period}
                      </div>}
                      {exp.type.trim() && <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {exp.type}
                      </div>}
                    </div>
                  </div>
                  {/* Achievements */}
                  {hasDetails && <div className="min-w-0 break-words lg:col-span-2">
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-orange-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      </div>
                    )}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <>
                      <h4 className="font-semibold text-gray-900 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </>
                    )}
                  </div>}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
