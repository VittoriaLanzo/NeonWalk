import { useEffect, useState } from 'react';

const corePractice = [
  'Prompt Engineering',
  'Agentic Design',
  'AI Systems Architecture',
  'Chain-of-Thought Design',
  'RAG Pipeline Development',
  'Human-AI Interaction',
];

const technical = [
  'Python',
  'C',
  'SQL',
  'LaTeX',
  'LLM Orchestration',
  'Autonomous Agents',
  'Structured Outputs',
];

export default function SkillsDistrict({ visible }: { visible: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible && !isVisible) {
      setTimeout(() => setIsVisible(true), 200);
    }
  }, [visible, isVisible]);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
      <div
        className={`max-w-[900px] w-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Section label */}
        <p className="font-display text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-6">
          EXPERTISE
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Core Practice */}
          <div>
            <h3 className="font-display text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Core Practice
            </h3>
            <ul className="space-y-3">
              {corePractice.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-3 cursor-default transition-colors duration-200"
                >
                  <span className="w-1 h-1 bg-accent group-hover:bg-secondary flex-shrink-0" />
                  <span className="font-body text-[15px] text-text-secondary group-hover:text-foreground transition-colors duration-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical */}
          <div>
            <h3 className="font-display text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Technical
            </h3>
            <ul className="space-y-3">
              {technical.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-3 cursor-default transition-colors duration-200"
                >
                  <span className="w-1 h-1 bg-accent group-hover:bg-secondary flex-shrink-0" />
                  <span className="font-body text-[15px] text-text-secondary group-hover:text-foreground transition-colors duration-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
