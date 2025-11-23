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
      <section id="hero" className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden" style={{ contain: 'layout style paint' }}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text */}
              <div className="space-y-5 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)] text-white leading-[1.1] font-bold" style={{ contain: 'layout style' }}>
                  {settings.name}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-primary tracking-wide font-semibold">
                  {heroSubheadline}
                </p>

                <p className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-lg">
                  {heroHeadline}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                  <div className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-white font-bold">
                      {settings.yearsExperience}+
                    </div>
                    <div className="text-white/60 text-xs tracking-wider uppercase font-medium mt-1">Years</div>
                  </div>
                  <div className="w-px h-12 bg-white/20 hidden sm:block" />
                  <div className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-white font-bold">
                      {settings.projectsCompleted}+
                    </div>
                    <div className="text-white/60 text-xs tracking-wider uppercase font-medium mt-1">Projects</div>
                  </div>
                  <div className="w-px h-12 bg-white/20 hidden sm:block" />
                  <div className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-white font-bold">
                      {settings.clientsServed}+
                    </div>
                    <div className="text-white/60 text-xs tracking-wider uppercase font-medium mt-1">Clients</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
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

              {/* Right Column - Video/Image */}
              <div className="relative">
                {settings.showreelUrl ? (
                  <div
                    className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
                    onClick={() => setIsVideoOpen(true)}
                  >
                    {/* YouTube Thumbnail */}
                    {(() => {
                      const youtubeMatch = settings.showreelUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/);
                      const vimeoMatch = settings.showreelUrl.match(/vimeo\.com\/(\d+)/);
                      const videoId = youtubeMatch?.[1] || vimeoMatch?.[1];
                      const isYoutube = !!youtubeMatch;

                      if (videoId && isYoutube) {
                        return (
                          <Image
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt="Showreel Preview"
                            width={640}
                            height={360}
                            className="w-full aspect-video object-cover"
                            priority
                          />
                        );
                      } else if (settings.profileImageUrl) {
                        return (
                          <Image
                            src={settings.profileImageUrl}
                            alt={settings.name}
                            width={640}
                            height={360}
                            className="w-full aspect-video object-cover"
                            priority
                            {...getImageProps(settings.profileImageUrl)}
                          />
                        );
                      } else {
                        return (
                          <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <span className="text-6xl font-[family-name:var(--font-playfair)] text-white/30">
                              {settings.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        );
                      }
                    })()}
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-background ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <span className="text-white text-sm font-medium px-3 py-1 bg-black/50 rounded-full backdrop-blur-sm">
                        Watch Showreel
                      </span>
                    </div>
                  </div>
                ) : settings.profileImageUrl ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={settings.profileImageUrl}
                      alt={settings.name}
                      width={640}
                      height={640}
                      className="w-full aspect-square object-cover"
                      priority
                      {...getImageProps(settings.profileImageUrl)}
                    />
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10 aspect-video flex items-center justify-center">
                    <span className="text-7xl font-[family-name:var(--font-playfair)] text-white/20 font-bold">
                      {settings.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
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
