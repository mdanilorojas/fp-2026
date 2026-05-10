'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { KEY_COLORS, type KeyColor } from '@/hooks/useHouseStore';
import { KEY_COLOR_VAR, KEY_COLOR_NAME } from './KeyReveal';

type Props = {
  expected: KeyColor;
  onUnlock: () => void;
};

export function KeyLock({ expected, onUnlock }: Props) {
  const [wrong, setWrong] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const pick = (color: KeyColor) => {
    if (color === expected) {
      onUnlock();
      return;
    }
    setWrong(true);
    setShakeKey((k) => k + 1);
    setTimeout(() => setWrong(false), 1200);
  };

  return (
    <motion.section
      key={shakeKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        x: wrong ? [-6, 6, -4, 4, 0] : 0,
      }}
      transition={{ duration: wrong ? 0.4 : 0.6 }}
      className="w-full max-w-xl mx-auto border-2 border-border bg-surface p-6 md:p-8 flex flex-col items-center gap-5"
    >
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
        Cerrado · entra con la llave
      </span>
      <h2
        className="font-display text-3xl md:text-4xl leading-none text-center"
        style={{ fontVariationSettings: '"opsz" 72, "SOFT" 80, "WONK" 1' }}
      >
        ¿De qué <em>color</em> era?
      </h2>
      <p className="font-display italic text-base md:text-lg text-muted text-center max-w-[38ch]">
        Dejaste una llave en la cocina. Toca el color que encontraste para abrir.
      </p>

      <div className="grid grid-cols-4 gap-3 md:gap-4 mt-2 w-full">
        {KEY_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => pick(c)}
            aria-label={`Llave ${KEY_COLOR_NAME[c]}`}
            className="group aspect-square border-2 border-border bg-bg flex items-center justify-center hover:border-fg transition-colors"
          >
            <span
              className="block w-[65%] h-[65%] border-2 border-fg transition-transform group-hover:scale-105"
              style={{ background: KEY_COLOR_VAR[c] }}
            />
          </button>
        ))}
      </div>

      {wrong && (
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent mt-1">
          // esa no era. inténtalo otra vez.
        </p>
      )}
    </motion.section>
  );
}
