'use client';

import { motion } from 'framer-motion';
import { SafeImage } from '@/components/shared/SafeImage';
import { PasajeSvg } from '@/components/room-svgs';

const FLOR_EPOCHS = [
  { src: '/photos/flor/flor-joven.jpg',       caption: 'Flor, de joven' },
  { src: '/photos/flor/flor-graduacion.jpg',  caption: 'Graduación' },
  { src: '/photos/flor/flor-cumpleanos.jpg',  caption: 'Cumpleaños' },
];

export function PasajeRoom() {
  return (
    <div className="space-y-10 md:space-y-14">
      <div className="grid md:grid-cols-[38%_1fr] gap-6 md:gap-10 items-stretch">
        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col justify-between gap-6"
        >
          <div>
            <h2
              className="font-display text-[clamp(32px,4.4vw,56px)] leading-[0.95] tracking-tight"
              style={{ fontVariationSettings: '"opsz" 72, "SOFT" 80, "WONK" 1' }}
            >
              Donde<br />empezó tu<br /><em>forma de querer</em>.
            </h2>
            <p className="mt-5 border-l-2 border-accent pl-4 text-base md:text-lg leading-relaxed text-fg/90">
              Cada vez que nos cuidas, la costa de El Oro vuelve a casa con nosotros.
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted pt-4 border-t border-border">
            Pasaje · El Oro · Ecuador
          </p>
        </motion.aside>

        <motion.figure
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative border-2 border-border bg-fg overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[360px]"
        >
          <SafeImage
            src="/photos/pasaje/pasaje-01.jpg"
            alt="Pasaje, El Oro"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-fg">
                <PasajeSvg className="w-3/5 h-3/5" />
              </div>
            }
          />
          <figcaption className="absolute left-0 right-0 bottom-0 bg-fg/80 text-bg px-4 py-3 font-mono text-[10px] tracking-[0.18em] uppercase">
            Pasaje · el oro
          </figcaption>
        </motion.figure>
      </div>

      {/* Flor a través del tiempo */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="border-t-2 border-border pt-8 md:pt-10"
      >
        <div className="flex items-baseline justify-between mb-5">
          <h3
            className="font-display text-2xl md:text-3xl leading-none"
            style={{ fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1' }}
          >
            Flor, <em>antes de ser mamá</em>
          </h3>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            Tres momentos
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {FLOR_EPOCHS.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className="relative border-2 border-border bg-surface overflow-hidden aspect-[3/4]"
            >
              <SafeImage
                src={p.src}
                alt={p.caption}
                fill
                sizes="(max-width: 768px) 33vw, 240px"
                className="object-cover"
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-[9px] tracking-[0.16em] uppercase p-3 text-center">
                    {p.caption}
                  </div>
                }
              />
              <figcaption className="absolute left-0 right-0 bottom-0 bg-fg/80 text-bg px-3 py-2 font-mono text-[9px] tracking-[0.14em] uppercase">
                {p.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
