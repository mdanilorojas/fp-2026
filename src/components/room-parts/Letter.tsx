'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  letterSalutation,
  letterSignature,
  letterParagraphs,
  LETTER_AUDIO_PATH,
  LETTER_READ_PACE_MS_PER_CHAR,
} from '@/data/letter';
import { useMediaExists } from '@/hooks/useMediaExists';

export function Letter({ onFinish }: { onFinish: () => void }) {
  const hasAudio = useMediaExists(LETTER_AUDIO_PATH);
  const [visible, setVisible] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (hasAudio === null) return;
    let cancelled = false;

    if (hasAudio && audioRef.current) {
      audioRef.current.src = LETTER_AUDIO_PATH;
      audioRef.current.play().catch(() => {
        pacedReveal(cancelled);
      });
      let i = 0;
      const timer = setInterval(() => {
        i += 1;
        if (cancelled) { clearInterval(timer); return; }
        setVisible(i);
        if (i >= letterParagraphs.length) clearInterval(timer);
      }, 6000);
      audioRef.current.addEventListener('ended', () => {
        clearInterval(timer);
        setVisible(letterParagraphs.length);
        onFinish();
      });
    } else {
      pacedReveal(cancelled);
    }

    function pacedReveal(cancelledFlag: boolean) {
      let i = 0;
      const revealNext = () => {
        if (cancelledFlag) return;
        if (i >= letterParagraphs.length) {
          onFinish();
          return;
        }
        const p = letterParagraphs[i];
        setVisible(i + 1);
        const ms = Math.max(2500, p.text.length * LETTER_READ_PACE_MS_PER_CHAR);
        i += 1;
        setTimeout(revealNext, ms);
      };
      revealNext();
    }

    return () => {
      cancelled = true;
    };
  }, [hasAudio, onFinish]);

  const current = visible - 1;

  return (
    <article className="relative mx-auto max-w-2xl bg-paper border-2 border-border px-7 md:px-12 py-10 md:py-14">
      {/* Pulse dot top-right to signal "being read now" */}
      <span
        aria-hidden="true"
        className="absolute top-5 right-5 w-3 h-3 rounded-full bg-accent"
        style={{ animation: 'rsv-raypulse 2s ease-in-out infinite' }}
      />

      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
        Carta
      </span>
      <p
        className="mt-2 font-hand text-4xl md:text-5xl text-fg leading-none"
      >
        {letterSalutation}
      </p>

      <div className="mt-7 space-y-5 font-display text-lg md:text-xl leading-relaxed">
        {letterParagraphs.map((p, i) => {
          if (i >= visible) return null;
          const isCurrent = i === current;
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: isCurrent ? 1 : 0.55,
                y: 0,
              }}
              transition={{ duration: 0.8 }}
              className={
                isCurrent
                  ? 'relative pl-4 -ml-[2px] border-l-2 border-accent text-fg'
                  : 'text-fg/55'
              }
              style={{ fontVariationSettings: '"opsz" 14, "SOFT" 60' }}
            >
              {p.text}
            </motion.p>
          );
        })}
      </div>

      {visible >= letterParagraphs.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 font-hand text-4xl md:text-5xl text-fg"
        >
          — {letterSignature}
        </motion.p>
      )}

      <audio ref={audioRef} preload="none" />
    </article>
  );
}
