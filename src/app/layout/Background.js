import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';

const useResponsiveLayout = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Defer layout calculations to after initial render
    const timeoutId = setTimeout(() => {
      setIsClient(true);
      
      // Use more performant window.innerWidth/innerHeight for initial check
      setIsPortrait(window.innerHeight > window.innerWidth);
      setIsMobile(window.innerWidth <= 767);
      
      // Then set up media queries for subsequent changes
      const portraitMql = window.matchMedia('(orientation: portrait)');
      const mobileMql = window.matchMedia('(max-width: 767px)');

      const handleOrientationChange = (e) => setIsPortrait(e.matches);
      const handleMobileChange = (e) => setIsMobile(e.matches);

      portraitMql.addEventListener('change', handleOrientationChange);
      mobileMql.addEventListener('change', handleMobileChange);

      return () => {
        portraitMql.removeEventListener('change', handleOrientationChange);
        mobileMql.removeEventListener('change', handleMobileChange);
      };
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return { isPortrait, isMobile, isClient };
};

function GymBackdrop({ isPortrait, isClient }) {
  if (!isClient) return null;

  return (
    <div className="absolute inset-0 transition-opacity duration-500">
      <Image
        src={isPortrait ? "/images/portrait.webp" : "/images/landscape.webp"}
        alt="MMA gym"
        quality={75}
        fill
        loading="lazy"
        sizes="100vw"
        style={{
          objectFit: 'cover',
          opacity: 0.1
        }}
        className="transition-opacity duration-500"
      />
    </div>
  );
}

// Pulse Effect Component to reduce rerenders
const PulseEffects = memo(({ isMobile }) => (
  <>
    {!isMobile ? (
      <>
        <div className="fixed w-[50vw] h-[50vw] -top-[20vh] -left-[25vw] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="fixed w-[50vw] h-[50vw] -bottom-[20vh] -right-[25vw] bg-purple-500/5 rounded-full blur-3xl" />
      </>
    ) : (
      <>
        <div className="fixed top-0 -left-16 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="fixed bottom-0 -right-16 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl" />
      </>
    )}
  </>
));

PulseEffects.displayName = 'PulseEffects';

const Background = memo(() => {
  const { isPortrait, isMobile, isClient } = useResponsiveLayout();

  return (
    <>
      <GymBackdrop isPortrait={isPortrait} isClient={isClient} />
      <PulseEffects isMobile={isMobile} />
    </>
  );
});

Background.displayName = 'Background';
export default Background;
