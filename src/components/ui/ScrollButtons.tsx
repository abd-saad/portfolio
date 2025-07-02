'use client';

import { Download, ArrowDown, Mail } from 'lucide-react';

export const ScrollButtons = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = async () => {
    const res = await fetch('/api/resume');
    const { url } = await res.json();

    if (url) window.open(url, '_blank');
    else alert('Resume not found');
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={downloadResume}
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center group"
        >
          <Download className="mr-2 h-5 w-5" />
          Download Resume
          <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
        </button>

        <button
          onClick={() => scrollToSection('contact')}
          className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
        >
          <Mail className="mr-2 h-5 w-5" />
          Get In Touch
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('skills')}
          className="w-8 h-12 border-2 border-gray-400 rounded-full flex items-end justify-center pb-2 hover:border-blue-600 transition-colors group"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full group-hover:bg-blue-600 transition-colors"></div>
        </button>
      </div>
    </>
  );
};
