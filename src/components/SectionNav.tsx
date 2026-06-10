import { useNavigate } from 'react-router-dom';

const LINKS = [
  { label: 'Research',    path: '/research',    color: '#6E6EFF' },
  { label: 'Projects',    path: '/performance', color: '#00FF88' },
  { label: 'Experience',  path: '/experience',  color: '#00D4FF' },
  { label: 'About',       path: '/about',       color: '#FF2D78' },
];

export default function SectionNav() {
  const navigate = useNavigate();
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', gap: '6px',
    }}>
      {LINKS.map(({ label, path, color }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          style={{
            background: 'rgba(5,5,18,0.0)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '6px',
            color: '#8888AA',
            fontFamily: "'Syne', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.2em',
            padding: '6px 16px',
            cursor: 'pointer',
            transition: 'color 180ms, border-color 180ms, background 180ms',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.color = color;
            el.style.borderColor = `${color}66`;
            el.style.background = `${color}14`;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.color = '#8888AA';
            el.style.borderColor = 'rgba(255,255,255,0.08)';
            el.style.background = 'rgba(5,5,18,0.0)';
          }}
        >
          {label.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}
