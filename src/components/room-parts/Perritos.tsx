'use client';

import { motion } from 'framer-motion';
import { SafeImage } from '@/components/shared/SafeImage';

const PERRITOS = [
  { id: 'fido', name: 'Fido', src: '/photos/perritos/fido-01.jpg' },
  { id: 'lila', name: 'Lila', src: '/photos/perritos/lila-01.jpg' },
];

export function Perritos() {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      {PERRITOS.map((p) => (
        <motion.div
          key={p.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative aspect-square rounded-2xl overflow-hidden border-4 border-paper shadow-xl bg-cushion-cream"
        >
          <SafeImage
            src={p.src}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 45vw, 320px"
            className="object-cover"
            fallback={
              <div className="absolute inset-0 flex items-center justify-center text-7xl">
                {p.id === 'fido' ? '🐕' : '🐩'}
              </div>
            }
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-brown/80 to-transparent p-3">
            <p className="text-paper font-serif text-xl">{p.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
