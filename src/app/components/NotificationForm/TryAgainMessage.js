'use client';

import { AlertCircle, AlertTriangle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TryAgainMessage({ show, errorType }) {
  const iconRef = useRef(null);
  const textRef = useRef(null);

  const getErrorMessage = (type) => {
    switch (type) {
      case 'already-subscribed':
        return "You have already subscribed.";
      case 'subscription-error':
        return "Unable to subscribe at this time. Please try again soon.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const isWarning = errorType === 'already-subscribed';

  useEffect(() => {
    if (show) {
      // Reset initial states
      gsap.set([iconRef.current, textRef.current], { 
        scale: 0,
        opacity: 0 
      });

      // Animate alert icon first
      gsap.to(iconRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2
      });

      // Then animate text
      gsap.to(textRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.6
      });
    }
  }, [show]);

  return (
    <div className={`w-full transition-all duration-500 ease-in-out
                   ${show ? 'h-[140px]' : 'h-0'}`}>
      <div className="relative h-full w-full">
        <div className={`absolute inset-0 flex items-center justify-center
                      transition-all duration-500 ease-in-out
                      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                        backdrop-blur-sm text-white rounded-xl 
                        border border-white/5
                        flex flex-col items-center justify-center 
                        shadow-lg shadow-gray-900/20 
                        p-6 space-y-3
                        max-w-sm
                        [@media(hover:hover)]:before:absolute [@media(hover:hover)]:before:inset-0 [@media(hover:hover)]:before:rounded-xl
                        [@media(hover:hover)]:before:bg-gradient-to-br [@media(hover:hover)]:before:from-gray-800/50 [@media(hover:hover)]:before:via-gray-700/50 [@media(hover:hover)]:before:to-gray-800/50
                        [@media(hover:hover)]:before:opacity-0 [@media(hover:hover)]:before:hover:opacity-100
                        [@media(hover:hover)]:before:transition-opacity [@media(hover:hover)]:before:duration-500
                        relative overflow-hidden">
            {isWarning ? (
              <AlertTriangle ref={iconRef} className="w-8 h-8 text-white" />
            ) : (
              <AlertCircle ref={iconRef} className="w-8 h-8 text-white" />
            )}
            <div ref={textRef} className="flex flex-col items-center space-y-1.5 text-center">
              <p className="text-sm text-white/75">
                {getErrorMessage(errorType)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
