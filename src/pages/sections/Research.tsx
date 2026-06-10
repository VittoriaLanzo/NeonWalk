import { useState } from 'react';
import SectionShell from './SectionShell';
import { RESEARCH } from '../../content/sections';
import type { PaperStatus } from '../../content/sections';
import { C, T, F } from '../../styles/theme';

const COLOR = C.research;

function StatusBadge({ status }: { status: PaperStatus }) {
  const map: Record<PaperStatus, { label: string; color: string }> = {
    accepted:  { label: 'ACCEPTED',  color: C.perf },
    submitted: { label: 'SUBMITTED', color: C.exp },
    published: { label: 'PUBLISHED', color: COLOR },
  };
  const { label, color } = map[status];
  return (
    <span style={{ fontFamily: F.display, fontSize: '9px', fontWeight: 600, letterSpacing: '0.25em', color, border: `1px solid ${color}44`, borderRadius: '3px', padding: '3px 8px' }}>
      {label}
    </span>
  );
}

/* ─── GitHub-style repo card ─── */
function RepoCard({ paper }: { paper: typeof RESEARCH.papers[0] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden', marginTop: '48px' }}>

      {/* Repo header */}
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', background: 'rgba(30,30,46,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Repo icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill={C.muted}>
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
          </svg>
          <a href={paper.link!} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.display, fontSize: '14px', fontWeight: 700, color: COLOR, letterSpacing: '0.05em', textDecoration: 'none' }}>
            windowed-minority-guidance
          </a>
          <span style={{ fontFamily: F.body, fontSize: '10px', color: C.muted, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '1px 8px' }}>Public</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: F.body, fontSize: '12px', color: C.muted }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill={C.muted}><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.873 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
            {paper.stars}
          </div>
          {/* PDF link */}
          <a href={paper.pdf} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.display, fontSize: '10px', color: COLOR, letterSpacing: '0.12em', textDecoration: 'none', border: `1px solid ${COLOR}44`, borderRadius: '4px', padding: '4px 10px', transition: 'background 200ms' }}>
            PDF ↗
          </a>
        </div>
      </div>

      {/* Topics */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {paper.topics.map(t => (
          <span key={t} style={{ fontFamily: F.body, fontSize: '11px', color: COLOR, background: `${COLOR}12`, border: `1px solid ${COLOR}2A`, borderRadius: '20px', padding: '2px 10px' }}>{t}</span>
        ))}
      </div>

      {/* Results table */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontFamily: F.display, fontSize: '10px', color: C.muted, letterSpacing: '0.2em', marginBottom: '12px' }}>RESULTS — MEAN CROSS-ENTROPY LOSS AT MINORITY CLASS</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F.body, fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {['Condition', 'Mean Loss ↓', 'Win Rate', 'Relative Effect'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 12px', fontFamily: F.display, fontSize: '9px', color: C.muted, letterSpacing: '0.15em', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paper.results.map((row, i) => {
                const isMid = row.condition === 'minority-mid';
                const isFull = row.condition === 'minority-full';
                return (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: isMid ? `${COLOR}0A` : 'transparent' }}>
                    <td style={{ padding: '9px 12px', color: isMid ? COLOR : isFull ? C.perf : C.dim, fontWeight: isMid || isFull ? 600 : 400, fontFamily: F.body }}>
                      {row.condition}{isMid && <span style={{ marginLeft: '8px', fontSize: '9px', letterSpacing: '0.15em', color: COLOR, fontFamily: F.display }}>← MID</span>}
                    </td>
                    <td style={{ padding: '9px 12px', color: isMid ? COLOR : C.dim, fontFamily: F.body }}>{row.meanLoss}</td>
                    <td style={{ padding: '9px 12px', color: C.dim, fontFamily: F.body }}>{row.winRate}</td>
                    <td style={{ padding: '9px 12px', color: isMid ? COLOR : C.dim, fontWeight: isMid ? 700 : 400, fontFamily: F.body }}>{row.relEffect}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page previews */}
      <div style={{ padding: '0 20px 20px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: F.display, fontSize: '10px', color: C.muted, letterSpacing: '0.2em', padding: '16px 0 12px' }}>PAPER PREVIEW</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {paper.previewImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Page ${i + 1}`}
              onClick={() => setLightboxIdx(i)}
              style={{ width: '100%', aspectRatio: '0.707', objectFit: 'cover', borderRadius: '4px', border: `1px solid ${C.border}`, cursor: 'zoom-in', transition: 'border-color 200ms, opacity 200ms', display: 'block' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = COLOR; (e.target as HTMLElement).style.opacity = '0.85'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.border; (e.target as HTMLElement).style.opacity = '1'; }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,5,18,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '24px' }}
        >
          <img
            src={paper.previewImages[lightboxIdx]}
            alt={`Page ${lightboxIdx + 1}`}
            style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', borderRadius: '6px', border: `1px solid ${C.border}` }}
            onClick={e => e.stopPropagation()}
          />
          <div style={{ position: 'absolute', top: '20px', right: '24px', display: 'flex', gap: '12px' }}>
            {lightboxIdx > 0 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '4px', color: C.dim, fontFamily: F.display, fontSize: '11px', letterSpacing: '0.15em', padding: '6px 14px', cursor: 'pointer' }}>← PREV</button>
            )}
            {lightboxIdx < paper.previewImages.length - 1 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '4px', color: C.dim, fontFamily: F.display, fontSize: '11px', letterSpacing: '0.15em', padding: '6px 14px', cursor: 'pointer' }}>NEXT →</button>
            )}
            <button onClick={() => setLightboxIdx(null)} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '4px', color: C.dim, fontFamily: F.display, fontSize: '11px', letterSpacing: '0.15em', padding: '6px 14px', cursor: 'pointer' }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Page ─── */
