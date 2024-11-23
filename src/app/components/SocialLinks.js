'use client';

import { Instagram } from 'lucide-react';

const socialLinks = [
  {
    platform: 'Instagram',
    url: 'https://instagram.com/flogi.co',
    colorClass: '[@media(hover:hover)]:hover:text-pink-500 active:text-pink-500',
    icon: <Instagram className="w-8 h-8" />
  },
  {
    platform: 'TikTok',
    url: 'https://tiktok.com/@yourhandle',
    colorClass: '[@media(hover:hover)]:hover:text-white active:text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
      </svg>
    )
  }
];

const socialStyles = {
  WebkitTapHighlightColor: 'transparent',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  outline: 'none'
};

export default function SocialLinks() {
  return (
    <div className="mt-8 sm:mt-2 inline-flex items-center justify-center gap-12">
      {socialLinks.map(({ platform, url, colorClass, icon }) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`transform transition-all duration-200 text-gray-400 
                    ${colorClass}
                    [@media(hover:hover)]:hover:scale-110 
                    outline-none focus:outline-none active:outline-none rounded-lg p-2
                    active:scale-95`}
          style={socialStyles}
          aria-label={platform}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
