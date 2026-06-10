import SectionShell from './SectionShell';
import { PERFORMANCE } from '../../content/sections';
import type { ContribStatus } from '../../content/sections';
import { C, T } from '../../styles/theme';

const COLOR = '#00FF88';

function StatusBadge({ status }: { status: ContribStatus }) {
  const map: Record<ContribStatus, { label: string; color: string }> = {
    merged:      { label: 'MERGED',    color: '#00FF88' },
    'in-review': { label: 'IN REVIEW', color: '#FFB800' },
  };
  const { label, color } = map[status];
  return (
    <span style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: '9px',
      fontWeight: 600,
      letterSpacing: '0.25em',
      color,
      border: `1px solid ${color}44`,
      borderRadius: '3px',
      padding: '3px 8px',
    }}>
      {label}
    </span>
  );
}

export default function Performance() {
  return (
    <SectionShell num="02" label="PROJECTS" color={COLOR} nextPath="/experience" nextLabel="EXPERIENCE">

      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '10px',
        color: '#44445A',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        marginBottom: '24px',
      }}>
        {PERFORMANCE.tagline}
      </div>

      <h1 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 'clamp(40px, 7vw, 72px)',
        fontWeight: 700,
        color: '#F0F0F5',
        lineHeight: 1.1,
        marginBottom: '56px',
        whiteSpace: 'pre-line',
      }}>
        {PERFORMANCE.headline}
      </h1>

      <div>
        {PERFORMANCE.contributions.map((c, i) => (
          <div
            key={c.id}
            style={{
              paddingTop: '32px',
              paddingBottom: '32px',
              borderTop: '1px solid #1E1E2E',
            }}
          >
            {/* Top row: status + repo + PR link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <StatusBadge status={c.status} />
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: '#44445A',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = COLOR; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = '#44445A'; }}
              >
                {c.repo} · {c.pr} ↗
              </a>
            </div>

            {/* Title */}
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              fontWeight: 700,
              color: '#F0F0F5',
              marginBottom: '14px',
              letterSpacing: '0.02em',
            }}>
              {c.title}
            </div>

            {/* Problem */}
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#8888AA',
              lineHeight: 1.8,
              marginBottom: '10px',
            }}>
              <span style={{ color: '#44445A', letterSpacing: '0.08em', fontSize: '9px', fontFamily: "'Syne', sans-serif" }}>PROBLEM  </span>
              {c.desc}
            </div>

            {/* Fix */}
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#8888AA',
              lineHeight: 1.8,
              marginBottom: '18px',
            }}>
              <span style={{ color: COLOR, letterSpacing: '0.08em', fontSize: '9px', fontFamily: "'Syne', sans-serif" }}>FIX  </span>
              {c.fix}
            </div>

            {/* Metrics chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {c.metrics.map(m => (
                <span key={m} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: COLOR,
                  padding: '4px 10px',
                  border: `1px solid ${COLOR}33`,
                  borderRadius: '3px',
                  letterSpacing: '0.03em',
                }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </SectionShell>
  );
}
