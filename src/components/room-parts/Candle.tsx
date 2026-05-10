'use client';

import { motion } from 'framer-motion';

type Props = {
  label: string;
  active: boolean;
  size?: 'sm' | 'lg';
  onClick: () => void;
};

export function Candle({ label, active, size = 'sm', onClick }: Props) {
  const flameW = size === 'lg' ? 22 : 18;
  const flameH = size === 'lg' ? 32 : 26;
  const bodyH = size === 'lg' ? 96 : 72;
  const bodyW = size === 'lg' ? 18 : 14;
  const id = `flame-${label}`.replace(/\s+/g, '-');
  return (
    <button
      onClick={onClick}
      aria-label={`Vela por ${label}`}
      aria-pressed={active}
      className="group inline-flex flex-col items-center gap-3 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
    >
      <div className="relative" style={{ height: bodyH + flameH + 12, width: Math.max(bodyW + 6, flameW + 12) }}>
        {/* glow halo — hidden when extinguished */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: active ? 0.7 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: flameW * 5,
            height: flameH * 3,
            top: -6,
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 65%)',
            filter: 'blur(8px)',
          }}
        />
        {/* flame — only flickers when lit */}
        <motion.div
          initial={false}
          animate={
            active
              ? {
                  scaleY: [1, 1.1, 0.95, 1.08, 1],
                  scaleX: [1, 0.95, 1.05, 0.98, 1],
                  opacity: 1,
                }
              : { opacity: 0, scaleY: 1, scaleX: 1 }
          }
          transition={
            active
              ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
          className="absolute left-1/2 -translate-x-1/2 origin-bottom"
          style={{ width: flameW, height: flameH, top: 0 }}
        >
          <svg viewBox="0 0 20 30" className="w-full h-full" aria-hidden="true">
            <defs>
              <radialGradient id={id} cx="0.5" cy="0.7" r="0.55">
                <stop offset="0%"   stopColor="var(--color-bg)" />
                <stop offset="55%"  stopColor="var(--color-accent)" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d="M10 2 C 15 10, 16 20, 10 28 C 4 20, 5 10, 10 2 Z" fill={`url(#${id})`} />
          </svg>
        </motion.div>
        {/* body */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-bg border-2 border-bg/80"
          style={{ width: bodyW, height: bodyH, top: flameH + 6 }}
          aria-hidden="true"
        />
        {/* wick stub */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-bg"
          style={{ width: 2, height: 4, top: flameH + 4 }}
          aria-hidden="true"
        />
      </div>
      <span className={`font-mono text-xs tracking-[0.18em] uppercase font-medium ${active ? 'text-bg' : 'text-bg/85'}`}>
        {label}
      </span>
    </button>
  );
}
