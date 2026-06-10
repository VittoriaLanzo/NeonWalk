import { useEffect, useState } from 'react';

const stats = [
  { number: '4+', label: 'Years in AI Systems' },
  { number: '20+', label: 'Agentic Pipelines Deployed' },
  { number: '3', label: 'Languages (Python, C, SQL)' },
  { number: '∞', label: 'Prompts Engineered' },
];

export default function AboutDistrict({ visible }: { visible: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible && !isVisible) {
      setTimeout(() => setIsVisible(true), 300);
    }
  }, [visible, isVisible]);

  return (
    <section className="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div
        className={`max-w-[900px] w-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Section label */}
        <p className="font-display text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-6">
          ABOUT
        </p>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Bio */}
          <div className="md:w-[60%]">
            <p className="font-body text-base leading-[1.8] text-text-secondary">
              I design the cognitive layer between human intent and machine
              execution. My work lives at the intersection of linguistics,
              systems thinking, and AI architecture — building the prompts,
              pipelines, and agentic frameworks that make intelligent systems
              behave precisely.
            </p>
          </div>

          {/* Stats */}
          <div className="md:w-[40%] flex flex-col">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-5 ${i < stats.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="font-display text-5xl font-bold text-foreground">
                  {stat.number}
                </div>
                <div className="font-body text-[13px] text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
