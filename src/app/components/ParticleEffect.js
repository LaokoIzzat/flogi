'use client';

import React, { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 60;
const TRANSITION_ZONE = 100;
const BLUR_AMOUNT = '6px';

class Particle {
  constructor(width, height) {
    this.reset(width, height);
  }

  reset(width, height) {
    this.xPercent = Math.random() * 100;
    this.yPercent = Math.random() * 100;
    this.updatePosition(width, height);
    
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.15 - 0.075;
    this.speedY = Math.random() * 0.15 - 0.075;
    this.baseOpacity = Math.random() * 0.3 + 0.1;
    this.opacity = this.baseOpacity;
    this.glowSize = this.size * 3;
    this.hue = Math.random() * 60 - 30;
    this.glowColor = `hsla(${220 + this.hue}, 30%, 90%,`;
    this.gradientColors = [
      `hsla(${220 + this.hue}, 30%, 100%,`,
      `hsla(${220 + this.hue}, 25%, 95%,`,
      `hsla(${220 + this.hue}, 20%, 90%,`
    ];
  }

  updatePosition(width, height) {
    this.x = (this.xPercent * width) / 100;
    this.y = (this.yPercent * height) / 100;
  }

  update(time, width, height) {
    const timeScale = time * 0.0003;
    
    this.xPercent += (this.speedX * Math.sin(timeScale + this.baseOpacity * 10) * 100) / width;
    this.yPercent += (this.speedY * Math.cos(timeScale + this.baseOpacity * 10) * 100) / height;

    if (this.xPercent < 0) this.xPercent = 100;
    if (this.xPercent > 100) this.xPercent = 0;
    if (this.yPercent < 0) this.yPercent = 100;
    if (this.yPercent > 100) this.yPercent = 0;

    this.updatePosition(width, height);

    const fadeX = Math.min(this.x / TRANSITION_ZONE, (width - this.x) / TRANSITION_ZONE, 1);
    const fadeY = Math.min(this.y / TRANSITION_ZONE, (height - this.y) / TRANSITION_ZONE, 1);
    this.opacity = this.baseOpacity * fadeX * fadeY;
  }

  draw(ctx) {
    ctx.filter = `blur(${BLUR_AMOUNT})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
    ctx.fillStyle = this.glowColor + `${this.opacity * 0.2})`;
    ctx.fill();

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

const ParticleEffect = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      willReadFrequently: false
    });

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const initParticles = () => {
      particlesRef.current = Array.from(
        { length: PARTICLE_COUNT },
        () => new Particle(canvas.width, canvas.height)
      );
    };

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update(timestamp, canvas.width, canvas.height);
        particle.draw(ctx);
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCanvasSize();
      }, 100);
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-80"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleEffect;
