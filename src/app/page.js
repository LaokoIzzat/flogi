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
        <div className="flex-1 flex flex-col items-center justify-center p-8 pb-16 sm:pb-8 bg-gradient-to-b from-gray-900 to-black relative">
          <Background />
          
          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
            <Logo />
            
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
            
            {/* Adjusted spacing for social links */}
            <div className="mt=2">
              <SocialLinks />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;