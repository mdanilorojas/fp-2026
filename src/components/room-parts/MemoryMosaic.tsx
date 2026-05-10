'use client';

import { motion } from 'framer-motion';
import { SafeImage } from '@/components/shared/SafeImage';

type Memory = {
  src: string;
  caption: string;
};

/**
 * Short, iconic closing — the richer family gallery lives in "Los que siguen".
 * Here only the emotional anchors appear, at human-portrait scale.
 */
const MEMORIES: Memory[] = [
  { src: '/photos/flor/flor-matrimonio.jpg', caption: 'Tu matrimonio' },
  { src: '/photos/flor/flor-graduacion.jpg', caption: 'Tu graduación' },
  { src: '/photos/flor/flor-joven.jpg',      caption: 'De joven' },
  { src: '/photos/flor/flor-cumpleanos.jpg', caption: 'En familia' },
];

export function MemoryMosaic() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="mt-14 md:mt-16 pt-10 border-t-2 border-border"
    >
      <header className="flex items-baseline justify-between mb-6">
        <h3
          className="font-display text-2xl md:text-3xl leading-none"
          style={{ fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1' }}
        >
          Y para <em>cerrar</em>
        </h3>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
          Cuatro de ti
        </span>
      </header>

      <p className="font-display italic text-base md:text-lg text-muted mb-6 max-w-2xl">
        Mamá, todo lo que hay en esta casa empezó en ti.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {MEMORIES.map((m, i) => (
          <motion.figure
            key={m.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.25 + i * 0.08 }}
            className="relative border-2 border-border bg-surface overflow-hidden aspect-[3/4]"
          >
            <SafeImage
              src={m.src}
              alt={m.caption}
              fill
              sizes="(max-width: 768px) 50vw, 240px"
              className="object-cover"
              fallback={
                <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-[9px] tracking-[0.14em] uppercase p-2 text-center">
                  {m.caption}
                </div>
              }
            />
            <figcaption className="absolute left-0 right-0 bottom-0 bg-fg/80 text-bg px-2 py-1.5 font-mono text-[9px] tracking-[0.14em] uppercase">
              {m.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.section>
  );
}
