import SectionShell from './SectionShell';
import { ABOUT } from '../../content/sections';

const COLOR = '#FF2D78';

const T = {
  label: { fontFamily: "'Syne', sans-serif", fontSize: '10px', color: '#44445A', letterSpacing: '0.3em', textTransform: 'uppercase' } as React.CSSProperties,
  h1:    { fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#F0F0F5', lineHeight: 1.1 } as React.CSSProperties,
  body:  { fontFamily: "'Inter', sans-serif", color: '#8888AA', lineHeight: 1.85 } as React.CSSProperties,
  stat:  { fontFamily: "'Syne', sans-serif", fontWeight: 700, color: COLOR, lineHeight: 1 } as React.CSSProperties,
  link:  { fontFamily: "'Syne', sans-serif", fontSize: '11px', color: '#44445A', letterSpacing: '0.15em', textDecoration: 'none', transition: 'color 200ms' } as React.CSSProperties,
};

export default function About() {
  return (
    <SectionShell num="04" label="ABOUT" color={COLOR}>

      {/* ── Identity ── */}
      <div style={{ ...T.label, marginBottom: '20px' }}>{ABOUT.tagline}</div>

      <h1 style={{ ...T.h1, fontSize: 'clamp(40px, 7vw, 72px)', marginBottom: '36px', whiteSpace: 'pre-line' }}>
        {ABOUT.headline}
      </h1>

      {/* ── Pitch ── */}
      <p style={{ ...T.body, fontSize: '17px', maxWidth: '540px', marginBottom: '20px' }}>
        {ABOUT.pitch}
      </p>
      <p style={{ ...T.body, fontSize: '14px', maxWidth: '560px', marginBottom: '48px' }}>
        {ABOUT.detail}
      </p>

      {/* ── Stats ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px', paddingTop: '28px', paddingBottom: '40px',
        borderTop: '1px solid #1E1E2E', borderBottom: '1px solid #1E1E2E',
        marginBottom: '48px',
      }}>
        {ABOUT.stats.map(s => (
          <div key={s.label}>
            <div style={{ ...T.stat, fontSize: 'clamp(22px, 3vw, 30px)', marginBottom: '6px' }}>{s.value}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#44445A', letterSpacing: '0.05em', lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Availability ── */}
      <div style={{
        border: `1px solid ${COLOR}33`,
        borderRadius: '6px',
        padding: '20px 24px',
        marginBottom: '40px',
        background: `${COLOR}08`,
      }}>
        <div style={{ ...T.label, color: COLOR, marginBottom: '8px' }}>Currently available</div>
        <p style={{ ...T.body, fontSize: '14px', margin: 0 }}>{ABOUT.availability}</p>
      </div>

      {/* ── Contact ── */}
      <div style={{ paddingTop: '24px', borderTop: '1px solid #1E1E2E' }}>
        <div style={{ ...T.label, marginBottom: '16px' }}>Reach out</div>
        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
          <a
            href="mailto:lanzo.vittoria@gmail.com"
            style={T.link}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = COLOR; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = '#44445A'; }}
          >
            EMAIL →
          </a>
          <a
            href="https://github.com/VittoriaLanzo"
            target="_blank" rel="noopener noreferrer"
            style={T.link}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = COLOR; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = '#44445A'; }}
          >
            GITHUB →
          </a>
        </div>
      </div>

    </SectionShell>
  );
}
