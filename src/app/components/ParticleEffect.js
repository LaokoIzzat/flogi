'use client';

import React, { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 30;
const TRANSITION_ZONE = 100;
const BLUR_AMOUNT = '4px';
const ANIMATION_FRAME_RATE = 30;
const RESIZE_DEBOUNCE = 250;
const SCROLL_INFLUENCE = 0.08;
const SCROLL_DECAY = 0.92; 
const MAX_SCROLL_VELOCITY = 2; 
const ORIENTATION_CHANGE_RESET_DELAY = 150;

class Particle {
  constructor(width, height) {
    this.reset(width, height);
    this.scrollVelocity = 0;
  }

  reset(width, height) {
    this.xPercent = Math.random() * 100;
    this.yPercent = Math.random() * 100;
    this.updatePosition(width, height);
    
    this.size = Math.random() * 1.5 + 1;
    this.speedX = (Math.random() * 0.1 - 0.05) * 0.8;
    this.speedY = (Math.random() * 0.1 - 0.05) * 0.8;
    this.baseOpacity = Math.random() * 0.25 + 0.1;
    this.opacity = this.baseOpacity;
    this.glowSize = this.size * 2.5;
    
    const hue = Math.random() * 40 - 20;
    this.glowColor = `hsla(${220 + hue}, 30%, 90%, `;
    this.gradientColors = [
      `hsla(${220 + hue}, 30%, 100%, `,
      `hsla(${220 + hue}, 25%, 95%, `,
      `hsla(${220 + hue}, 20%, 90%, `
    ];
  }

  updatePosition(width, height) {
    this.x = (this.xPercent * width) / 100;
    this.y = (this.yPercent * height) / 100;
  }

  update(time, width, height, scrollDelta) {
    const timeScale = time * 0.0002;
    
    // Clamp scroll velocity to prevent extreme movements
    const clampedScrollDelta = Math.max(Math.min(scrollDelta, MAX_SCROLL_VELOCITY), -MAX_SCROLL_VELOCITY);
    this.scrollVelocity = (this.scrollVelocity + clampedScrollDelta * SCROLL_INFLUENCE) * SCROLL_DECAY;
    
    // Reduced influence of scroll on particle movement
    this.xPercent += this.speedX + Math.sin(timeScale) * this.scrollVelocity * 0.1;
    this.yPercent += this.speedY * Math.cos(timeScale) + this.scrollVelocity * 0.5;

    // Gentler rotation based on scroll velocity
    const rotationAngle = this.scrollVelocity * Math.PI * 0.05;
    this.xPercent += Math.sin(rotationAngle) * 0.05;
    
    // Smooth wrapping with slightly expanded boundaries
    if (this.xPercent < -5) this.xPercent = 105;
    if (this.xPercent > 105) this.xPercent = -5;
    if (this.yPercent < -5) this.yPercent = 105;
    if (this.yPercent > 105) this.yPercent = -5;

    this.updatePosition(width, height);

    // More gradual opacity changes
    const speedFactor = Math.min(Math.abs(this.scrollVelocity), 1) * 0.5;
    const fadeX = Math.min(this.x / TRANSITION_ZONE, (width - this.x) / TRANSITION_ZONE, 1);
    const fadeY = Math.min(this.y / TRANSITION_ZONE, (height - this.y) / TRANSITION_ZONE, 1);
    this.opacity = this.baseOpacity * fadeX * fadeY * (1 + speedFactor * 0.3);
  }

  draw(ctx) {
    if (this.opacity > 0.1) {
      // More subtle glow effect
      const dynamicBlur = `${parseFloat(BLUR_AMOUNT) * (1 + Math.abs(this.scrollVelocity) * 0.3)}px`;
      ctx.filter = `blur(${dynamicBlur})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.glowSize * (1 + Math.abs(this.scrollVelocity) * 0.3), 0, Math.PI * 2);
      ctx.fillStyle = this.glowColor + `${this.opacity * 0.2})`;
      ctx.fill();

      ctx.filter = 'none';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * (1 + Math.abs(this.scrollVelocity) * 0.2)
      );
      gradient.addColorStop(0, this.gradientColors[0] + `${this.opacity})`);
      gradient.addColorStop(0.5, this.gradientColors[1] + `${this.opacity * 0.7})`);
      gradient.addColorStop(1, this.gradientColors[2] + `${this.opacity * 0.3})`);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
}

const ParticleEffect = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);
  const requestRef = useRef(null);
  const lastDrawTimeRef = useRef(0);
  const lastScrollRef = useRef(0);
  const scrollDeltaRef = useRef(0);
  const resizingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      willReadFrequently: false
    });

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio * 0.75;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      ctx.scale(scale, scale);
    };

    const handleOrientationChange = () => {
      resizingRef.current = true;
      scrollDeltaRef.current = 0; // Reset scroll velocity
      
      // Reset particles with a delay after orientation change
      setTimeout(() => {
        if (particlesRef.current) {
          particlesRef.current.forEach(particle => {
            particle.scrollVelocity = 0;
          });
        }
        resizingRef.current = false;
      }, ORIENTATION_CHANGE_RESET_DELAY);
    };

    const initParticles = () => {
      particlesRef.current = Array.from(
        { length: PARTICLE_COUNT },
        () => new Particle(canvas.width, canvas.height)
      );
    };

    const handleScroll = () => {
      if (!resizingRef.current) {
        const currentScroll = window.scrollY;
        scrollDeltaRef.current = (currentScroll - lastScrollRef.current) * 0.1;
        lastScrollRef.current = currentScroll;
      }
    };

    const animate = (timestamp) => {
      const frameInterval = 1000 / ANIMATION_FRAME_RATE;
      const elapsed = timestamp - lastDrawTimeRef.current;
      
      if (elapsed > frameInterval && !resizingRef.current) {
        lastDrawTimeRef.current = timestamp - (elapsed % frameInterval);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesRef.current.forEach(particle => {
          particle.update(timestamp, canvas.width, canvas.height, scrollDeltaRef.current);
          particle.draw(ctx);
        });

        scrollDeltaRef.current *= SCROLL_DECAY;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizingRef.current = true;
      
      resizeTimeout = setTimeout(() => {
        updateCanvasSize();
        resizingRef.current = false;
      }, RESIZE_DEBOUNCE);
    };

    updateCanvasSize();
    initParticles();
    animate(0);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('orientationchange', handleOrientationChange);
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-100"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleEffect;
