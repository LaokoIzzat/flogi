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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
          
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 bg-white/5 text-white rounded-xl
                      border border-white/10 focus:border-white/20
                      focus:outline-none focus:ring-1 focus:ring-white/20
                      placeholder:text-gray-500 text-sm transition-all duration-300
                      relative backdrop-blur-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-white text-black rounded-xl font-medium
                    transition-all duration-300 hover:bg-opacity-90
                    flex items-center justify-center gap-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-lg shadow-white/10 hover:shadow-white/20
                    hover:-translate-y-0.5 active:translate-y-0"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Notify Me</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
