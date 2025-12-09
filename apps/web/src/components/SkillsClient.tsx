'use client';

import ScrollReveal from './ScrollReveal';

interface Stat {
  id: string;
  number: string;
  label: string;
  icon: string;
  order: number;
}

interface SkillsClientProps {
  cinematicStats: Stat[];
  expertise: string[];
  skillsTitle: string;
  skillsSubtitle: string;
}

export default function SkillsClient({
  cinematicStats,
  expertise,
  skillsTitle,
  skillsSubtitle,
}: SkillsClientProps) {
  return (
    <>
      {/* Section Header */}
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest uppercase text-primary mb-3">{skillsSubtitle}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] text-white">
            {skillsTitle}
          </h2>
        </div>
      </ScrollReveal>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16 max-w-5xl mx-auto">
        {cinematicStats.map((stat: Stat, index: number) => (
          <ScrollReveal key={stat.id || index} rootMargin={`0px 0px -${50 + index * 10}px 0px`}>
            <div
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:bg-white/10 hover:border-primary/30"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] text-white mb-2 font-bold">
                {stat.number}
              </div>
              <div className="text-white/60 tracking-wider uppercase text-xs font-medium">
                {stat.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Expertise Tags */}
      <ScrollReveal>
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-foreground text-center mb-10">
            Core Competencies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {expertise.map((skill: string) => (
              <div
                key={skill}
                className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-foreground/90 hover:border-primary/60 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-pink-500/10 hover:to-red-500/10 hover:text-white transition-colors duration-200 cursor-default"
              >
                <span className="tracking-wide text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}











