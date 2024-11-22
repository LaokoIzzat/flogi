'use client';

import { Send, Loader2 } from 'lucide-react';
import isEmail from 'validator/lib/isEmail';

export default function EmailForm({ 
  email, 
  onEmailChange, 
  onSubmit, 
  isSubmitting, 
  isExiting 
}) {
  const hasValidEmail = email.length > 0 && isEmail(email, {
    allow_utf8_local_part: false,
    require_tld: true,
    allow_ip_domain: false,
    domain_specific_validation: true,
    blacklisted_chars: '()<>[]\\,;:',
    host_blacklist: [],
  });

  return (
    <form onSubmit={onSubmit} className={`w-full transition-all duration-300 ease-in-out ${isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-0 
                        group-hover:opacity-[0.08] blur-sm transition-opacity duration-300" />
          
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Enter your email"
            required
            className="w-full h-11 px-4 bg-white/5 text-white rounded-xl
                      border border-white/10 
                      group-hover:border-white/20
                      focus:border-white/20 focus:bg-white/[0.07]
                      outline-none
                      placeholder:text-gray-500 text-sm 
                      transition-all duration-300
                      backdrop-blur-sm
                      relative"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <button
            type="submit"
            disabled={isSubmitting || !hasValidEmail}
            className={`w-full sm:w-auto h-11 px-6 bg-gray-850/95 text-white rounded-xl font-medium
                      transition-all duration-200 ease-out
                      hover:bg-gray-900/100 hover:scale-[0.98]
                      active:scale-95
                      flex items-center justify-center gap-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                      disabled:hover:scale-100
                      border border-white-700/50
                      shadow-lg shadow-gray-900/20
                      backdrop-blur-sm
                      overflow-hidden
                      ${hasValidEmail ? 'relative' : ''}`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Notify Me</span>
                <Send className="w-4 h-4" />
              </>
            )}
            
            {/* Shimmer effect */}
            {hasValidEmail && !isSubmitting && (
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
