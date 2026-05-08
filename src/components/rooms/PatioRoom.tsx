'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Garden } from '@/components/room-parts/Garden';
import { Perritos } from '@/components/room-parts/Perritos';

export function PatioRoom() {
  const [hearts, setHearts] = useState<number[]>([]);

  const rainHearts = () => {
    const ids = Array.from({ length: 18 }, (_, i) => Date.now() + i);
    setHearts((h) => [...h, ...ids]);
    setTimeout(() => setHearts((h) => h.filter((id) => !ids.includes(id))), 4000);
  };

  return (
    <div className="space-y-8">
      <Garden />

      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-deep-brown text-center mb-4">
          Fido y Lila
        </h2>
        <Perritos />

        <div className="text-center mt-6">
          <button
            onClick={rainHearts}
            className="px-6 py-3 rounded-full bg-coral text-paper font-serif text-lg shadow hover:scale-105 active:scale-95 transition-transform"
          >
            Darle cariño a Fido y Lila
          </button>
        </div>
      </div>

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
                className="absolute text-3xl md:text-4xl"
                style={{ left: `${left}%` }}
              >
                ❤️
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
