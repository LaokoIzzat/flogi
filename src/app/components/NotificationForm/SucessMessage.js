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
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                        backdrop-blur-sm text-white rounded-xl 
                        border border-white/5
                        flex flex-col items-center justify-center 
                        shadow-lg shadow-gray-900/20 
                        p-6 space-y-3
                        max-w-sm
                        before:absolute before:inset-0 before:rounded-xl
                        before:bg-gradient-to-br before:from-gray-800/50 before:via-gray-700/50 before:to-gray-800/50
                        before:opacity-0 before:hover:opacity-100
                        before:transition-opacity before:duration-500
                        relative overflow-hidden">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-sm" />
              <CheckCircle className="w-8 h-8 text-white relative" />
            </div>
            <div className="flex flex-col items-center space-y-1.5 text-center relative">
              <p className="text-sm text-white/75">
                Thank you for joining our waitlist. We&apos;ll be in touch soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
