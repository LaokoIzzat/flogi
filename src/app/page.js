'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call - replace this with your actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStatus('success');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-custom-gray">
      <div className="text-center space-y-8 animate-fade-in max-w-md w-full">
        {/* Logo Container */}
        <div className="w-48 h-48 mx-auto mb-8 relative">
          <Image
            src="/images/Flogi-Pepsi-3D.gif" // Updated to GIF path
            alt="Flogi Pepsi Logo"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Coming Soon Text */}
        <h1 className="text-4xl font-bebas font-bold tracking-tight sm:text-6xl text-white uppercase">
          Coming Soon
        </h1>
        
        {/* Tagline */}
        <p className="mt-4 text-xl font-bebas text-gray-300 uppercase">
          Something Exciting Is In The Works
        </p>

        {/* Email Signup Form */}
        <div className="mt-8">
          {status === 'success' ? (
            <div className="bg-green-700 text-white p-4 rounded-md animate-fade-in font-bebas uppercase">
              Thank You For Signing Up! We’ll Keep You Updated.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  required
                  className="flex-1 px-4 py-2 border border-gray-400 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent font-bebas uppercase"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-black text-white font-bebas rounded-md hover:bg-gray-800 transition-colors uppercase
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isSubmitting ? 'SIGNING UP...' : 'NOTIFY ME'}
                </button>
              </div>
              <p className="text-sm font-bebas text-gray-400 uppercase">
                Be The First To Know When We Launch.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
