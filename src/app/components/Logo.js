'use client';

import { useEffect, useRef } from 'react';

export default function Logo() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.25;
    }
  }, []);

  return (
    <div className="w-48 h-48 relative group">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-110"
      >
        <source src="/images/flogi-logo.webm" type="video/webm" />
      </video>
    </div>
  );
}