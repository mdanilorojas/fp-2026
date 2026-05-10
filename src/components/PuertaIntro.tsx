'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useHouseStore } from '@/hooks/useHouseStore';
import { flor } from '@/data/flor';
import { PuertaSvg } from './room-svgs';

export function PuertaIntro() {
  const router = useRouter();
  const visitRoom = useHouseStore((s) => s.visitRoom);

  const handleStart = () => {
    visitRoom('puerta');
    router.push('/cuarto/pasaje');
  };

  return (
    <main
      className="relative min-h-screen w-full bg-bg text-fg overflow-hidden flex flex-col justify-between px-8 md:px-16 py-10 md:py-14"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 82% 14%, var(--color-accent-weak) 0%, transparent 55%)',
      }}
    >
      <header className="flex justify-between items-baseline font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
        <span>Un regalo · 10 · Mayo · 2026</span>
        <span>De Danilo · Para {flor.firstName}</span>
      </header>

      <div className="relative flex-1 flex items-center">
        <motion.div
          aria-hidden="true"
          className="absolute right-6 md:right-10 top-4 md:top-0 w-36 h-36 md:w-56 md:h-56 opacity-90 pointer-events-none"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.92, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <PuertaSvg className="w-full h-full" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: 'easeOut' }}
          className="font-display text-[clamp(56px,11vw,160px)] leading-[0.9] tracking-tight max-w-[12ch]"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 90, "WONK" 1' }}
        >
          {flor.firstName},<br />
          hoy te toca<br />
          <em>recibir</em>.
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
      >
        <p className="max-w-[34ch] text-base md:text-lg leading-relaxed text-fg/80">
          Un lugar para ti, hecho a mano por tu hijo. Siete cuartos. Una carta. Todo tuyo.
        </p>
        <button
          onClick={handleStart}
          className="group self-start md:self-auto inline-flex items-center gap-3 bg-accent text-bg font-mono text-sm md:text-base tracking-[0.16em] uppercase px-7 py-5 border-2 border-accent hover:bg-fg hover:border-fg transition-colors"
        >
          Empezar
          <span
            aria-hidden="true"
            className="font-display text-2xl leading-none -mt-0.5 transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </motion.div>
    </main>
  );
}
