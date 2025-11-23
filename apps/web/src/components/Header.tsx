'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getImageProps } from '@/lib/image-utils';

interface NavItem {
  label: string;
  href: string;
  order: number;
}

interface SocialLinks {
  linkedin?: string;
  vimeo?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}

interface NavigationSettings {
  links?: NavItem[];
  mainNavigation?: NavItem[];
  logoText?: string;
  logoUrl?: string;
}

interface SiteSettings {
  socialLinks?: SocialLinks;
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([
    { href: '#home', label: 'Home', order: 0 },
    { href: '#about', label: 'About', order: 1 },
    { href: '#portfolio', label: 'Portfolio', order: 2 },
    { href: '#skills', label: 'Skills', order: 3 },
    { href: '#contact', label: 'Contact', order: 4 },
  ]);
  const [logoText, setLogoText] = useState('EH');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

    // Fetch navigation settings
    fetch(`${API_URL}/api/navigation`)
      .then(res => res.json())
      .then((data: NavigationSettings) => {
        const links = data.links?.length ? data.links : data.mainNavigation || [];
        if (links.length > 0) {
          const sortedLinks = links
            .map((link, index) => ({ ...link, order: link.order ?? index }))
            .sort((a, b) => a.order - b.order);
          setNavItems(sortedLinks);
        }
        if (typeof data.logoText === 'string' && data.logoText.trim()) {
          setLogoText(data.logoText.trim());
        }
        setLogoUrl(data.logoUrl?.trim() ? data.logoUrl.trim() : null);
      })
      .catch(err => console.error('Error fetching navigation:', err));

    // Fetch site settings for social links
    fetch(`${API_URL}/api/site-settings`)
      .then(res => res.json())
      .then((data: SiteSettings) => {
        if (data.socialLinks) {
          setSocialLinks(data.socialLinks);
        }
      })
      .catch(err => console.error('Error fetching site settings:', err));
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const normalizeHref = (href: string) => {
    if (!href) return '#';
    if (href.startsWith('/#')) {
      return href;
    }
    if (href.startsWith('#')) {
      return pathname === '/' ? href : `/${href}`;
    }
    return href;
  };

  return (
    <header
      className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-white/5 overflow-hidden"
      style={{
        contain: 'layout style paint',
        willChange: 'auto',
        transform: 'translateZ(0)'
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex h-14 items-center justify-between overflow-hidden">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 max-h-10 overflow-hidden">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Site logo"
                width={100}
                height={32}
                priority
                className="h-8 w-auto object-contain max-w-[120px]"
              />
            ) : (
              <span className="text-lg font-[family-name:var(--font-playfair)] text-primary tracking-wider">
                {logoText}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={normalizeHref(item.href)}
                className="text-sm tracking-wider uppercase text-white/70 hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}

            {/* Social Icons */}
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                )}
                {socialLinks.vimeo && (
                  <a href={socialLinks.vimeo} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="Vimeo">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>
                  </a>
                )}
                {socialLinks.youtube && (
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" aria-label="X (Twitter)">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/70 hover:text-primary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={normalizeHref(item.href)}
                  className="text-sm tracking-wider uppercase text-white/70 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
