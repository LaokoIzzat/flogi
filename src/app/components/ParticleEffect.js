'use client';

import React, { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 30;
const TRANSITION_ZONE = 100;
const BLUR_AMOUNT = '4px';
const ANIMATION_FRAME_RATE = 30;
const RESIZE_DEBOUNCE = 250;

class Particle {
  constructor(width, height) {
    this.reset(width, height);
  }

  reset(width, height) {
    this.xPercent = Math.random() * 100;
    this.yPercent = Math.random() * 100;
    this.updatePosition(width, height);
    
    // Simplified particle properties
    this.size = Math.random() * 1.5 + 1; // Reduced size range
    this.speedX = (Math.random() * 0.1 - 0.05) * 0.8; // Reduced speed
    this.speedY = (Math.random() * 0.1 - 0.05) * 0.8;
    this.baseOpacity = Math.random() * 0.25 + 0.1;
    this.opacity = this.baseOpacity;
    this.glowSize = this.size * 2.5; // Reduced glow size
    
    // Pre-calculate colors to avoid string concatenation during animation
    const hue = Math.random() * 40 - 20; // Reduced hue range
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

  update(time, width, height) {
    // Simplified movement calculation
    const timeScale = time * 0.0002; // Reduced time scale
    
    this.xPercent += this.speedX;
    this.yPercent += this.speedY * Math.cos(timeScale);

    // Simplified boundary checking
    if (this.xPercent < 0) this.xPercent = 100;
    if (this.xPercent > 100) this.xPercent = 0;
    if (this.yPercent < 0) this.yPercent = 100;
    if (this.yPercent > 100) this.yPercent = 0;

    this.updatePosition(width, height);

    // Simplified fade calculation
    const fadeX = Math.min(this.x / TRANSITION_ZONE, (width - this.x) / TRANSITION_ZONE, 1);
    const fadeY = Math.min(this.y / TRANSITION_ZONE, (height - this.y) / TRANSITION_ZONE, 1);
    this.opacity = this.baseOpacity * fadeX * fadeY;
  }

  draw(ctx) {
    // Draw glow
    if (this.opacity > 0.1) { // Skip drawing very faint particles
      ctx.filter = `blur(${BLUR_AMOUNT})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
      ctx.fillStyle = this.glowColor + `${this.opacity * 0.2})`;
      ctx.fill();

      // Draw particle
      ctx.filter = 'none';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      willReadFrequently: false
    });

    // Reduce canvas size for performance
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio * 0.75; // Reduced resolution
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      ctx.scale(scale, scale);
    };

    const initParticles = () => {
      particlesRef.current = Array.from(
        { length: PARTICLE_COUNT },
        () => new Particle(canvas.width, canvas.height)
      );
    };

    const animate = (timestamp) => {
      // Implement frame rate limiting
      const frameInterval = 1000 / ANIMATION_FRAME_RATE;
      const elapsed = timestamp - lastDrawTimeRef.current;
      
      if (elapsed > frameInterval) {
        lastDrawTimeRef.current = timestamp - (elapsed % frameInterval);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesRef.current.forEach(particle => {
          particle.update(timestamp, canvas.width, canvas.height);
          particle.draw(ctx);
        });
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCanvasSize();
      }, RESIZE_DEBOUNCE);
    };

    updateCanvasSize();
    initParticles();
    animate(0);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    return () => {
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
