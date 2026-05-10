'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Garden } from '@/components/room-parts/Garden';
import { Perritos } from '@/components/room-parts/Perritos';

function HeartShape() {
  return (
    <svg viewBox="0 0 24 22" className="w-full h-full" aria-hidden="true">
      <path
        d="M12 20 C 12 20, 2 14, 2 8 C 2 4, 5 2, 8 2 C 10 2, 11 3, 12 5 C 13 3, 14 2, 16 2 C 19 2, 22 4, 22 8 C 22 14, 12 20, 12 20 Z"
        fill="var(--color-accent)"
      />
    </svg>
  );
}

export function PatioRoom() {
  const [hearts, setHearts] = useState<number[]>([]);

  const rainHearts = () => {
    const ids = Array.from({ length: 18 }, (_, i) => Date.now() + i);
    setHearts((h) => [...h, ...ids]);
    setTimeout(() => setHearts((h) => h.filter((id) => !ids.includes(id))), 4000);
  };

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2
            className="font-display text-2xl md:text-3xl leading-none"
            style={{ fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1' }}
          >
            El <em>jardín</em>
          </h2>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            04 · Patio
          </span>
        </div>
        <Garden />
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2
            className="font-display text-2xl md:text-3xl leading-none"
            style={{ fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1' }}
          >
            Fido y <em>Lila</em>
          </h2>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            tus perritos
          </span>
        </div>
        <Perritos />

        <div className="mt-6 flex justify-center">
          <button
            onClick={rainHearts}
            className="inline-flex items-center gap-3 bg-accent text-bg border-2 border-accent px-6 py-4 font-mono text-[11px] md:text-xs tracking-[0.18em] uppercase hover:bg-fg hover:border-fg transition-colors"
          >
            <span className="w-4 h-4"><HeartShape /></span>
            Dar cariño
          </button>
        </div>
      </section>

      {/* Hearts overlay */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <AnimatePresence>
          {hearts.map((id) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 1.5;
            return (
              <motion.span
                key={id}
                initial={{ y: '100vh', opacity: 1, scale: 1 }}
                animate={{ y: '-10vh', opacity: 0, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, delay, ease: 'easeOut' }}
                className="absolute inline-block w-7 h-7 md:w-9 md:h-9"
                style={{ left: `${left}%` }}
              >
                <HeartShape />
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
