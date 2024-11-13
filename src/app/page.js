'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import BGEffects from './components/bgeffects';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsExiting(true);
    
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setIsSubmitting(false);
      setIsExiting(false);
      setShowSuccess(true);
    }, 300);
    
    setTimeout(() => {
      setShowSuccess(false);
      setTimeout(() => {
        setStatus('');
      }, 300);
    }, 9000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1 flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-black relative">
        <BGEffects />
        
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none animate-grain" />

        {/* Desktop pulse effects */}
        <div className="fixed hidden md:block" style={{
          width: '50vw',
          height: '50vw',
          top: '-20vh',
          left: '-25vw',
          background: 'rgb(59, 130, 246, 0.1)',
          borderRadius: '9999px',
          filter: 'blur(calc(4vw))'
        }} />
        <div className="fixed hidden md:block" style={{
          width: '50vw',
          height: '50vw',
          bottom: '-20vh',
          right: '-25vw',
          background: 'rgb(168, 85, 247, 0.1)',
          borderRadius: '9999px',
          filter: 'blur(calc(4vw))'
        }} />

        {/* Mobile pulse effects */}
        <div className="fixed top-0 -left-16 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl animate-slow-pulse-delayed md:hidden" />
        <div className="fixed bottom-0 -right-16 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl animate-slow-pulse-delayed md:hidden" />
        
        {/* Main content container with proper centering */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
          {/* Logo container */}
          <div className="w-48 h-48 relative group">
          <Image
            src="/images/Flogi-Pepsi-3D.gif"
            alt="Flogi Pepsi Logo"
            fill
            priority
            className="object-contain drop-shadow-2xl transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
          />
          </div>

          {/* Text content */}
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight md:text-6xl text-white">
              <span className="font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-gradient-x">
                Coming Soon
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 font-light tracking-wide">
              Something extraordinary is in development
            </p>
          </div>

          {/* Form section */}
          <div className="w-full max-w-md relative min-h-[70px]">
            {status === 'success' ? (
              <div className={`absolute inset-0 bg-emerald-500/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl 
                            border border-emerald-500/30 flex items-center justify-center gap-3 
                            shadow-lg shadow-emerald-500/10 transition-all duration-500 ease-in-out
                            ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">
                  Thank you for joining our waitlist. We'll be in touch soon.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`w-full transition-all duration-300 ease-in-out ${isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
                    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
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
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Be among the first to experience our launch
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
