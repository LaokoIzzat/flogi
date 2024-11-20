'use client';

import React from 'react';
import Background from './layout/Background.js';
import Logo from './components/Logo.js';
import NotificationForm from './components/NotificationForm';
import SocialLinks from './components/SocialLinks.js';

const Home = () => {
  return (
    <div className="scroll-container">
      <main className="min-h-screen flex flex-col">
        <div className="relative flex-1 flex flex-col items-center justify-center p-8 pb-16 sm:pb-8 bg-black">

          <Background />

          {/*blue/purple gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent" />

          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
          
          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
            <Logo />
            
            <p className="text-lg text-gray-300 font-light tracking-wide mb-6">
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
            
            {/* Social links */}
            <div className="mt-0">
              <SocialLinks />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;