import { fetchAPI } from '@/lib/api';
import type { PortfolioItem } from '@/types/portfolio';
import PortfolioClient from './PortfolioClient';

export const revalidate = 60;

type Category = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  order: number;
};

interface PageContent {
  portfolioTitle?: string;
  portfolioSubtitle?: string;
  portfolioDescription?: string;
}

export default async function Portfolio() {
  const [items, categoriesData, pageContent]: [PortfolioItem[], Category[], PageContent | null] = await Promise.all([
    fetchAPI('/portfolio').catch(() => []),
    fetchAPI('/categories').catch(() => []),
    fetchAPI('/page-content').catch(() => null),
  ]);

  const categoryCounts = new Map<string, number>();
  const categorySet = new Set<string>();

  items.forEach((item) => {
    if (item.category) {
      const normalizedCategory = item.category.trim();
      if (normalizedCategory) {
        categorySet.add(normalizedCategory);
        categoryCounts.set(normalizedCategory, (categoryCounts.get(normalizedCategory) ?? 0) + 1);
      }
    }
  });

  const categoriesFromApi = categoriesData
    .map((cat) => ({ ...cat, name: cat.name?.trim() || '' }))
    .filter((cat) => Boolean(cat.name) && categoryCounts.has(cat.name))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((cat) => cat.name);

  const categories =
    categoriesFromApi.length > 0
      ? categoriesFromApi
      : categorySet.size > 0
      ? Array.from(categorySet).sort()
      : [];

  return (
    <section id="portfolio" className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-background via-background/80 to-background">
      <div className="absolute inset-0 pointer-events-none" style={{ contain: 'layout style paint' }}>
        <div 
          className="absolute -top-32 -right-10 w-[32rem] h-[32rem] bg-primary/10 blur-3xl rounded-full" 
          style={{ 
            contain: 'layout style paint',
            willChange: 'auto',
            transform: 'translateZ(0)'
          }} 
        />
        <div
          className="absolute bottom-0 -left-20 w-[32rem] h-[32rem] bg-secondary/10 blur-3xl rounded-full"
          style={{ 
            contain: 'layout style paint',
            willChange: 'auto',
            transform: 'translateZ(0)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 text-xs tracking-[0.4em] uppercase font-semibold text-primary/80 mb-3 sm:mb-4">
            <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-primary/60 to-primary/40" />
            <span className="relative">
              <span className="relative">{pageContent?.portfolioSubtitle || 'Featured Work'}</span>
            </span>
            <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent via-primary/60 to-primary/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-balance leading-tight px-4 text-foreground">
            {pageContent?.portfolioTitle || 'A living gallery of films, essays, decks, and visual diaries'}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed px-4">
            {pageContent?.portfolioDescription || 'Every medium is a different instrument. Explore treatments, brand films, photo essays, and documents crafted for premium studios, streamers, and fearless founders.'}
          </p>
        </div>

        <PortfolioClient items={items} categories={categories} />
      </div>
    </section>
  );
}
