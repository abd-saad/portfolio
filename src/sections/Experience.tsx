'use client'

import React from 'react';
import { 
  Building, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Github,
  Award,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Senior DevOps Engineer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      type: 'Full-time',
      description: 'Leading DevOps initiatives for a high-traffic SaaS platform serving 1M+ users.',
      achievements: [
        'Reduced deployment time by 75% through advanced CI/CD pipeline optimization',
        'Architected multi-region AWS infrastructure supporting 99.99% uptime',
        'Implemented Infrastructure as Code reducing provisioning time by 60%',
        'Led migration from monolith to microservices architecture'
      ],
      technologies: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Docker', 'Prometheus'],
      metrics: {
        uptime: '99.99%',
        deployments: '500+',
        cost_savings: '40%'
      }
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudFirst Inc.',
      location: 'Austin, TX',
      period: '2020 - 2022',
      type: 'Full-time',
      description: 'Designed and maintained cloud infrastructure for multiple client projects.',
      achievements: [
        'Built automated deployment pipelines for 15+ applications',
        'Implemented monitoring solutions reducing incident response time by 50%',
        'Migrated legacy systems to cloud-native architecture',
        'Established security best practices and compliance frameworks'
      ],
      technologies: ['Azure', 'GitLab CI', 'Ansible', 'ELK Stack', 'Docker', 'Grafana'],
      metrics: {
        projects: '15+',
        response_time: '50%',
        automation: '85%'
      }
    },
    {
      title: 'Systems Administrator',
      company: 'StartupXYZ',
      location: 'Remote',
      period: '2019 - 2020',
      type: 'Contract',
      description: 'Managed infrastructure and implemented DevOps practices for a growing startup.',
      achievements: [
        'Set up complete CI/CD pipeline from scratch',
        'Containerized all applications using Docker',
        'Implemented backup and disaster recovery procedures',
        'Automated server provisioning and configuration'
      ],
      technologies: ['DigitalOcean', 'GitHub Actions', 'Docker', 'Nginx', 'PostgreSQL'],
      metrics: {
        automation: '90%',
        downtime: '99.9%',
        efficiency: '70%'
      }
    }
  ];

  const projects = [
    {
      title: 'Multi-Cloud Kubernetes Platform',
      description: 'Designed and implemented a unified Kubernetes platform spanning AWS, Azure, and GCP for high availability and disaster recovery.',
      technologies: ['Kubernetes', 'Terraform', 'ArgoCD', 'Istio', 'Prometheus'],
      highlights: ['Zero-downtime deployments', 'Cross-cloud networking', 'Automated scaling'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Infrastructure as Code Framework',
      description: 'Built a comprehensive IaC framework using Terraform modules for rapid environment provisioning across multiple cloud providers.',
      technologies: ['Terraform', 'AWS', 'Azure', 'GCP', 'Vault'],
      highlights: ['95% faster provisioning', 'Cost optimization', 'Security compliance'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Observability Platform',
      description: 'Implemented end-to-end monitoring and logging solution with custom dashboards and automated alerting for microservices architecture.',
      technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger', 'AlertManager'],
      highlights: ['Real-time monitoring', 'Custom metrics', 'Automated remediation'],
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Experience Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5+ years of hands-on experience building scalable infrastructure and optimizing deployment processes
            </p>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Company Info */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl mr-4">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                        <p className="text-lg font-semibold text-blue-600">{exp.company}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {exp.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {exp.period}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {exp.type}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {Object.entries(exp.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-white rounded-lg border border-gray-200">
                          <div className="text-lg font-bold text-blue-600">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description & Achievements */}
                  <div className="lg:col-span-2">
                    <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>
                    
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

                    <div>
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showcase of complex infrastructure projects and innovative DevOps solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Highlights</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="h-3 w-3 text-green-500 mr-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;