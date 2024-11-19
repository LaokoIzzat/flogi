import React, { memo, useState, useEffect } from 'react';
import ParticleEffect from '../components/ParticleEffect';
import Image from 'next/image';

const useResponsiveLayout = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const portraitMql = window.matchMedia('(orientation: portrait)');
    const mobileMql = window.matchMedia('(max-width: 767px)');

    setIsPortrait(portraitMql.matches);
    setIsMobile(mobileMql.matches);

    const handleOrientationChange = (e) => setIsPortrait(e.matches);
    const handleMobileChange = (e) => setIsMobile(e.matches);

    portraitMql.addEventListener('change', handleOrientationChange);
    mobileMql.addEventListener('change', handleMobileChange);

    return () => {
      portraitMql.removeEventListener('change', handleOrientationChange);
      mobileMql.removeEventListener('change', handleMobileChange);
    };
  }, []);

  return { isPortrait, isMobile, isClient };
};

function GymBackdrop({ isPortrait, isClient }) {
  if (!isClient) return null;

  return (
    <div className="absolute inset-0 transition-opacity duration-500">
      <Image
        src={isPortrait ? "/images/portrait-bg.webp" : "/images/landscape-bg.webp"}
        alt="MMA gym"
        quality={100}
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: 'cover',
          opacity: 0.08
        }}
      />
    </div>
  );
}

const Background = memo(() => {
  const { isPortrait, isMobile, isClient } = useResponsiveLayout();

  return (
    <>
      <GymBackdrop isPortrait={isPortrait} isClient={isClient} />

      {!isMobile ? (
        // Desktop pulse effects
        <>
          <div className="fixed w-[50vw] h-[50vw] -top-[20vh] -left-[25vw] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="fixed w-[50vw] h-[50vw] -bottom-[20vh] -right-[25vw] bg-purple-500/5 rounded-full blur-3xl" />
        </>
      ) : (
        // Mobile pulse effects
        <>
          <div className="fixed top-0 -left-16 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="fixed bottom-0 -right-16 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl" />
        </>
      )}
    </>
  );
});

Background.displayName = 'Background';
export default Background;
