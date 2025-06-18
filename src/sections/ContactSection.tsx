import React from 'react';
import { ContactForm, SocialLinks } from '@/components/ui';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Let&apos;s Work Together</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to optimize your infrastructure? Let&apos;s discuss how I can help scale your systems 
            and streamline your deployment processes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h3>
              <p className="text-gray-600 leading-relaxed">
                I&apos;m always interested in discussing new opportunities, whether it&apos;s optimizing existing 
                infrastructure, building new cloud architectures, or consulting on DevOps best practices.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect With Me</h4>
              <SocialLinks />
            </div>

            {/* Availability Status */}
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <div>
                  <p className="font-semibold text-green-800">Available for New Projects</p>
                  <p className="text-sm text-green-600">Currently accepting new clients and consulting opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};