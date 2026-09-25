'use client';

import { Download, ArrowDown } from 'lucide-react';
import { useState } from 'react';

export const ScrollButtons = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = async () => {
    setDownloading(true);
    setDownloadError('');
    try {
      const res = await fetch('/api/resume', { cache: 'no-store' });
      if (!res.ok) throw new Error('Download unavailable');
      const { url } = await res.json();
      if (typeof url !== 'string' || !url) throw new Error('Missing download URL');
      // The signed URL requests an attachment; same-tab navigation avoids popup blockers.
      window.location.assign(url);
    } catch {
      setDownloadError('Unable to download the résumé. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={downloadResume}
          disabled={downloading}
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center group"
        >
          <Download className="mr-2 h-5 w-5" />
          {downloading ? 'Preparing download…' : 'Download Resume'}
          <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
      {downloadError && <p role="alert" className="mb-4 text-red-700">{downloadError}</p>}

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
