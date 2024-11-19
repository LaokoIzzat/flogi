'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <div className="w-48 h-48 relative group">
      <Image
        src="/images/flogi-pepsi-3d.gif"
        alt="Flogi Pepsi Logo"
        fill
        priority
        unoptimized
        className="object-contain drop-shadow-2xl transition-all duration-700 ease-out group-hover:scale-110"
      />
    </div>
  );
}
