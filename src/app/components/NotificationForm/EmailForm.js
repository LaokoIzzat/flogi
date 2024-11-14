'use client';

import { Send, Loader2 } from 'lucide-react';

export default function EmailForm({ 
  email, 
  onEmailChange, 
  onSubmit, 
  isSubmitting, 
  isExiting 
}) {
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto h-11 px-6 bg-white text-black rounded-xl font-medium
                    transition-all duration-200 ease-out
                    hover:bg-opacity-90 hover:scale-[0.98]
                    active:scale-95
                    flex items-center justify-center gap-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Notify Me</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
