import { useRef } from 'react';

export default function Logo() {
  return (
    <div className="w-48 h-48 relative group">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-110"
      >
        <source src="/images/flogi-logo.webm" type="video/webm" />
        <source src="/images/input.mov" type="video/mov" />
      </video>
    </div>
  );
}
