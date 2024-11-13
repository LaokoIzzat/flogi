'use client';
import React, { useEffect, useRef } from 'react';

const BGEffects = () => {
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
        // Smaller particle sizes for more subtlety
        this.size = Math.random() * 2 + 0.5;
        // Slower movement for more ethereal feel
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
        // Lower base opacity for subtlety
        this.baseOpacity = Math.random() * 0.3 + 0.1;
        this.opacity = this.baseOpacity;
        // Larger glow for more atmospheric effect
        this.glowSize = this.size * 3;
        this.transitionZone = 100; // Wider transition zone
        // Add color variation
        this.hue = Math.random() * 60 - 30; // slight blue-white variation
      }

      update(time) {
        // More organic movement
        this.x += this.speedX * Math.sin(time * 0.0003 + this.baseOpacity * 10) * 1.2;
        this.y += this.speedY * Math.cos(time * 0.0004 + this.baseOpacity * 10) * 1.2;

        const centerX = canvas.width / 2;
        // Slower, more subtle wobble
        const wobble = Math.sin(time * 0.0003) * 15;
        const adjustedCenterX = centerX + wobble;
        
        const distanceFromCenter = Math.abs(this.x - adjustedCenterX);
        const maxDistance = (this.y / canvas.height) * (canvas.width * 0.35);
        
        if (distanceFromCenter < maxDistance) {
          const intensity = 1 - (distanceFromCenter / maxDistance);
          // More subtle opacity variation
          this.opacity = this.baseOpacity + (intensity * 0.4);
        } else {
          this.opacity = this.baseOpacity;
        }

        // Smoother edge transitions
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Smoother fade in/out at edges
        const edgeFade = (pos, max) => Math.min(pos / this.transitionZone, (max - pos) / this.transitionZone, 1);
        const fadeX = edgeFade(this.x, canvas.width);
        const fadeY = edgeFade(this.y, canvas.height);
        this.opacity *= fadeX * fadeY;
      }

      draw(ctx) {
        ctx.save();
        // Increased blur for softer particles
        ctx.filter = 'blur(6px)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        // Slight color variation in the glow
        ctx.fillStyle = `hsla(${220 + this.hue}, 30%, 90%, ${this.opacity * 0.2})`;
        ctx.fill();
        ctx.filter = 'none';
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        // More sophisticated gradient with color variation
        gradient.addColorStop(0, `hsla(${220 + this.hue}, 30%, 100%, ${this.opacity})`);
        gradient.addColorStop(0.5, `hsla(${220 + this.hue}, 25%, 95%, ${this.opacity * 0.7})`);
        gradient.addColorStop(1, `hsla(${220 + this.hue}, 20%, 90%, ${this.opacity * 0.3})`);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    const drawSpotlightBeams = (ctx, time) => {
      const centerX = canvas.width / 2;
      // Slower, more subtle wobble
      const wobble = Math.sin(time * 0.0003) * 15;
      const adjustedCenterX = centerX + wobble;

      const spotlightOriginY = -50;
      const coneHeight = canvas.height * 1.3;
      const topWidth = 50; // Narrower beam
      const bottomWidth = canvas.width * 0.35; // Slightly narrower cone

      // More sophisticated spotlight gradient
      const spotlightGradient = ctx.createRadialGradient(
        adjustedCenterX, spotlightOriginY,
        0,
        adjustedCenterX, spotlightOriginY,
        coneHeight
      );
      spotlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      spotlightGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.05)');
      spotlightGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.02)');
      spotlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(adjustedCenterX - topWidth/2, spotlightOriginY);
      ctx.lineTo(adjustedCenterX - bottomWidth/2, coneHeight);
      ctx.lineTo(adjustedCenterX + bottomWidth/2, coneHeight);
      ctx.lineTo(adjustedCenterX + topWidth/2, spotlightOriginY);
      ctx.closePath();
      ctx.fillStyle = spotlightGradient;
      ctx.fill();

      // More subtle central beam
      const beamGradient = ctx.createLinearGradient(
        adjustedCenterX, spotlightOriginY,
        adjustedCenterX, canvas.height
      );
      beamGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      beamGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
      beamGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      const beamWidth = topWidth / 2;
      ctx.moveTo(adjustedCenterX - beamWidth/2, spotlightOriginY);
      ctx.lineTo(adjustedCenterX - bottomWidth/4, canvas.height);
      ctx.lineTo(adjustedCenterX + bottomWidth/4, canvas.height);
      ctx.lineTo(adjustedCenterX + beamWidth/2, spotlightOriginY);
      ctx.closePath();
      ctx.fillStyle = beamGradient;
      ctx.fill();

      // Subtle source glow
      const glowRadius = topWidth * 1.5;
      const sourceGradient = ctx.createRadialGradient(
        adjustedCenterX, spotlightOriginY,
        0,
        adjustedCenterX, spotlightOriginY,
        glowRadius
      );
      sourceGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      sourceGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      sourceGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(adjustedCenterX, spotlightOriginY, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = sourceGradient;
      ctx.fill();

      // More subtle volumetric lighting
      const volumetricGradient = ctx.createRadialGradient(
        adjustedCenterX, canvas.height * 0.3,
        0,
        adjustedCenterX, canvas.height * 0.3,
        canvas.height * 0.7
      );
      volumetricGradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
      volumetricGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
      volumetricGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = volumetricGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const init = () => {
      // Increase particle count for more atmosphere
      particles = Array.from({ length: 60 }, () => new Particle());
    };

    const animate = (timestamp) => {
      if (!ctx) return;
      
      timeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawSpotlightBeams(ctx, timestamp);
      
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: 0 }}
    />
  );
};

export default BGEffects;
