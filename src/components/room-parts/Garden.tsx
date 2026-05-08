'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Flower = { id: number; x: number; y: number; hue: number };

export function Garden() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [nextId, setNextId] = useState(0);

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
    const id = nextId;
    setNextId((n) => n + 1);
    const hue = Math.floor(Math.random() * 360);
    setFlowers((fs) => [...fs.slice(-40), { id, x, y, hue }]);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Jardín — toca para que crezcan flores"
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const id = nextId; setNextId((n) => n + 1);
          setFlowers((fs) => [...fs.slice(-40), { id, x: 50, y: 50, hue: Math.random() * 360 }]);
        }
      }}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer select-none bg-gradient-to-b from-[#a8c6df] via-[#c8d7a8] to-[#6c8b5f]"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#5a7a3f] to-transparent pointer-events-none" />
      <AnimatePresence>
        {flowers.map((f) => (
          <motion.div
            key={f.id}
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 18 }}
            className="absolute pointer-events-none"
            style={{ left: `${f.x}%`, top: `${f.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow">
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse
                  key={a}
                  cx="20" cy="12" rx="5" ry="8"
                  fill={`hsl(${f.hue}, 75%, 70%)`}
                  transform={`rotate(${a} 20 20)`}
                />
              ))}
              <circle cx="20" cy="20" r="3.5" fill={`hsl(${(f.hue + 30) % 360}, 85%, 60%)`} />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
      <p className="absolute top-3 left-4 text-deep-brown/60 font-serif text-sm md:text-base pointer-events-none">
        Toca la tierra. Deja que florezca.
      </p>
    </div>
  );
}
