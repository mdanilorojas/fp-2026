'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NightWindow } from '@/components/room-parts/NightWindow';
import { Candle } from '@/components/room-parts/Candle';
import { SafeImage } from '@/components/shared/SafeImage';
import { familyMembers, familyRoomQuote, type FamilyMember } from '@/data/family';
import { useMediaExists } from '@/hooks/useMediaExists';

export function FamiliaRoom() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-14">
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="font-display italic text-center text-xl md:text-2xl text-bg max-w-2xl leading-snug font-medium"
        style={{ fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1, "wght" 500' }}
      >
        {familyRoomQuote}
      </motion.p>

      <NightWindow />

      <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-bg/60 -mt-4">
        Toca una vela para encenderla
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 w-full max-w-6xl">
        {familyMembers.map((m, i) => (
          <Memorial
            key={m.id}
            member={m}
            active={activeId === m.id}
            onToggle={() => setActiveId((id) => (id === m.id ? null : m.id))}
            delay={i * 0.12}
          />
        ))}
      </div>
    </div>
  );
}

type MemorialProps = {
  member: FamilyMember;
  active: boolean;
  onToggle: () => void;
  delay: number;
};

function Memorial({ member, active, onToggle, delay }: MemorialProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className={`relative flex flex-col items-center border-2 p-5 md:p-6 transition-colors ${
        member.isCentral ? 'md:-mt-4' : ''
      } ${active ? 'border-accent bg-night/60' : 'border-bg/25 bg-night/40'}`}
    >
      {/* name strip at the top */}
      <div className="w-full flex items-baseline justify-between pb-3 mb-4 border-b border-bg/20">
        <h3
          className="font-display text-2xl md:text-3xl leading-none text-bg"
          style={{ fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1, "wght" 600' }}
        >
          {member.name}
        </h3>
        <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-bg/60">
          {member.relation}
        </span>
      </div>

      {/* portrait */}
      <div
        className={`relative w-full overflow-hidden border-2 bg-night ${
          active ? 'border-accent' : 'border-bg/30'
        }`}
        style={{ aspectRatio: '3 / 4', minHeight: member.isCentral ? 420 : 360 }}
      >
        <SafeImage
          src={member.photoPath}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 90vw, 280px"
          className="object-cover"
          fallback={
            <div className="w-full h-full flex items-center justify-center text-bg/60 font-mono text-[10px] tracking-[0.18em] uppercase p-4 text-center">
              {member.name}
            </div>
          }
        />
        {/* soft vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 55%, color-mix(in oklch, var(--color-night) 85%, black 15%) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* candle + action */}
      <div className="mt-5 flex flex-col items-center gap-3">
        <Candle
          label={member.candleLabel}
          active={active}
          size={member.isCentral ? 'lg' : 'sm'}
          onClick={onToggle}
        />
      </div>

      {/* line that blooms when lit */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="line"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full overflow-hidden"
          >
            <div className="pt-5 mt-5 border-t border-accent/50">
              <p
                className="font-display italic text-base md:text-lg text-bg leading-snug text-center"
                style={{ fontVariationSettings: '"opsz" 36, "SOFT" 80, "WONK" 1' }}
              >
                {member.candleLine}
              </p>
              {member.id === 'papa' && member.videoPath && (
                <div className="flex justify-center mt-4">
                  <PapaVideoButton path={member.videoPath} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function PapaVideoButton({ path }: { path: string }) {
  const exists = useMediaExists(path);
  const [open, setOpen] = useState(false);
  if (!exists) return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-[11px] tracking-[0.16em] uppercase text-bg/90 hover:text-bg border-2 border-bg/40 hover:border-bg px-4 py-2 transition-colors"
      >
        Ver el recuerdo →
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-night/95 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <video
              src={path}
              controls
              autoPlay
              className="max-w-4xl w-full border-2 border-bg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
