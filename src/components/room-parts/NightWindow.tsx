'use client';

import { motion } from 'framer-motion';

// Deterministic star field — avoids SSR/client hydration mismatch and gives visual control
const STARS: Array<{ cx: number; cy: number; r: number; o: number }> = [
  { cx: 32,  cy: 28,  r: 0.9, o: 0.6 },
  { cx: 64,  cy: 52,  r: 1.2, o: 0.85 },
  { cx: 120, cy: 18,  r: 0.6, o: 0.5 },
  { cx: 168, cy: 76,  r: 1,   o: 0.7 },
  { cx: 224, cy: 40,  r: 1.4, o: 0.9 },
  { cx: 276, cy: 62,  r: 0.8, o: 0.55 },
  { cx: 320, cy: 24,  r: 1,   o: 0.8 },
  { cx: 372, cy: 96,  r: 1.3, o: 0.75 },
  { cx: 420, cy: 44,  r: 0.7, o: 0.5 },
  { cx: 476, cy: 80,  r: 1.1, o: 0.9 },
  { cx: 516, cy: 28,  r: 0.9, o: 0.6 },
  { cx: 572, cy: 110, r: 1.2, o: 0.7 },
  { cx: 620, cy: 56,  r: 0.8, o: 0.5 },
  { cx: 680, cy: 100, r: 1.4, o: 0.85 },
  { cx: 728, cy: 34,  r: 1,   o: 0.75 },
  { cx: 772, cy: 88,  r: 0.9, o: 0.55 },
  { cx: 50,  cy: 160, r: 1.1, o: 0.8 },
  { cx: 96,  cy: 220, r: 0.8, o: 0.5 },
  { cx: 148, cy: 192, r: 1.3, o: 0.9 },
  { cx: 200, cy: 256, r: 0.7, o: 0.6 },
  { cx: 256, cy: 200, r: 1,   o: 0.7 },
  { cx: 304, cy: 276, r: 1.2, o: 0.85 },
  { cx: 356, cy: 240, r: 0.9, o: 0.55 },
  { cx: 408, cy: 180, r: 0.6, o: 0.5 },
  { cx: 460, cy: 296, r: 1.4, o: 0.8 },
  { cx: 512, cy: 204, r: 0.8, o: 0.65 },
  { cx: 560, cy: 268, r: 1,   o: 0.75 },
  { cx: 612, cy: 216, r: 0.9, o: 0.6 },
  { cx: 664, cy: 292, r: 1.2, o: 0.85 },
  { cx: 720, cy: 196, r: 0.7, o: 0.55 },
  { cx: 768, cy: 248, r: 1.1, o: 0.7 },
  { cx: 80,  cy: 348, r: 1,   o: 0.7 },
  { cx: 180, cy: 376, r: 0.9, o: 0.6 },
  { cx: 280, cy: 320, r: 1.3, o: 0.85 },
  { cx: 380, cy: 396, r: 0.7, o: 0.5 },
  { cx: 480, cy: 340, r: 1,   o: 0.75 },
  { cx: 580, cy: 384, r: 1.2, o: 0.8 },
  { cx: 680, cy: 352, r: 0.8, o: 0.55 },
  { cx: 740, cy: 412, r: 1,   o: 0.7 },
];

export function NightWindow() {
  return (
    <div className="relative mx-auto w-full max-w-3xl aspect-[16/9] border-2 border-bg/40 overflow-hidden bg-night">
      {/* Starfield */}
      <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* distant cordillera (mountains) */}
        <path
          d="M0 340 L80 280 L140 310 L220 240 L300 295 L380 250 L460 300 L540 230 L620 285 L700 255 L760 295 L800 270 L800 450 L0 450 Z"
          fill="var(--color-bg)"
          opacity="0.08"
        />
        <path
          d="M0 380 L90 350 L170 365 L260 320 L340 350 L430 315 L520 345 L610 310 L690 340 L770 330 L800 340 L800 450 L0 450 Z"
          fill="var(--color-bg)"
          opacity="0.13"
        />

        {/* stars */}
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="var(--color-bg)"
            opacity={s.o}
          />
        ))}

        {/* small house silhouette — Pasaje, El Oro */}
        <g opacity="0.22" fill="var(--color-bg)">
          <rect x="560" y="360" width="90" height="50" />
          <polygon points="555,360 605,325 655,360" />
          <rect x="590" y="378" width="14" height="22" fill="var(--color-night)" />
          <rect x="615" y="370" width="14" height="12" fill="var(--color-night)" />
        </g>

        {/* single tree silhouette left */}
        <g opacity="0.22" fill="var(--color-bg)">
          <rect x="115" y="360" width="6" height="40" />
          <ellipse cx="118" cy="350" rx="28" ry="24" />
        </g>
      </svg>

      {/* Moon with subtle crater shading */}
      <motion.div
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[12%] top-[14%] w-20 h-20 md:w-24 md:h-24 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, color-mix(in oklch, var(--color-accent) 92%, white 20%) 0%, var(--color-accent) 55%, color-mix(in oklch, var(--color-accent) 80%, black 15%) 100%)',
          boxShadow: '0 0 60px color-mix(in oklch, var(--color-accent) 55%, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Window frame — thick outer sash + crossbars */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-2 border-2 border-bg/30" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[5px] -translate-x-1/2 bg-bg/35" />
        <div className="absolute top-1/2 left-0 right-0 h-[5px] -translate-y-1/2 bg-bg/35" />
      </div>

      {/* window sill shadow */}
      <div
        className="absolute left-0 right-0 bottom-0 h-8 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, color-mix(in oklch, var(--color-night) 70%, black 30%), transparent)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
