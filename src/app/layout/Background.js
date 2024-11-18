import React, { memo } from 'react';
import ParticleEffect from '../components/ParticleEffect';
import Image from 'next/image'

 
function GymBackdrop() {
  return (
    <Image
      src="/images/backdrop.png"
      alt="MMA gym"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
        opacity: 0.1
      }}
    />
  )
}

const Background = memo(() => (
  <>
    <GymBackdrop/>
    <ParticleEffect/>

    {/* Desktop pulse effects */}
    <div className="fixed hidden md:block" style={{
      width: '50vw',
      height: '50vw',
      top: '-20vh',
      left: '-25vw',
      background: 'rgb(59, 130, 246, 0.1)',
      borderRadius: '9999px',
      filter: 'blur(calc(4vw))'
    }} />
    <div className="fixed hidden md:block" style={{
      width: '50vw',
      height: '50vw',
      bottom: '-20vh',
      right: '-25vw',
      background: 'rgb(168, 85, 247, 0.05)',
      borderRadius: '9999px',
      filter: 'blur(calc(4vw))'
    }} />

    {/* Mobile pulse effects */}
    <div className="fixed top-0 -left-16 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl animate-slow-pulse-delayed md:hidden" />
    <div className="fixed bottom-0 -right-16 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl animate-slow-pulse-delayed md:hidden" />
  </>
));

Background.displayName = 'Background';
export default Background;