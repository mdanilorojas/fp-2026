'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Envelope } from '@/components/room-parts/Envelope';
import { Letter } from '@/components/room-parts/Letter';
import { CouponStack } from '@/components/room-parts/CouponStack';
import { KeyLock } from '@/components/room-parts/KeyLock';
import { MemoryMosaic } from '@/components/room-parts/MemoryMosaic';
import { SupportWall } from '@/components/room-parts/SupportWall';
import { useHouseStore } from '@/hooks/useHouseStore';

type Stage = 'locked' | 'envelope' | 'letter' | 'coupons';

const BTN_BASE =
  'inline-flex items-center justify-center font-mono text-[11px] tracking-[0.16em] uppercase px-5 py-3 border-2 transition-colors';
const BTN_PRIMARY = `${BTN_BASE} bg-accent text-bg border-accent hover:bg-fg hover:border-fg`;
const BTN_SECONDARY = `${BTN_BASE} bg-bg text-fg border-border hover:bg-fg hover:text-bg`;

export function BuzonRoom() {
  const hasOpened = useHouseStore((s) => s.hasOpenedLetter);
  const markOpened = useHouseStore((s) => s.markLetterOpened);
  const kitchenKeyColor = useHouseStore((s) => s.kitchenKeyColor);
  const kitchenKeyUsed = useHouseStore((s) => s.kitchenKeyUsed);
  const consumeKitchenKey = useHouseStore((s) => s.consumeKitchenKey);

  // Initial stage: letter/coupons if previously opened; lock if key earned but not used; else envelope.
  const initialStage: Stage = hasOpened
    ? 'coupons'
    : kitchenKeyColor && !kitchenKeyUsed
    ? 'locked'
    : 'envelope';

  const [stage, setStage] = useState<Stage>(initialStage);
  const [lettersFinished, setLettersFinished] = useState(hasOpened);

  return (
    <div className="min-h-[60vh] flex flex-col items-center gap-10">
      <AnimatePresence mode="wait">
        {stage === 'locked' && kitchenKeyColor && (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <SupportWall />
            <KeyLock
              expected={kitchenKeyColor}
              onUnlock={() => {
                consumeKitchenKey();
                setStage('envelope');
              }}
            />
          </motion.div>
        )}

        {stage === 'envelope' && (
          <motion.div
            key="env"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
              // toca el sobre para abrirlo.
            </p>
            <Envelope
              onOpen={() => {
                markOpened();
                setStage('letter');
              }}
            />
          </motion.div>
        )}

        {stage === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <Letter onFinish={() => setLettersFinished(true)} />
            {lettersFinished && (
              <div className="text-center mt-8">
                <button onClick={() => setStage('coupons')} className={BTN_PRIMARY}>
                  Ver tus cupones →
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
            className="w-full max-w-3xl"
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-baseline justify-between mb-6">
                <h2
                  className="font-display text-3xl md:text-4xl leading-none"
                  style={{ fontVariationSettings: '"opsz" 72, "SOFT" 80, "WONK" 1' }}
                >
                  Tus <em>cupones</em>
                </h2>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
                  Tres · para ti
                </span>
              </div>
              <CouponStack />
            </div>

            <MemoryMosaic />

            <div className="mt-12 flex flex-wrap gap-2 justify-center">
              <button onClick={() => setStage('letter')} className={BTN_SECONDARY}>
                ← Volver a la carta
              </button>
              <Link href="/print-coupons" className={BTN_PRIMARY} target="_blank">
                Imprimir cupones
              </Link>
              <Link href="/" className={BTN_SECONDARY}>
                Volver a la casa
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
