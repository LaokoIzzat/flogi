'use client';

import React, { useEffect, useRef } from 'react';

const ParticleEffect = () => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
        this.baseOpacity = Math.random() * 0.3 + 0.1;
        this.opacity = this.baseOpacity;
        this.glowSize = this.size * 3;
        this.transitionZone = 100;
        this.hue = Math.random() * 60 - 30;
      }

      update(time) {
        this.x += this.speedX * Math.sin(time * 0.0003 + this.baseOpacity * 10) * 1.2;
        this.y += this.speedY * Math.cos(time * 0.0004 + this.baseOpacity * 10) * 1.2;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        const edgeFade = (pos, max) => Math.min(pos / this.transitionZone, (max - pos) / this.transitionZone, 1);
        const fadeX = edgeFade(this.x, canvas.width);
        const fadeY = edgeFade(this.y, canvas.height);
        this.opacity = this.baseOpacity * fadeX * fadeY;
      }

      draw(ctx) {
        ctx.save();
        ctx.filter = 'blur(6px)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${220 + this.hue}, 30%, 90%, ${this.opacity * 0.2})`;
        ctx.fill();
        ctx.filter = 'none';
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `hsla(${220 + this.hue}, 30%, 100%, ${this.opacity})`);
        gradient.addColorStop(0.5, `hsla(${220 + this.hue}, 25%, 95%, ${this.opacity * 0.7})`);
        gradient.addColorStop(1, `hsla(${220 + this.hue}, 20%, 90%, ${this.opacity * 0.3})`);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      particles = Array.from({ length: 60 }, () => new Particle());
    };

    const animate = (timestamp) => {
      if (!ctx) return;
      
      timeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(timestamp);
        particle.draw(ctx);
      });
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
      init();
    };

    setCanvasSize();
    init();
    animate(0);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
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
