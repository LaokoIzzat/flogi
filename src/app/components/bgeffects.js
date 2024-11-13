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
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.baseOpacity = Math.random() * 0.5 + 0.3;
        this.opacity = this.baseOpacity;
        this.glowSize = this.size * 2;
        // Add transition zone width
        this.transitionZone = 50;
      }

      update(time) {
        this.x += this.speedX * Math.sin(time * 0.0005) * 1.0;
        this.y += this.speedY * Math.cos(time * 0.0005) * 1.0;

        const centerX = canvas.width / 2;
        const wobble = Math.sin(time * 0.0005) * 20;
        const adjustedCenterX = centerX + wobble;
        
        const distanceFromCenter = Math.abs(this.x - adjustedCenterX);
        const maxDistance = (this.y / canvas.height) * (canvas.width * 0.3);
        
        if (distanceFromCenter < maxDistance) {
          const intensity = 1 - (distanceFromCenter / maxDistance);
          this.opacity = this.baseOpacity + (intensity * 0.8);
        } else {
          this.opacity = this.baseOpacity;
        }

        // Handle edge transitions
        if (this.x < 0) {
          // Create smooth transition at left edge
          this.x = canvas.width;
          this.opacity = 0;
        } else if (this.x > canvas.width) {
          // Create smooth transition at right edge
          this.x = 0;
          this.opacity = 0;
        }
        
        if (this.y < 0) {
          // Create smooth transition at top edge
          this.y = canvas.height;
          this.opacity = 0;
        } else if (this.y > canvas.height) {
          // Create smooth transition at bottom edge
          this.y = 0;
          this.opacity = 0;
        }

        // Fade in when entering from any edge
        if (this.x < this.transitionZone) {
          this.opacity *= (this.x / this.transitionZone);
        } else if (this.x > canvas.width - this.transitionZone) {
          this.opacity *= ((canvas.width - this.x) / this.transitionZone);
        }

        if (this.y < this.transitionZone) {
          this.opacity *= (this.y / this.transitionZone);
        } else if (this.y > canvas.height - this.transitionZone) {
          this.opacity *= ((canvas.height - this.y) / this.transitionZone);
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.filter = 'blur(4px)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
        ctx.fill();
        ctx.filter = 'none';
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.5})`);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    const drawSpotlightBeams = (ctx, time) => {
      const centerX = canvas.width / 2;
      const wobble = Math.sin(time * 0.0005) * 20;
      const adjustedCenterX = centerX + wobble;

      const spotlightOriginY = -50;
      const coneHeight = canvas.height * 1.2;
      const topWidth = 60;
      const bottomWidth = canvas.width * 0.4;

      const spotlightGradient = ctx.createRadialGradient(
        adjustedCenterX, spotlightOriginY,
        0,
        adjustedCenterX, spotlightOriginY,
        coneHeight
      );
      spotlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      spotlightGradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.1)');
      spotlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      spotlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(adjustedCenterX - topWidth/2, spotlightOriginY);
      ctx.lineTo(adjustedCenterX - bottomWidth/2, coneHeight);
      ctx.lineTo(adjustedCenterX + bottomWidth/2, coneHeight);
      ctx.lineTo(adjustedCenterX + topWidth/2, spotlightOriginY);
      ctx.closePath();
      ctx.fillStyle = spotlightGradient;
      ctx.fill();

      const beamGradient = ctx.createLinearGradient(
        adjustedCenterX, spotlightOriginY,
        adjustedCenterX, canvas.height
      );
      beamGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      beamGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)');
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

      const glowRadius = topWidth;
      const sourceGradient = ctx.createRadialGradient(
        adjustedCenterX, spotlightOriginY,
        0,
        adjustedCenterX, spotlightOriginY,
        glowRadius
      );
      sourceGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      sourceGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      sourceGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(adjustedCenterX, spotlightOriginY, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = sourceGradient;
      ctx.fill();

      const volumetricGradient = ctx.createRadialGradient(
        adjustedCenterX, canvas.height * 0.3,
        0,
        adjustedCenterX, canvas.height * 0.3,
        canvas.height * 0.7
      );
      volumetricGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      volumetricGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.025)');
      volumetricGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = volumetricGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const init = () => {
      particles = Array.from({ length: 40 }, () => new Particle());
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-50"
      style={{ zIndex: 0 }}
    />
  );
};

export default BGEffects;