export default function Research() {
  const [expanded, setExpanded] = useState(false);
  const paper = RESEARCH.papers[0];

  return (
    <SectionShell num="01" label="RESEARCH" color={COLOR} nextPath="/performance" nextLabel="PROJECTS">

      <div style={{ ...T.label, marginBottom: '20px' }}>{RESEARCH.tagline}</div>

      <h1 style={{ ...T.h1, fontSize: 'clamp(40px, 7vw, 72px)', marginBottom: '48px', whiteSpace: 'pre-line' }}>
        {RESEARCH.headline}
      </h1>

      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '36px' }}>

        {/* Status + venue */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <StatusBadge status={paper.status} />
          <span style={{ fontFamily: F.body, fontSize: '11px', color: C.muted, letterSpacing: '0.08em' }}>{paper.venue}</span>
          <span style={{ fontFamily: F.body, fontSize: '11px', color: C.muted }}>· {paper.year}</span>
        </div>

        {/* Title */}
        <h2 style={{ ...T.h2, fontSize: 'clamp(20px, 3.5vw, 28px)', marginBottom: '16px' }}>{paper.name}</h2>

        {/* Short desc */}
        <p style={{ ...T.body, fontSize: '15px', maxWidth: '580px', marginBottom: '32px' }}>{paper.desc}</p>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', paddingTop: '24px', paddingBottom: '32px', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: '32px' }}>
          {paper.stats.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 26px)', color: COLOR, lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
              <div style={{ fontFamily: F.body, fontSize: '10px', color: C.muted, letterSpacing: '0.05em', lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Abstract toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          style={{ background: 'none', border: `1px solid ${COLOR}33`, borderRadius: '5px', color: COLOR, fontFamily: F.display, fontSize: '10px', letterSpacing: '0.2em', padding: '8px 16px', cursor: 'pointer', marginBottom: expanded ? '20px' : '32px', transition: 'border-color 200ms, background 200ms' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${COLOR}12`; (e.currentTarget as HTMLElement).style.borderColor = COLOR; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}33`; }}
        >
          {expanded ? 'HIDE ABSTRACT ↑' : 'READ ABSTRACT ↓'}
        </button>

        {expanded && (
          <div style={{ ...T.body, fontSize: '14px', lineHeight: 2, maxWidth: '600px', borderLeft: `2px solid ${COLOR}33`, paddingLeft: '20px', marginBottom: '32px' }}>
            {paper.abstract.split('\n\n').map((para, i) => (
              <p key={i} style={{ margin: '0 0 16px' }}>{para}</p>
            ))}
          </div>
        )}

        {/* Stack chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
          {paper.stack.map(s => (
            <span key={s} style={{ ...T.chip }}>{s}</span>
          ))}
        </div>

        {/* Repo card */}
        <RepoCard paper={paper} />

      </div>
    </SectionShell>
  );
}
