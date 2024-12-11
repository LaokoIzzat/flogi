'use client';

import React, { useEffect } from 'react';
import Background from './layout/Background.js';
import Logo from './components/Logo.js';
import NotificationForm from './components/NotificationForm';
import SocialLinks from './components/SocialLinks.js';
import gsap from 'gsap';

const Home = () => {
  useEffect(() => {
    // Set initial states
    gsap.set('.content-wrapper', {
      opacity: 0
    });
    
    // Set initial states for all animated elements
    gsap.set('.logo-container', {
      opacity: 0,
      scale: 1.2,
      filter: 'blur(10px)'
    });

    gsap.set('.description, .title-container', {
      opacity: 0,
      y: 30,
      filter: 'blur(5px)'
    });

    gsap.set('.form-wrapper', {
      visibility: 'hidden',
      opacity: 0,
      y: 40
    });

    gsap.set('.social-links', {
      opacity: 0,
      y: 20
    });

    gsap.set(['.grid-background', '.gradient-overlay'], {
      opacity: 0
    });
    
    const animateContent = () => {
      const tl = gsap.timeline({ delay: 0.25 });
      
      // Fade in the background elements
      tl.to('.grid-background', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      })
      .to('.gradient-overlay', {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.3");

      // Animate content wrapper
      tl.to('.content-wrapper', {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.2");

      // Cinematic reveal animation sequence
      tl.to('.logo-container', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: "power4.out"
      })
      .to('.description', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.9")
      .to('.title-container', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .to('.form-wrapper', {
        visibility: 'visible',
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .to('.social-links', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");
    };

    animateContent();
  }, []);

  return (
    <div className="scroll-container">
      <main className="min-h-screen flex flex-col">
        <div className="relative flex-1 flex flex-col items-center justify-center p-8 pb-16 sm:pb-8 bg-black">
          
          <Background />

          {/* dark room gradient overlay */}
          <div className="gradient-overlay absolute inset-0 opacity-0 bg-gradient-to-br from-black via-gray-900/30 to-gray-800/30" />

          {/* Grid background */}
          <div className="grid-background absolute inset-0 opacity-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
          
          {/* Main content container */}
          <div className="content-wrapper relative z-10 opacity-0 flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
            <div className="logo-container">
              <Logo />
            </div>
            
            <p className="description text-lg text-gray-300 font-light tracking-wide mb-6">
              Premium athletic wear for combat sports and fitness
            </p>
            
            <div className="title-container space-y-6 mb-8">
              <h1 className="text-4xl sm:text-5xl font-light tracking-tight md:text-6xl text-white">
                <span className="font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-gradient-x">
                  Coming Soon
                </span>
              </h1>
            </div>
            
            <div className="form-wrapper w-full flex items-center justify-center">
              <NotificationForm />
            </div>
            
            <div className="social-links">
              <SocialLinks />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
