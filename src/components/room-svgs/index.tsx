import './svg-animations.css';

type Props = { className?: string };

export function PuertaSvg({ className = '' }: Props) {
  return (
    <svg className={`rsv-puerta ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <line className="ray" x1="50" y1="6"  x2="50" y2="18" />
      <line className="ray" x1="84" y1="16" x2="76" y2="24" />
      <line className="ray" x1="94" y1="50" x2="82" y2="50" />
      <line className="ray" x1="84" y1="84" x2="76" y2="76" />
      <line className="ray" x1="50" y1="94" x2="50" y2="82" />
      <line className="ray" x1="16" y1="84" x2="24" y2="76" />
      <line className="ray" x1="6"  y1="50" x2="18" y2="50" />
      <line className="ray" x1="16" y1="16" x2="24" y2="24" />
      <circle cx="50" cy="50" r="16" fill="var(--color-accent)" />
    </svg>
  );
}

export function PasajeSvg({ className = '' }: Props) {
  return (
    <svg className={`rsv-pasaje ${className}`} viewBox="0 0 100 70" aria-hidden="true">
      <circle cx="72" cy="22" r="9" fill="var(--color-accent)" opacity="0.92" />
      <path className="wave w1" d="M 0 40 Q 15 34, 30 40 T 60 40 T 100 40" />
      <path className="wave w2" d="M 0 50 Q 15 44, 30 50 T 60 50 T 100 50" />
      <path className="wave w3" d="M 0 60 Q 15 54, 30 60 T 60 60 T 100 60" />
    </svg>
  );
}

export function CocinaSvg({ className = '' }: Props) {
  return (
    <svg className={`rsv-cocina ${className}`} viewBox="0 0 100 80" aria-hidden="true">
      <path className="steam s1" d="M 35 30 Q 30 22, 35 14 Q 40 6, 35 0" />
      <path className="steam s2" d="M 50 30 Q 45 20, 52 10 Q 58 2, 52 -4" />
      <path className="steam s3" d="M 65 30 Q 62 22, 66 14 Q 70 6, 66 0" />
      <path className="heart" d="M 74 32 C 76 29, 80 29, 80 33 C 80 36, 74 40, 74 40 C 74 40, 68 36, 68 33 C 68 29, 72 29, 74 32 Z" />
      <path d="M 25 36 L 26 34 L 74 34 L 75 36 L 72 72 L 28 72 Z"
            fill="var(--color-surface)" stroke="var(--color-fg)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 22 34 L 78 34" stroke="var(--color-fg)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PatioSvg({ className = '' }: Props) {
  return (
    <svg className={`rsv-patio ${className}`} viewBox="0 0 100 80" aria-hidden="true">
      <path d="M 50 78 Q 50 60, 50 45" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 50 55 Q 56 50, 62 52" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path className="leaf" d="M 60 54 Q 70 50, 74 42 Q 68 50, 60 54 Z" />
      <g>
        <ellipse className="petal" cx="50" cy="28" rx="6"   ry="12" style={{ transform: 'rotate(0deg) translateY(-4px)' }} />
        <ellipse className="petal" cx="50" cy="28" rx="6"   ry="12" style={{ transform: 'rotate(72deg) translateY(-4px)', transformOrigin: '50px 40px' }} />
        <ellipse className="petal" cx="50" cy="28" rx="6"   ry="12" style={{ transform: 'rotate(144deg) translateY(-4px)', transformOrigin: '50px 40px' }} />
        <ellipse className="petal" cx="50" cy="28" rx="6"   ry="12" style={{ transform: 'rotate(216deg) translateY(-4px)', transformOrigin: '50px 40px' }} />
        <ellipse className="petal" cx="50" cy="28" rx="6"   ry="12" style={{ transform: 'rotate(288deg) translateY(-4px)', transformOrigin: '50px 40px' }} />
      </g>
      <circle cx="50" cy="40" r="4.5" fill="var(--color-fg)" />
    </svg>
  );
}

export function MusicaSvg({ className = '' }: Props) {
  return (
    <svg className={`rsv-musica ${className}`} viewBox="0 0 100 80" aria-hidden="true">
      <text className="note n1" x="72" y="32">♪</text>
      <text className="note n2" x="78" y="24">♫</text>
      <text className="note n3" x="70" y="18">♪</text>
      <g className="record">
        <circle cx="40" cy="42" r="30" fill="var(--color-fg)" />
        <circle cx="40" cy="42" r="26" fill="none" stroke="var(--color-bg)" strokeWidth="0.6" opacity="0.45" />
        <circle cx="40" cy="42" r="22" fill="none" stroke="var(--color-bg)" strokeWidth="0.6" opacity="0.45" />
        <circle cx="40" cy="42" r="18" fill="none" stroke="var(--color-bg)" strokeWidth="0.6" opacity="0.45" />
        <circle cx="40" cy="42" r="10" fill="var(--color-accent)" />
        <circle cx="40" cy="42" r="2"  fill="var(--color-bg)" />
      </g>
    </svg>
  );
}

export function FamiliaSvg({ className = '', onNight = false }: Props & { onNight?: boolean }) {
  const frame = onNight ? 'var(--color-bg)' : 'var(--color-fg)';
  return (
    <svg className={`rsv-familia ${className}`} viewBox="0 0 100 80" aria-hidden="true" style={{ color: frame }}>
      <rect x="12" y="10" width="76" height="60" stroke={frame} strokeWidth="1.5" fill="none" />
      <line x1="50" y1="10" x2="50" y2="70" stroke={frame} strokeOpacity="0.35" strokeWidth="1" />
      <line x1="12" y1="40" x2="88" y2="40" stroke={frame} strokeOpacity="0.35" strokeWidth="1" />
      <circle className="moon" cx="72" cy="22" r="7" />
      <circle className="star" cx="24" cy="20" r="1.5" />
      <circle className="star" cx="38" cy="26" r="1" />
      <circle className="star" cx="58" cy="18" r="1.2" />
      <circle className="star" cx="26" cy="52" r="1" />
      <circle className="star" cx="44" cy="58" r="1.4" />
      <circle className="star" cx="78" cy="52" r="1" />
      <circle className="star" cx="32" cy="34" r="0.8" />
    </svg>
  );
}

export function BuzonSvg({ className = '', invert = false }: Props & { invert?: boolean }) {
  const fill = invert ? 'var(--color-fg)' : 'var(--color-surface)';
  const stroke = invert ? 'var(--color-bg)' : 'var(--color-fg)';
  const flapFill = invert
    ? 'color-mix(in oklch, var(--color-bg) 15%, var(--color-fg))'
    : 'color-mix(in oklch, var(--color-fg) 15%, var(--color-bg))';
  return (
    <svg className={`rsv-buzon ${className}`} viewBox="0 0 100 70" aria-hidden="true">
      <rect x="10" y="18" width="80" height="44" fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <path d="M 10 18 L 50 44 L 90 18 Z" fill={flapFill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <path className="ink" d="M 26 38 Q 36 34, 50 36 T 74 36" />
    </svg>
  );
}

export const roomSvgMap = {
  puerta:  PuertaSvg,
  pasaje:  PasajeSvg,
  cocina:  CocinaSvg,
  patio:   PatioSvg,
  musica:  MusicaSvg,
  familia: FamiliaSvg,
  buzon:   BuzonSvg,
} as const;
