'use client';

import { motion } from 'framer-motion';
import { SafeImage } from '@/components/shared/SafeImage';

type Photo = {
  src: string;
  caption: string;
  span?: 'wide' | 'tall';
};

/**
 * Wall of people cheering Flor on, shown above the KeyLock at the Buzón.
 * These are the photos that aren't used elsewhere — the living family.
 */
const PHOTOS: Photo[] = [
  { src: '/photos/familia/familia-completa.jpg', caption: 'Toda la familia', span: 'wide' },
  { src: '/photos/papa/papa-tres-hijos.jpg',     caption: 'Papá y los tres', span: 'wide' },
  { src: '/photos/papa/papa-danilo.jpg',         caption: 'Papá y Danilo' },
  { src: '/photos/papa/papa-joseph-tefa.jpg',    caption: 'Papá, Joseph y Tefa' },
  { src: '/photos/papa/fiesta-danilo-3anios.jpg', caption: 'Los tres años de Danilo' },
  { src: '/photos/papa/joseph-bebe.jpg',         caption: 'Joseph, el bebé' },
  { src: '/photos/familia/hermanos-y-padre.jpg', caption: 'Los hermanos y Eloy' },
  { src: '/photos/papa/papa-flor.jpg',           caption: 'Tú y él' },
];

export function SupportWall() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mx-auto mb-8"
    >
      <header className="text-center mb-6">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
          Antes de abrir
        </span>
        <h3
          className="font-display text-3xl md:text-4xl leading-none mt-3"
          style={{ fontVariationSettings: '"opsz" 72, "SOFT" 80, "WONK" 1' }}
        >
          Toda esta gente te <em>apoya</em>
        </h3>
      </header>

      <div
        className="grid gap-2 md:gap-3"
        style={{
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gridAutoRows: '95px',
        }}
      >
        {PHOTOS.map((p, i) => {
          const colSpan = p.span === 'wide' ? 'col-span-2' : 'col-span-1';
          const rowSpan = p.span === 'tall' ? 'row-span-2' : 'row-span-1';
          return (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
              className={`relative border-2 border-border bg-surface overflow-hidden ${colSpan} ${rowSpan}`}
            >
              <SafeImage
                src={p.src}
                alt={p.caption}
                fill
                sizes="(max-width: 768px) 50vw, 220px"
                className="object-cover"
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-[9px] tracking-[0.14em] uppercase p-2 text-center">
                    {p.caption}
                  </div>
                }
              />
              <figcaption className="absolute left-0 right-0 bottom-0 bg-fg/80 text-bg px-2 py-1 font-mono text-[8.5px] tracking-[0.12em] uppercase">
                {p.caption}
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </motion.section>
  );
}
