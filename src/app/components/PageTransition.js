'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const router = useRouter();
  const ease = "power4.inOut";
  
  useEffect(() => {
    const revealTransition = () => {
      return new Promise((resolve) => {
        gsap.set(".block", { scaleY: 1 });
        gsap.to(".block", {
          scaleY: 0,
          duration: 1,
          stagger: {
            each: 0.1,
            from: "start",
            grid: "auto",
            axis: "x",
          },
          ease: ease,
          onComplete: resolve,
        });
      });
    };

    revealTransition().then(() => {
      gsap.set(".block", { visibility: "hidden" });
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      const animateTransition = () => {
        return new Promise((resolve) => {
          gsap.set(".block", { visibility: "visible", scaleY: 0 });
          gsap.to(".block", {
            scaleY: 1,
            duration: 1,
            stagger: {
              each: 0.1,
              from: "start",
              grid: [2, 5],
              axis: "x",
            },
            ease: ease,
            onComplete: resolve,
          });
        });
      };

      animateTransition().then(() => {
        router.push(url);
      });
    };

    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && href !== window.location.pathname) {
        e.preventDefault();
        handleRouteChange(href);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [router]);

  return (
    <>
      <div className="transition-blocks">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="block" />
        ))}
      </div>
      {children}
    </>
  );
};

export default PageTransition;
