import React, { memo, useState, useEffect } from 'react';
import ParticleEffect from '../components/ParticleEffect';
import Image from 'next/image';

const useResponsiveLayout = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkLayout = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      setIsMobile(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  return { isPortrait, isMobile };
};

function GymBackdrop({ isPortrait }) {
  return (
    <Image
      src={isPortrait ? "/images/portrait-bg.png" : "/images/landscape-bg.png"}
      alt="MMA gym"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
        opacity: 0.08
      }}
    />
  );
}

const Background = memo(() => {
  const { isPortrait, isMobile } = useResponsiveLayout();

  return (
    <>
      <GymBackdrop isPortrait={isPortrait} />
      <ParticleEffect />

      {!isMobile ? (
        // Desktop pulse effects
        <>
          <div className="fixed" style={{
            width: '50vw',
            height: '50vw',
            top: '-20vh',
            left: '-25vw',
            background: 'rgb(59, 130, 246, 0.1)',
            borderRadius: '9999px',
            filter: 'blur(calc(4vw))'
          }} />
          <div className="fixed" style={{
            width: '50vw',
            height: '50vw',
            bottom: '-20vh',
            right: '-25vw',
            background: 'rgb(168, 85, 247, 0.05)',
            borderRadius: '9999px',
            filter: 'blur(calc(4vw))'
          }} />
        </>
      ) : (
        // Mobile pulse effects
        <>
          <div className="fixed top-0 -left-16 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl animate-slow-pulse-delayed" />
          <div className="fixed bottom-0 -right-16 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl animate-slow-pulse-delayed" />
        </>
      )}
    </>
  );
});

Background.displayName = 'Background';
export default Background;
