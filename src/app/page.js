'use client';

import Background from './layout/Background.js';
import Logo from './components/Logo.js';
import NotificationForm from './components/NotificationForm';
import SocialLinks from './components/SocialLinks.js';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1 flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-900 to-black relative">
        <Background />
        {/* Main content container with proper centering */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
          <Logo />
          {/* Text content */}
          <p className="text-lg text-gray-400 font-light tracking-wide mb-6">
                Premium athletic wear for combat sports and fitness
          </p>
          <div className="space-y-6 mb-8">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight md:text-6xl text-white">
              <span className="font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-gradient-x">
                Coming Soon
              </span>
            </h1>
          </div>
          <NotificationForm />
          <SocialLinks />
        </div>
      </main>
    </div>
  );
}
