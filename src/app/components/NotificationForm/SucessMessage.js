'use client';

import { CheckCircle } from 'lucide-react';

export default function SuccessMessage({ show }) {
  return (
    <div className={`absolute inset-0 bg-emerald-500/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl 
                    border border-emerald-500/30 flex items-center justify-center gap-3 
                    shadow-lg shadow-emerald-500/10 transition-all duration-500 ease-in-out
                    ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <CheckCircle className="w-5 h-5 text-emerald-400" />
      <span className="text-sm font-medium">
        Thank you for joining our waitlist. We'll be in touch soon.
      </span>
    </div>
  );
}
