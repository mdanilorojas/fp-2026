'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Envelope } from '@/components/room-parts/Envelope';
import { Letter } from '@/components/room-parts/Letter';
import { CouponStack } from '@/components/room-parts/CouponStack';
import { useHouseStore } from '@/hooks/useHouseStore';

type Stage = 'envelope' | 'letter' | 'coupons';

export function BuzonRoom() {
  const hasOpened = useHouseStore((s) => s.hasOpenedLetter);
  const markOpened = useHouseStore((s) => s.markLetterOpened);
  const [stage, setStage] = useState<Stage>(hasOpened ? 'coupons' : 'envelope');
  const [lettersFinished, setLettersFinished] = useState(hasOpened);

  return (
    <div className="min-h-[70vh] flex flex-col items-center gap-10">
      <AnimatePresence mode="wait">
        {stage === 'envelope' && (
          <motion.div key="env" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Envelope
              onOpen={() => {
                markOpened();
                setStage('letter');
              }}
            />
          </motion.div>
        )}
        {stage === 'letter' && (
          <motion.div key="letter" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Letter onFinish={() => setLettersFinished(true)} />
            {lettersFinished && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setStage('coupons')}
                  className="px-6 py-3 rounded-full bg-deep-brown text-paper font-serif text-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  Ver tus cupones
                </button>
              </div>
            )}
          </motion.div>
        )}
        {stage === 'coupons' && (
          <motion.div
            key="coupons"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-center text-deep-brown mb-6">
              Tus cupones
            </h2>
            <CouponStack />
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setStage('letter')}
                className="px-5 py-3 rounded-full border border-deep-brown/30 text-deep-brown font-serif hover:bg-surface"
              >
                Volver a escuchar la carta
              </button>
              <Link
                href="/print-coupons"
                className="px-5 py-3 rounded-full bg-gold text-deep-brown font-serif hover:scale-105 active:scale-95 transition-transform"
                target="_blank"
              >
                Imprimir cupones
              </Link>
              <Link
                href="/cuarto/musica"
                className="px-5 py-3 rounded-full border border-deep-brown/30 text-deep-brown font-serif hover:bg-surface"
              >
                Ir a la sala de música
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
