'use client'

import React from 'react';
import { 
  Cloud, 
  Container,
  Code,
  GitBranch, 
  Monitor,
  Shield
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Cloud Platforms',
      icon: Cloud,
      skills: [
        { name: 'AWS', level: 95, color: 'from-orange-500 to-yellow-500' },
        { name: 'Azure', level: 85, color: 'from-blue-500 to-cyan-500' },
        { name: 'Google Cloud', level: 80, color: 'from-green-500 to-blue-500' },
        { name: 'DigitalOcean', level: 90, color: 'from-blue-600 to-purple-600' }
      ]
    },
    {
      title: 'Container & Orchestration',
      icon: Container,
      skills: [
        { name: 'Docker', level: 95, color: 'from-blue-500 to-blue-600' },
        { name: 'Kubernetes', level: 90, color: 'from-blue-600 to-purple-600' },
        { name: 'OpenShift', level: 75, color: 'from-red-500 to-pink-500' },
        { name: 'Docker Swarm', level: 80, color: 'from-teal-500 to-cyan-500' }
      ]
    },
    {
      title: 'Infrastructure as Code',
      icon: Code,
      skills: [
        { name: 'Terraform', level: 95, color: 'from-purple-500 to-indigo-500' },
        { name: 'Ansible', level: 90, color: 'from-red-500 to-orange-500' },
        { name: 'CloudFormation', level: 85, color: 'from-orange-500 to-yellow-500' },
        { name: 'Pulumi', level: 70, color: 'from-purple-600 to-pink-600' }
      ]
    },
    {
      title: 'CI/CD & Version Control',
      icon: GitBranch,
      skills: [
        { name: 'Jenkins', level: 90, color: 'from-blue-600 to-teal-600' },
        { name: 'GitLab CI', level: 95, color: 'from-orange-500 to-red-500' },
        { name: 'GitHub Actions', level: 85, color: 'from-gray-700 to-gray-900' },
        { name: 'ArgoCD', level: 80, color: 'from-blue-500 to-purple-500' }
      ]
    },
    {
      title: 'Monitoring & Logging',
      icon: Monitor,
      skills: [
        { name: 'Prometheus', level: 90, color: 'from-orange-500 to-red-500' },
        { name: 'Grafana', level: 95, color: 'from-orange-400 to-yellow-400' },
        { name: 'ELK Stack', level: 85, color: 'from-yellow-500 to-green-500' },
        { name: 'Datadog', level: 80, color: 'from-purple-500 to-pink-500' }
      ]
    },
    {
      title: 'Security & Compliance',
      icon: Shield,
      skills: [
        { name: 'AWS Security', level: 90, color: 'from-red-500 to-orange-500' },
        { name: 'Vault', level: 85, color: 'from-yellow-500 to-orange-500' },
        { name: 'SAST/DAST', level: 80, color: 'from-green-500 to-teal-500' },
        { name: 'Compliance', level: 85, color: 'from-blue-500 to-indigo-500' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive skill set covering the entire DevOps lifecycle, from infrastructure provisioning 
            to deployment automation and monitoring.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${(categoryIndex * 4 + skillIndex) * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        {/* <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Certifications</h3>
            <p className="text-lg text-gray-600">Professional certifications and achievements</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'AWS Solutions Architect', provider: 'Amazon Web Services', year: '2023' },
              { name: 'Certified Kubernetes Administrator', provider: 'CNCF', year: '2023' },
              { name: 'Azure DevOps Engineer', provider: 'Microsoft', year: '2022' },
              { name: 'Terraform Associate', provider: 'HashiCorp', year: '2022' }
            ].map((cert, index) => (
              <div
                key={cert.name}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{cert.provider}</p>
                <p className="text-xs text-gray-500">{cert.year}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Skills;