'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <div className="w-48 h-48 relative group">
      <Image
        src="/images/flogi-logo.gif"
        alt="Flogi Pepsi Logo"
        unoptimized
        fill
        priority
        sizes="12rem"
        className="object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </div>
  );
}