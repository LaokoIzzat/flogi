import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';

const useResponsiveLayout = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsClient(true);
      setIsPortrait(window.innerHeight > window.innerWidth);
      
      const portraitMql = window.matchMedia('(orientation: portrait)');
      const handleOrientationChange = (e) => setIsPortrait(e.matches);
      portraitMql.addEventListener('change', handleOrientationChange);

      return () => {
        portraitMql.removeEventListener('change', handleOrientationChange);
      };
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return { isPortrait, isClient };
};

function Backdrop({ isPortrait, isClient }) {
  if (!isClient) return null;

  return (
    <div className="absolute inset-0">
      <div className="relative w-full h-full mix-blend-luminosity">
        <Image
          src={isPortrait ? "/images/portrait.webp" : "/images/landscape.webp"}
          alt="Rashguard Blueprint"
          quality={75}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            opacity: 0.1
          }}
        />
      </div>
    </div>
  );
}

const Background = memo(() => {
  const { isPortrait, isClient } = useResponsiveLayout();

  return (
    <Backdrop isPortrait={isPortrait} isClient={isClient} />
  );
});

Background.displayName = 'Background';
export default Background;
