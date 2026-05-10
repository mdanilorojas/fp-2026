'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Flower = { id: number; x: number; y: number; variant: 0 | 1 };

export function Garden() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [nextId, setNextId] = useState(0);

  const addFlower = (x: number, y: number) => {
    const id = nextId;
    setNextId((n) => n + 1);
    const variant: 0 | 1 = Math.random() > 0.5 ? 0 : 1;
    setFlowers((fs) => [...fs.slice(-40), { id, x, y, variant }]);
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const target = e.currentTarget.getBoundingClientRect();
    let clientX = 0, clientY = 0;
    if ('touches' in e && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX; clientY = e.clientY;
    }
    const x = ((clientX - target.left) / target.width) * 100;
    const y = ((clientY - target.top) / target.height) * 100;
    addFlower(x, y);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Jardín — toca para que crezcan flores"
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') addFlower(50, 50);
      }}
      className="relative w-full aspect-[16/9] border-2 border-border bg-bg overflow-hidden cursor-pointer select-none"
    >
      {/* dashed grid baseline — tierra en brutalist */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0, transparent 24px, color-mix(in oklch, var(--color-border) 10%, transparent) 24px, color-mix(in oklch, var(--color-border) 10%, transparent) 25px)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-6 border-t-2 border-border pointer-events-none" />

      <AnimatePresence>
        {flowers.map((f) => (
          <motion.div
            key={f.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', damping: 18 }}
            className="absolute pointer-events-none"
            style={{ left: `${f.x}%`, top: `${f.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <svg viewBox="0 0 40 40" className="w-10 h-10 md:w-12 md:h-12">
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse
                  key={a}
                  cx="20" cy="12" rx="5" ry="8"
                  fill={f.variant === 0 ? 'var(--color-accent)' : 'var(--color-fg)'}
                  transform={`rotate(${a} 20 20)`}
                />
              ))}
              <circle cx="20" cy="20" r="3.5" fill={f.variant === 0 ? 'var(--color-fg)' : 'var(--color-accent)'} />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      <p
        className="absolute top-3 left-4 font-mono text-[11px] tracking-[0.14em] uppercase text-muted pointer-events-none"
      >
        // toca la tierra. deja que florezca.
      </p>
    </div>
  );
}
