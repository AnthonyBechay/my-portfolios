'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Optimized IntersectionObserver hook for scroll-triggered animations
 * Replaces scroll event listeners to prevent layout thrashing
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip if already intersected and triggerOnce is true
    if (hasIntersected && triggerOnce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            if (triggerOnce) {
              setHasIntersected(true);
            }
          } else if (!triggerOnce) {
            setIsIntersecting(false);
          }
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, hasIntersected]);

  return { elementRef, isIntersecting, hasIntersected };
}

/**
 * Hook for scroll-based fade-in animations
 * Uses IntersectionObserver instead of scroll events
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const { elementRef, isIntersecting } = useIntersectionObserver<T>({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px', // Trigger 100px before element enters viewport
    triggerOnce: true,
    ...options,
  });

  return {
    ref: elementRef,
    isVisible: isIntersecting,
    className: isIntersecting
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-8',
  };
}










