'use client';

import { motion } from 'framer-motion';

export function NightWindow() {
  return (
    <div className="relative mx-auto w-full max-w-3xl aspect-[16/9] rounded-2xl overflow-hidden border-8 border-[#3b2a1a] shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e121c] via-[#1e2635] to-[#2a3348]" />
      <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {Array.from({ length: 60 }).map((_, i) => {
          const cx = Math.random() * 800;
          const cy = Math.random() * 450;
          const r = Math.random() * 1.4 + 0.3;
          return <circle key={i} cx={cx} cy={cy} r={r} fill="#fff8ef" opacity={Math.random() * 0.9} />;
        })}
      </svg>
      {/* Moon */}
      <motion.div
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[14%] top-[18%] w-20 h-20 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fef3c7,#d9a441)] shadow-[0_0_40px_rgba(217,164,65,0.45)]"
      />
      {/* Window crossbars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-[#3b2a1a]/80" />
        <div className="absolute top-1/2 left-0 right-0 h-[6px] -translate-y-1/2 bg-[#3b2a1a]/80" />
      </div>
    </div>
  );
}
