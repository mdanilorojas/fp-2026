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
  const bodyH = size === 'lg' ? 80 : 60;
  return (
    <button
      onClick={onClick}
      aria-label={`Vela por ${label}`}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="relative" style={{ height: bodyH + flameH + 10 }}>
        <motion.div
          animate={{
            scaleY: [1, 1.1, 0.95, 1.08, 1],
            scaleX: [1, 0.95, 1.05, 0.98, 1],
            opacity: active ? 1 : 0.85,
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 -translate-x-1/2 origin-bottom"
          style={{ width: flameW, height: flameH, top: 0 }}
        >
          <svg viewBox="0 0 20 30" className="w-full h-full">
            <defs>
              <radialGradient id={`flame-${label}`} cx="0.5" cy="0.65" r="0.55">
                <stop offset="0%" stopColor="#fff4c0" />
                <stop offset="55%" stopColor="#f9b572" />
                <stop offset="100%" stopColor="#d9a441" />
              </radialGradient>
            </defs>
            <path d="M10 2 C 15 10, 16 20, 10 28 C 4 20, 5 10, 10 2 Z" fill={`url(#flame-${label})`} />
          </svg>
        </motion.div>
        <motion.div
          animate={{ opacity: active ? 0.8 : 0.3 }}
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#f9b572] blur-2xl pointer-events-none"
          style={{ width: flameW * 4, height: flameH * 3, top: -10 }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-sm bg-gradient-to-b from-[#f8e4ad] to-[#d4b97c] border border-[#b59664]"
          style={{ width: flameW - 2, height: bodyH, top: flameH + 6 }}
        />
      </div>
      <span className={`font-serif text-base ${active ? 'text-paper' : 'text-paper/70'}`}>{label}</span>
    </button>
  );
}
