'use client';

import { useEffect, useState, useCallback } from 'react';

interface CinematicIntroProps {
  name: string;
  tagline: string;
  loadingText?: string;
}

export default function CinematicIntro({ name, tagline, loadingText = 'Loading Experience' }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const exitIntro = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenIntro', 'true');
      document.body.style.overflow = 'auto';
    }, 400);
  }, []);

  useEffect(() => {
    // Check if intro has been shown in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setIsVisible(false);
      return;
    }

    // Prevent scroll during intro
    document.body.style.overflow = 'hidden';

    // Fast progress animation (2 seconds total)
    const startTime = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        // Exit after progress completes
        setTimeout(exitIntro, 300);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [exitIntro]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0a0a0f] flex flex-col items-center justify-center transition-opacity duration-400 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Main content */}
      <div className="text-center px-6 max-w-2xl">
        {/* Name */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)] font-bold mb-4 text-white"
          style={{
            opacity: Math.min(progress / 30, 1),
            transform: `translateY(${Math.max(20 - (progress / 30) * 20, 0)}px)`
          }}
        >
          {name}
        </h1>

        {/* Tagline */}
        <p
          className="text-base sm:text-lg md:text-xl text-white/70 tracking-wider uppercase mb-8"
          style={{
            opacity: Math.min(Math.max((progress - 20) / 30, 0), 1),
            transform: `translateY(${Math.max(20 - Math.max((progress - 20) / 30, 0) * 20, 0)}px)`
          }}
        >
          {tagline}
        </p>

        {/* Progress bar */}
        <div className="w-48 sm:w-64 mx-auto">
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-highlight rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/40 text-xs text-center mt-3 tracking-widest uppercase">
            {loadingText}
          </p>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={exitIntro}
        className="absolute bottom-6 right-6 px-4 py-2 text-white/50 hover:text-white text-sm tracking-wider uppercase transition-colors"
      >
        Skip →
      </button>
    </div>
  );
}
