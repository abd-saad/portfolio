'use client'

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Send, 
  Github, 
  Linkedin, 
  CheckCircle,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
// import contacts from '@/data/contacts.json';

type TBaseContact = {
  type: string;
  value: string;
};

type TContactItem = TBaseContact & {
  label?: string;
  href?: string;
  description?: string;
  icon: LucideIcon;
};

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        console.error('Email send failed');
      }
    } catch (err) {
      console.error(err);
    }

    setIsSubmitting(false);
  };

  // const contactItems: TContactItem[] = contacts.map((item) => {
  //   if (item.type === "email") {
  //     return {
  //       ...item,
  //       label: "Email",
  //       href: `mailto:${item.value}`,
  //       description: "Drop me a line anytime",
  //       icon: Mail,
  //     };
  //   } else if (item.type === "phone") {
  //     return {
  //       ...item,
  //       label: "Telepon",
  //       href: `tel:${item.value}`,
  //       description: "Available Mon-Fri, 9AM-6PM GMT+7",
  //       icon: Phone,
  //     };
  //   }

  //   throw new Error;
  // });

  const socialLinks = [
    { icon: Github, href: 'https://github.com/abd-saad', label: 'GitHub', username: '@abd-saad' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', username: '/in/devops-engineer' }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to optimize your infrastructure? Let's discuss how I can help scale your systems 
            and streamline your deployment processes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h3>
              <p className="text-gray-600 leading-relaxed">
                I'm always interested in discussing new opportunities, whether it's optimizing existing 
                infrastructure, building new cloud architectures, or consulting on DevOps best practices.
              </p>
            </div>

            {/* Contact Details */}
            {/* <div className="space-y-6 mb-8">
              {contactItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-start p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-gray-900 font-medium">{item.value}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div> */}

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="group relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                    title={social.username}
                  >
                    <social.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.username}
                    </div>
                  </a>
                ))}
              </div>
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
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                    placeholder="Tell me about your project, infrastructure challenges, or how I can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                    isSubmitting 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};