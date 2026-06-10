import SectionShell from './SectionShell';
import { EXPERIENCE } from '../../content/sections';
import { C, T } from '../../styles/theme';

const COLOR = '#00D4FF';

export default function Experience() {
  return (
    <SectionShell num="03" label="EXPERIENCE" color={COLOR} nextPath="/about" nextLabel="ABOUT">

      <h1 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 'clamp(40px, 7vw, 72px)',
        fontWeight: 700,
        color: '#F0F0F5',
        lineHeight: 1.1,
        marginBottom: '56px',
        whiteSpace: 'pre-line',
      }}>
        {EXPERIENCE.headline}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {EXPERIENCE.timeline.map((entry, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '64px 1fr',
              gap: '24px',
              alignItems: 'start',
              paddingTop: '32px',
              paddingBottom: '32px',
              borderTop: '1px solid #1E1E2E',
            }}
          >
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '11px',
              color: '#44445A',
              letterSpacing: '0.1em',
              paddingTop: '2px',
            }}>
              {entry.year}
            </div>
            <div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                color: '#F0F0F5',
                marginBottom: '4px',
                letterSpacing: '0.02em',
              }}>
                {entry.role}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: COLOR,
                marginBottom: '10px',
                letterSpacing: '0.04em',
              }}>
                {entry.org}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#8888AA',
                lineHeight: 1.8,
              }}>
                {entry.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

    </SectionShell>
  );
}
