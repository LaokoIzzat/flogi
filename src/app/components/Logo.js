'use client';

import { useRef } from 'react';

export default function Logo() {
  return (
    <div className="w-48 h-48 relative group">
      <img
        src="/images/flogi-logo.gif"
        alt="Logo"
        className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-110"
      />
    </div>
  );
}
