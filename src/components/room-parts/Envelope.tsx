'use client';

import { motion } from 'framer-motion';
import { flor } from '@/data/flor';

export function Envelope({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ rotate: -0.6, y: -2 }}
      whileTap={{ y: 0, rotate: 0 }}
      className="relative w-full max-w-md aspect-[3/2] mx-auto overflow-hidden bg-surface border-2 border-border"
      aria-label={`Abrir sobre para ${flor.fullName}`}
    >
      {/* flap — darker triangle */}
      <svg viewBox="0 0 300 200" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <polygon
          points="0,0 150,90 300,0"
          fill="color-mix(in oklch, var(--color-bg) 15%, var(--color-fg))"
          stroke="var(--color-fg)"
          strokeWidth="2"
        />
      </svg>

      {/* stamp corner */}
      <div className="absolute top-3 right-3 w-10 h-12 bg-accent border-2 border-accent flex items-center justify-center">
        <svg viewBox="0 0 20 16" className="w-5 h-4" fill="none" stroke="var(--color-bg)" strokeWidth="1.6">
          <path d="M 2 2 L 10 9 L 18 2" />
          <rect x="2" y="2" width="16" height="12" />
        </svg>
      </div>

      {/* recipient */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-10 px-6">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">Para</span>
        <p className="font-hand text-5xl text-fg mt-1 leading-none">{flor.fullName}</p>
        <p className="font-display italic text-sm text-muted mt-3">
          Ábrelo cuando estés sola.
        </p>
      </div>

      {/* postmark */}
      <div className="absolute bottom-3 left-3 border border-fg/40 px-2 py-1">
        <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-fg/60">10 · 05 · 2026</p>
      </div>
    </motion.button>
  );
}
