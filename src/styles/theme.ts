/* ─── Shared design tokens ────────────────────────────────────────────────
   Single source of truth for repeated inline style patterns.
   Import { T, C, F } in any section page or component.
   ─────────────────────────────────────────────────────────────────────── */

export const C = {
  bg:       '#050512',
  fg:       '#F0F0F5',
  dim:      '#8888AA',
  muted:    '#44445A',
  border:   '#1E1E2E',
  research: '#6E6EFF',
  perf:     '#00FF88',
  exp:      '#00D4FF',
  about:    '#FF2D78',
  warn:     '#FFB800',
} as const;

export const F = {
  display: "'Syne', sans-serif",
  body:    "'Inter', sans-serif",
} as const;

/** Typography presets — spread as style objects */
export const T = {
  label: { fontFamily: F.display, fontSize: '10px', color: C.muted, letterSpacing: '0.3em', textTransform: 'uppercase' as const },
  h1:    { fontFamily: F.display, fontWeight: 700,  color: C.fg, lineHeight: 1.1 },
  h2:    { fontFamily: F.display, fontWeight: 700,  color: C.fg, lineHeight: 1.2 },
  h3:    { fontFamily: F.display, fontWeight: 700,  color: C.fg, letterSpacing: '0.02em' },
  body:  { fontFamily: F.body,    color: C.dim,  lineHeight: 1.8 },
  mono:  { fontFamily: F.display, letterSpacing: '0.18em' },
  link:  { fontFamily: F.display, fontSize: '11px', color: C.muted, letterSpacing: '0.15em', textDecoration: 'none' as const, transition: 'color 200ms' },
  chip:  { fontFamily: F.body,    fontSize: '10px', color: C.muted, padding: '3px 8px', border: `1px solid ${C.border}`, borderRadius: '3px' },
} as const;

export const divider = { height: '1px', background: C.border, margin: '0 0 32px' };
