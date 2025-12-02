'use client';

import { useScrollReveal } from '@/hooks/useIntersectionObserver';
import { type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Optimized scroll reveal component using IntersectionObserver
 * Replaces CSS animations that trigger during scroll
 */
export default function ScrollReveal({ 
  children, 
  className = '', 
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{
        willChange: isVisible ? 'auto' : 'transform, opacity',
        transform: 'translateZ(0)', // GPU acceleration
      }}
    >
      {children}
    </div>
  );
}







