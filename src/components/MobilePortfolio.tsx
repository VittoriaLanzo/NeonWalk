import { useState } from 'react';
import { RESEARCH, PERFORMANCE, EXPERIENCE, ABOUT } from '@/content/sections';
import { C, F, T } from '@/styles/theme';

/* ─── Shared mobile primitives ────────────────────────────────────────── */

const SECTION_COLORS: Record<string, string> = {
  research: C.research, performance: C.perf, experience: C.exp, about: C.about,
};

function SectionHeader({ id, label, num }: { id: string; label: string; num: string }) {
  const color = SECTION_COLORS[id];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
      <span style={{ ...T.mono, fontSize: '9px', color: C.muted }}>{num}</span>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color}66, transparent)` }} />
      <span style={{ ...T.label, color, fontSize: '11px' }}>{label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: 'merged' | 'in-review' | 'accepted' | 'submitted' }) {
  const map = {
    merged:    { label: 'MERGED',    color: C.perf },
    'in-review': { label: 'IN REVIEW', color: C.warn },
    accepted:  { label: 'ACCEPTED',  color: C.perf },
    submitted: { label: 'SUBMITTED', color: C.exp  },
  };
  const { label, color } = map[status];
  return (
    <span style={{ ...T.mono, fontSize: '8px', color, border: `1px solid ${color}44`, borderRadius: '3px', padding: '2px 7px' }}>
      {label}
    </span>
  );
}

/* ─── Sections ────────────────────────────────────────────────────────── */

function ResearchSection() {
  const [open, setOpen] = useState(false);
  const paper = RESEARCH.papers[0];
  return (
    <section style={{ padding: '40px 20px', borderBottom: `1px solid ${C.border}` }}>
      <SectionHeader id="research" label="RESEARCH" num="01" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <StatusBadge status={paper.status} />
        <span style={{ ...T.body, fontSize: '11px', color: C.muted }}>{paper.venue}</span>
      </div>
      <h2 style={{ ...T.h2, fontSize: 'clamp(18px, 5vw, 24px)', marginBottom: '14px', color: C.fg }}>{paper.name}</h2>
      <p style={{ ...T.body, fontSize: '14px', marginBottom: '20px' }}>{paper.desc}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', padding: '16px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        {paper.stats.map(s => (
          <div key={s.label}>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: '22px', color: C.research, lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontFamily: F.body, fontSize: '10px', color: C.muted, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <button onClick={() => setOpen(v => !v)} style={{ background: 'none', border: `1px solid ${C.research}44`, borderRadius: '4px', color: C.research, fontFamily: F.display, fontSize: '9px', letterSpacing: '0.2em', padding: '7px 14px', cursor: 'pointer', marginBottom: open ? '16px' : 0 }}>
        {open ? 'HIDE ABSTRACT ↑' : 'READ ABSTRACT ↓'}
      </button>
      {open && (
        <div style={{ ...T.body, fontSize: '13px', lineHeight: 1.85, borderLeft: `2px solid ${C.research}33`, paddingLeft: '16px' }}>
          {paper.abstract.split('\n\n').map((p, i) => <p key={i} style={{ margin: '0 0 12px' }}>{p}</p>)}
        </div>
      )}
      {paper.link && (
        <a href={paper.link} target="_blank" rel="noopener noreferrer" style={{ ...T.link, display: 'block', marginTop: '16px', color: C.muted }} onMouseEnter={e => (e.currentTarget.style.color = C.research)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
          GITHUB →
        </a>
      )}
    </section>
  );
}

function PerformanceSection() {
  const merged   = PERFORMANCE.contributions.filter(c => c.status === 'merged');
  const inReview = PERFORMANCE.contributions.filter(c => c.status === 'in-review');
  return (
    <section style={{ padding: '40px 20px', borderBottom: `1px solid ${C.border}` }}>
      <SectionHeader id="performance" label="PROJECTS" num="02" />
      {[...merged, ...inReview].map(c => (
        <div key={c.id} style={{ paddingBottom: '24px', marginBottom: '24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <StatusBadge status={c.status} />
            <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ ...T.mono, fontSize: '10px', color: C.muted, textDecoration: 'none' }}>
              {c.repo} · {c.pr} ↗
            </a>
          </div>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: '15px', color: C.fg, marginBottom: '8px', lineHeight: 1.3 }}>{c.title}</div>
          <div style={{ fontFamily: F.body, fontSize: '12px', color: C.muted, lineHeight: 1.7, marginBottom: '10px' }}>
            <span style={{ fontFamily: F.display, fontSize: '8px', color: C.perf, letterSpacing: '0.15em' }}>FIX  </span>{c.fix}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {c.metrics.map(m => (
              <span key={m} style={{ fontFamily: F.body, fontSize: '10px', color: C.perf, padding: '3px 8px', border: `1px solid ${C.perf}33`, borderRadius: '3px' }}>{m}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function ExperienceSection() {
  return (
    <section style={{ padding: '40px 20px', borderBottom: `1px solid ${C.border}` }}>
      <SectionHeader id="experience" label="EXPERIENCE" num="03" />
      {EXPERIENCE.timeline.map((e, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: '16px', marginBottom: '28px' }}>
          <div style={{ fontFamily: F.display, fontSize: '10px', color: C.muted, letterSpacing: '0.08em', paddingTop: '2px' }}>{e.year}</div>
          <div>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: '14px', color: C.fg, marginBottom: '3px' }}>{e.role}</div>
            <div style={{ fontFamily: F.body, fontSize: '11px', color: C.exp, letterSpacing: '0.04em', marginBottom: '6px' }}>{e.org}</div>
            <div style={{ fontFamily: F.body, fontSize: '13px', color: C.muted, lineHeight: 1.7 }}>{e.desc}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

function AboutSection() {
  return (
    <section style={{ padding: '40px 20px 60px' }}>
      <SectionHeader id="about" label="ABOUT" num="04" />
      <h1 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(32px, 8vw, 48px)', color: C.fg, lineHeight: 1.1, marginBottom: '24px', whiteSpace: 'pre-line' }}>
        {ABOUT.headline}
      </h1>
      <p style={{ ...T.body, fontSize: '16px', marginBottom: '16px', maxWidth: '480px' }}>{ABOUT.pitch}</p>
      <p style={{ ...T.body, fontSize: '13px', marginBottom: '32px', maxWidth: '480px' }}>{ABOUT.detail}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '24px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: '28px' }}>
        {ABOUT.stats.map(s => (
          <div key={s.label}>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: '26px', color: C.about, lineHeight: 1, marginBottom: '5px' }}>{s.value}</div>
            <div style={{ fontFamily: F.body, fontSize: '10px', color: C.muted, letterSpacing: '0.04em', lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ border: `1px solid ${C.about}33`, borderRadius: '6px', padding: '16px 20px', background: `${C.about}08`, marginBottom: '28px' }}>
        <div style={{ ...T.label, color: C.about, marginBottom: '6px' }}>Currently available</div>
        <p style={{ ...T.body, fontSize: '13px', margin: 0 }}>{ABOUT.availability}</p>
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <a href="mailto:lanzo.vittoria@gmail.com" style={{ ...T.link }} onMouseEnter={e => (e.currentTarget.style.color = C.about)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>EMAIL →</a>
        <a href="https://github.com/VittoriaLanzo" target="_blank" rel="noopener noreferrer" style={{ ...T.link }} onMouseEnter={e => (e.currentTarget.style.color = C.about)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>GITHUB →</a>
      </div>
    </section>
  );
}

/* ─── Mobile root ─────────────────────────────────────────────────────── */

export default function MobilePortfolio() {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.fg, overflowX: 'hidden' }}>
      {/* Scanlines */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)' }} />

      {/* Sticky header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(5,5,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: '13px', color: C.fg, letterSpacing: '0.15em' }}>VITTORIA LANZO</div>
        <div style={{ fontFamily: F.display, fontSize: '9px', color: C.muted, letterSpacing: '0.2em' }}>ML RESEARCHER</div>
      </header>

      {/* Hero */}
      <div style={{ padding: '48px 20px 32px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...T.label, marginBottom: '16px' }}>ML Researcher · Agentic Architect · Performance Engineer</div>
        <h1 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(36px, 10vw, 56px)', color: C.fg, lineHeight: 1.05, marginBottom: '16px' }}>
          I run<br />experiments.<br />
          <span style={{ color: C.research }}>Agents</span> ship<br />the rest.
        </h1>
        <p style={{ ...T.body, fontSize: '14px', maxWidth: '400px' }}>
          17 · Cesena, Italy · EEML 2026 · 2 merged PRs into PrefectHQ/prefect · 4 more in review.
        </p>
      </div>

      <ResearchSection />
      <PerformanceSection />
      <ExperienceSection />
      <AboutSection />

      <footer style={{ padding: '20px', textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: F.display, fontSize: '10px', color: C.muted, letterSpacing: '0.2em' }}>© 2026 VITTORIA LANZO</div>
        <a href="https://vittorialanzo.vercel.app" style={{ ...T.link, fontSize: '10px', display: 'block', marginTop: '6px' }}>vittorialanzo.vercel.app</a>
      </footer>
    </div>
  );
}
