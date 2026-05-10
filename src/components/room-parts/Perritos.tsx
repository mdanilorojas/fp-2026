'use client';

import { motion } from 'framer-motion';
import { SafeImage } from '@/components/shared/SafeImage';

const PERRITOS = [
  { id: 'fido', name: 'Fido', src: '/photos/perritos/fido-final.jpeg', role: 'perro' },
  { id: 'lila', name: 'Lila', src: '/photos/perritos/lila-01.jpg', role: 'perra' },
];

function DogSilhouette() {
  return (
    <svg viewBox="0 0 100 80" className="w-1/2 h-1/2" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 10 58 L 10 36 Q 14 28, 22 30 L 34 30 L 40 22 L 48 24 L 52 30 L 70 30 Q 82 34, 86 44 L 86 58" />
      <circle cx="60" cy="40" r="1.5" fill="currentColor" stroke="none" />
      <path d="M 40 22 L 42 16 L 46 20 Z" fill="currentColor" stroke="none" />
      <line x1="24" y1="58" x2="24" y2="68" />
      <line x1="38" y1="58" x2="38" y2="68" />
      <line x1="70" y1="58" x2="70" y2="68" />
      <line x1="82" y1="58" x2="82" y2="68" />
      <path d="M 86 44 Q 94 44, 96 36" />
    </svg>
  );
}

export function Perritos() {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto">
      {PERRITOS.map((p) => (
        <motion.figure
          key={p.id}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          className="relative aspect-square border-2 border-border bg-surface overflow-hidden"
        >
          <SafeImage
            src={p.src}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 45vw, 320px"
            className="object-cover"
            fallback={
              <div className="absolute inset-0 flex items-center justify-center text-fg">
                <DogSilhouette />
              </div>
            }
          />
          <figcaption className="absolute left-0 right-0 bottom-0 bg-bg border-t-2 border-border px-4 py-2 flex items-baseline justify-between">
            <span
              className="font-display text-xl md:text-2xl leading-none"
              style={{ fontVariationSettings: '"opsz" 36, "SOFT" 80, "WONK" 1' }}
            >
              {p.name}
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">{p.role}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
