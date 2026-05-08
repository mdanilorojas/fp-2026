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
  const [visible, setVisible] = useState<number>(0); // number of paragraphs visible
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (hasAudio === null) return;
    let cancelled = false;

    if (hasAudio && audioRef.current) {
      audioRef.current.src = LETTER_AUDIO_PATH;
      audioRef.current.play().catch(() => {
        // fallback to paced reveal
        pacedReveal(cancelled);
      });
      // Reveal paragraphs at fixed intervals proportional to expected audio length.
      // Without explicit timings, we reveal one paragraph per ~6 seconds.
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

  return (
    <div className="relative mx-auto max-w-xl bg-[#fffbef] px-8 md:px-14 py-12 md:py-16 shadow-2xl rounded-sm border border-[#e8dcc5]">
      <p className="font-hand text-3xl md:text-4xl text-deep-brown">{letterSalutation}</p>
      <div className="mt-6 space-y-5 font-hand text-2xl md:text-3xl leading-snug text-deep-brown/90">
        {letterParagraphs.slice(0, visible).map((p, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            {p.text}
          </motion.p>
        ))}
      </div>
      {visible >= letterParagraphs.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 font-hand text-3xl md:text-4xl text-deep-brown"
        >
          — {letterSignature}
        </motion.p>
      )}
      <audio ref={audioRef} preload="none" />
    </div>
  );
}
