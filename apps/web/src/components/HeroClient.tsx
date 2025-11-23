'use client';

import { useState } from 'react';
import Image from 'next/image';
import VideoPlayer from './VideoPlayer';
import { getImageProps } from '@/lib/image-utils';

interface SiteSettings {
  name: string;
  tagline: string;
  bio: string;
  profileImageUrl?: string;
  showreelUrl?: string;
  welcomeMessage: string;
  yearsExperience: number;
  projectsCompleted: number;
  clientsServed: number;
  industryAwards?: number;
}

interface PageContent {
  heroHeadline?: string;
  heroSubheadline?: string;
}

interface HeroClientProps {
  settings: SiteSettings;
  pageContent?: PageContent;
}

export default function HeroClient({ settings, pageContent }: HeroClientProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const heroHeadline = pageContent?.heroHeadline || 'I tell stories that move people';
  const heroSubheadline = pageContent?.heroSubheadline || settings.tagline;

  return (
    <>
      <section id="hero" className="relative min-h-[90vh] py-20 md:py-32 flex items-center justify-center overflow-hidden" style={{ contain: 'layout style paint' }}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Column - Text */}
              <div className="space-y-8 text-center lg:text-left">
                {/* Welcome badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-primary font-medium tracking-wide">{settings.welcomeMessage || 'Welcome to my portfolio'}</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] gradient-text leading-[1.1] font-bold" style={{ contain: 'layout style' }}>
                  {settings.name}
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-primary tracking-wide font-semibold">
                  {heroSubheadline}
                </p>

                <p className="text-xl sm:text-2xl md:text-3xl text-foreground/80 leading-relaxed font-light max-w-xl">
                  {heroHeadline}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-6">
                  <div className="text-center lg:text-left">
                    <div className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] gradient-text-gold font-bold">
                      {settings.yearsExperience}+
                    </div>
                    <div className="text-foreground/60 text-xs sm:text-sm tracking-wider uppercase font-medium mt-1">Years</div>
                  </div>
                  <div className="w-px h-16 bg-foreground/10 hidden sm:block" />
                  <div className="text-center lg:text-left">
                    <div className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] gradient-text-gold font-bold">
                      {settings.projectsCompleted}+
                    </div>
                    <div className="text-foreground/60 text-xs sm:text-sm tracking-wider uppercase font-medium mt-1">Projects</div>
                  </div>
                  <div className="w-px h-16 bg-foreground/10 hidden sm:block" />
                  <div className="text-center lg:text-left">
                    <div className="text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] gradient-text-gold font-bold">
                      {settings.clientsServed}+
                    </div>
                    <div className="text-foreground/60 text-xs sm:text-sm tracking-wider uppercase font-medium mt-1">Clients</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                  <a
                    href="#portfolio"
                    className="btn-primary text-center font-semibold text-lg"
                  >
                    View My Work
                  </a>
                  {settings.showreelUrl && (
                    <button
                      onClick={() => setIsVideoOpen(true)}
                      className="btn-secondary text-center font-semibold text-lg"
                    >
                      Watch Showreel
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column - Creative Visual */}
              <div className="relative animate-fade-in-up">
                <div className="relative aspect-square max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                  {/* Static gradient layers - animations disabled for performance */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-[3rem] blur-3xl" 
                    style={{ contain: 'layout style paint', willChange: 'auto' }}
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-tl from-cyan-500/15 via-blue-500/15 to-purple-500/15 rounded-[3rem] blur-2xl" 
                    style={{ contain: 'layout style paint', willChange: 'auto' }}
                  />

                  {settings.showreelUrl ? (
                    <div className="relative z-10 group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                      {settings.profileImageUrl ? (
                        <>
                          <div className="relative glass-card p-3 rounded-[2.5rem] hover-lift overflow-hidden">
                            <Image
                              src={settings.profileImageUrl}
                              alt={settings.name}
                              width={800}
                              height={800}
                              className="rounded-[2rem]"
                              priority
                              {...getImageProps(settings.profileImageUrl)}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[2rem]">
                              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white/40 flex items-center justify-center">
                                <svg className="w-10 h-10 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/20 pointer-events-none group-hover:border-primary/60 transition-colors" />
                        </>
                      ) : (
                        <div className="relative z-10 glass-card w-full h-full rounded-[2.5rem] p-8 sm:p-10 flex flex-col gap-8 justify-between overflow-hidden hover-lift">
                          <div className="space-y-3 text-center">
                            <p className="text-xs sm:text-sm uppercase tracking-[0.5em] text-white/60">Featured Showreel</p>
                            <h3 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-white">A cinematic snapshot</h3>
                            <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
                              Preview the latest montage - crafted for global campaigns and filmmaker partners.
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="relative aspect-video rounded-2xl border border-white/15 bg-gradient-to-br from-black/70 via-purple-900/40 to-pink-900/30 overflow-hidden shadow-2xl shadow-primary/20">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_60%)]" />
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80 px-6 text-center">
                                <div className="text-xs tracking-[0.6em] uppercase text-white/60">Showreel</div>
                                <div className="text-xl sm:text-2xl font-semibold">Tap play to watch</div>
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setIsVideoOpen(true);
                                  }}
                                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition"
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                  Play Showreel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : settings.profileImageUrl ? (
                    <div className="relative z-10 group">
                      <div className="glass-card p-3 rounded-[2.5rem] hover-lift">
                        <Image
                          src={settings.profileImageUrl}
                          alt={settings.name}
                          width={800}
                          height={800}
                          className="rounded-[2rem]"
                          priority
                          {...getImageProps(settings.profileImageUrl)}
                          {...getImageProps(settings.profileImageUrl)}
                        />
                      </div>
                      <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/20 pointer-events-none group-hover:border-primary/60 transition-colors" />
                    </div>
                  ) : (
                    <div className="relative z-10 glass-card w-full h-full rounded-[2.5rem] flex items-center justify-center hover-lift">
                      <span className="gradient-text text-8xl font-[family-name:var(--font-playfair)] font-bold">
                        {settings.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && settings.showreelUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fade-in"
            onClick={() => setIsVideoOpen(false)}
          >
            <button
              className="absolute top-8 right-8 text-gold hover:text-ivory text-4xl"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              ×
            </button>
            <div className="w-full max-w-6xl aspect-video px-4" onClick={(e) => e.stopPropagation()}>
              <VideoPlayer
                url={settings.showreelUrl}
                title={`${settings.name} - Showreel`}
                autoPlay={true}
                controls={true}
              />
            </div>
          </div>
        )}

        {/* Subtle decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: 'layout style paint' }}>
          <div
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl"
            style={{ contain: 'layout style paint', willChange: 'auto', transform: 'translateZ(0)' }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
            style={{ contain: 'layout style paint', willChange: 'auto', transform: 'translateZ(0)' }}
          />
        </div>
      </section>
    </>
  );
}
