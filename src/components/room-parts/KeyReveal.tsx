'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { KeyColor } from '@/hooks/useHouseStore';

export const KEY_COLOR_VAR: Record<KeyColor, string> = {
  rose:  'var(--color-accent)',
  amber: 'oklch(72% 0.15 75)',
  leaf:  'oklch(58% 0.11 145)',
  sky:   'oklch(64% 0.1 230)',
};

export const KEY_COLOR_NAME: Record<KeyColor, string> = {
  rose:  'rosa',
  amber: 'ámbar',
  leaf:  'verde',
  sky:   'azul',
};

type Props = {
  color: KeyColor;
};

export function KeyReveal({ color }: Props) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative border-2 border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 max-w-3xl mx-auto"
    >
      <motion.div
        initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', damping: 14, stiffness: 160 }}
        className="shrink-0"
      >
        <KeyIcon color={color} size={112} />
      </motion.div>

      <div className="flex-1 text-center md:text-left">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
          Una llave · color {KEY_COLOR_NAME[color]}
        </span>
        <h3
          className="font-display text-3xl md:text-4xl leading-none mt-2"
          style={{ fontVariationSettings: '"opsz" 72, "SOFT" 80, "WONK" 1' }}
        >
          La <em>encontraste</em>.
        </h3>
        <p className="mt-3 font-display italic text-base md:text-lg text-muted">
          Recuerda este color: <strong className="not-italic text-fg">{KEY_COLOR_NAME[color]}</strong>. Al final lo vas a necesitar para abrir el buzón.
        </p>
        <div className="mt-5 flex justify-center md:justify-start">
          <Link
            href="/cuarto/patio"
            className="inline-flex items-center gap-3 bg-accent text-bg border-2 border-accent px-5 py-3 font-mono text-[11px] tracking-[0.16em] uppercase hover:bg-fg hover:border-fg transition-colors"
          >
            Seguir al patio
            <span aria-hidden="true" className="font-display text-xl leading-none">→</span>
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}

export function KeyIcon({ color, size = 64 }: { color: KeyColor; size?: number }) {
  const fill = KEY_COLOR_VAR[color];
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {/* bow (head of key) */}
      <circle cx="22" cy="40" r="14" fill={fill} stroke="var(--color-fg)" strokeWidth="2" />
      <circle cx="22" cy="40" r="5" fill="var(--color-bg)" stroke="var(--color-fg)" strokeWidth="2" />
      {/* shaft */}
      <rect x="36" y="37" width="36" height="6" fill={fill} stroke="var(--color-fg)" strokeWidth="2" />
      {/* teeth */}
      <rect x="58" y="43" width="4" height="7" fill={fill} stroke="var(--color-fg)" strokeWidth="2" />
      <rect x="66" y="43" width="4" height="5" fill={fill} stroke="var(--color-fg)" strokeWidth="2" />
    </svg>
  );
}
