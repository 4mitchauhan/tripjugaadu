'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll reveals
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      reveals.forEach(el => {
        // Reset classes on route change
        el.classList.remove('reveal--visible');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [pathname]);

  useEffect(() => {
    // Parallax hero image
    const handleScroll = () => {
      const heroBg = document.querySelector('.parallax-bg') as HTMLElement;
      if (heroBg) {
        const scrolled = window.scrollY;
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return null;
}
