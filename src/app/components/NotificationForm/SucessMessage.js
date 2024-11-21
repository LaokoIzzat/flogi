'use client';

import { CheckCircle } from 'lucide-react';

export default function SuccessMessage({ show }) {
  return (
    <div className={`w-full transition-all duration-500 ease-in-out
                   ${show ? 'h-[140px]' : 'h-0'}`}>
      <div className="relative h-full w-full">
        <div className={`absolute inset-0 flex items-center justify-center
                      transition-all duration-500 ease-in-out
                      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90
                        backdrop-blur-sm text-white rounded-xl 
                        border border-white/5
                        flex flex-col items-center justify-center 
                        shadow-lg shadow-gray-900/20 
                        p-6 space-y-3
                        max-w-sm">
            <div className="relative">
              <div className="absolute -inset-1 bg-white/10 rounded-full blur-sm" />
              <CheckCircle className="w-8 h-8 text-white relative" />
            </div>
            <div className="flex flex-col items-center space-y-1.5 text-center">
              <p className="text-sm text-white/75">
                Thank you for joining our waitlist. We'll be in touch soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}