import { fetchAPI } from '@/lib/api';
import SkillsClient from './SkillsClient';

export const revalidate = 60;

interface Stat {
  id: string;
  number: string;
  label: string;
  icon: string;
  order: number;
}

interface SkillsData {
  stats: Stat[];
  competencies: string[];
}

interface PageContent {
  skillsTitle?: string;
  skillsSubtitle?: string;
}

export default async function Skills() {
  const [skillsData, pageContent] = await Promise.all([
    fetchAPI('/skills').catch(() => null),
    fetchAPI('/page-content').catch(() => null)
  ]);

  // Fallback data if database data is not available
  const defaultStats: Stat[] = [
    { id: '1', number: '20+', label: 'Years in Industry', icon: '🎬', order: 0 },
    { id: '2', number: '200+', label: 'Scripts Produced', icon: '✍️', order: 1 },
    { id: '3', number: '10+', label: 'Awards', icon: '🏆', order: 2 },
    { id: '4', number: '100+', label: 'Global Brands', icon: '🌍', order: 3 },
    { id: '5', number: '50+', label: 'Documentaries', icon: '📽️', order: 4 },
    { id: '6', number: '1000+', label: 'Hours of Content', icon: '⏱️', order: 5 },
  ];

  const defaultCompetencies = [
    'Scriptwriting',
    'Video Production',
    'Documentary Filmmaking',
    'Commercial Direction',
    'Color Grading',
    'Sound Design',
    'Post-Production',
    'Creative Direction',
  ];

  const cinematicStats = (skillsData?.stats && Array.isArray(skillsData.stats) && skillsData.stats.length > 0)
    ? skillsData.stats
    : defaultStats;

  const expertise = (skillsData?.competencies && Array.isArray(skillsData.competencies) && skillsData.competencies.length > 0)
    ? skillsData.competencies
    : defaultCompetencies;

  const skillsTitle = pageContent?.skillsTitle || 'By the Numbers';
  const skillsSubtitle = pageContent?.skillsSubtitle || 'Expertise';

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background" style={{ contain: 'layout style paint' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SkillsClient
          cinematicStats={cinematicStats}
          expertise={expertise}
          skillsTitle={skillsTitle}
          skillsSubtitle={skillsSubtitle}
        />
      </div>

      {/* Background decorations - static to prevent layout shifts */}
      <div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" 
        style={{ 
          contain: 'layout style paint',
          willChange: 'auto',
          transform: 'translateZ(0)'
        }} 
      />
      <div 
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" 
        style={{ 
          contain: 'layout style paint',
          willChange: 'auto',
          transform: 'translateZ(0)'
        }} 
      />
    </section>
  );
}
