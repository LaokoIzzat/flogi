'use client';

import { Send, Loader2, AlertCircle, Check } from 'lucide-react';
import isEmail from 'validator/lib/isEmail';
import { useState } from 'react';

export default function EmailForm({ 
  email, 
  onEmailChange, 
  onSubmit, 
  isSubmitting, 
  isExiting 
}) {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  
  const hasValidEmail = email.length > 0 && isEmail(email, {
    allow_utf8_local_part: false,
    require_tld: true,
    allow_ip_domain: false,
    domain_specific_validation: true,
    blacklisted_chars: '()<>[]\\,;:',
    host_blacklist: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    setTouched(true);
    setFocused(false);

    if (hasValidEmail) {
      onSubmit(e);
    }
  };

  const handleButtonClick = () => {
    setAttemptedSubmit(true);
    setTouched(true);
    setFocused(false);
  };

  const showValidation = touched || attemptedSubmit;

  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate 
      className={`w-full transition-all duration-300 ease-in-out ${isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-0 
                        [@media(hover:hover)]:group-hover:opacity-[0.08] blur-sm transition-opacity duration-300" />
          
          <div className="relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                onEmailChange(e);
                setTouched(true);
              }}
              onBlur={() => {
                setTouched(true);
                setFocused(false);
              }}
              onFocus={() => setFocused(true)}
              placeholder="Enter your email"
              className={`w-full h-11 px-4 bg-white/5 text-white rounded-xl
                        border transition-all duration-300
                        outline-none
                        placeholder:text-gray-500 text-sm 
                        backdrop-blur-sm
                        pr-10
                        ${showValidation
                          ? email.length === 0
                            ? 'border-yellow-500/30 focus:border-yellow-500/50 bg-yellow-500/5'
                            : hasValidEmail 
                              ? 'border-green-500/30 focus:border-green-500/50 bg-green-500/5' 
                              : 'border-red-500/30 focus:border-red-500/50 bg-red-500/5'
                          : 'border-white/10 [@media(hover:hover)]:group-hover:border-white/20 focus:border-white/20 focus:bg-white/[0.07]'
                        }`}
            />
            
            {/* Validation icon - shows on empty field, invalid email, or valid email */}
            {showValidation && (
              <div className={`absolute right-3 transition-opacity duration-200 
                ${email.length === 0 ? 'text-yellow-400' : hasValidEmail ? 'text-green-500' : 'text-red-400'}`}>
                {email.length === 0 ? (
                  <AlertCircle className="w-4 h-4" />
                ) : hasValidEmail ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleButtonClick}
            className={`w-full sm:w-auto h-11 px-6 bg-gray-850/95 text-white rounded-xl font-medium
                      transition-all duration-200 ease-out
                      [@media(hover:hover)]:hover:bg-gray-900/100 [@media(hover:hover)]:hover:scale-[0.98]
                      active:scale-95
                      flex items-center justify-center gap-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                      disabled:hover:scale-100
                      border border-white/30
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
