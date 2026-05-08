'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NightWindow } from '@/components/room-parts/NightWindow';
import { Candle } from '@/components/room-parts/Candle';
import { SafeImage } from '@/components/shared/SafeImage';
import { familyMembers, familyRoomQuote } from '@/data/family';
import { useMediaExists } from '@/hooks/useMediaExists';

export function FamiliaRoom() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = familyMembers.find((m) => m.id === activeId) ?? null;

  return (
    <div className="flex flex-col items-center gap-10">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="font-serif italic text-center text-xl md:text-2xl text-paper max-w-2xl"
      >
        {familyRoomQuote}
      </motion.p>

      <NightWindow />

      <div className="flex items-end gap-10 md:gap-16">
        {familyMembers.map((m) => (
          <div key={m.id} className="flex flex-col items-center gap-4">
            <Candle
              label={m.candleLabel}
              active={activeId === m.id}
              size={m.isCentral ? 'lg' : 'sm'}
              onClick={() => setActiveId((id) => (id === m.id ? null : m.id))}
            />
            <MemberPortrait memberId={m.id} photoPath={m.photoPath} label={m.name} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-surface/10 border border-paper/30 rounded-2xl p-6 max-w-xl text-center backdrop-blur"
          >
            <p className="font-serif text-xl md:text-2xl italic text-paper">{active.candleLine}</p>
            {active.id === 'papa' && active.videoPath && <PapaVideoButton path={active.videoPath} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MemberPortrait({ memberId, photoPath, label }: { memberId: string; photoPath: string; label: string }) {
  return (
    <div className="relative w-16 h-20 md:w-20 md:h-24 rounded-full overflow-hidden border-2 border-gold">
      <SafeImage
        src={photoPath}
        alt={label}
        fill
        sizes="80px"
        className="object-cover"
        fallback={<div className="w-full h-full bg-[#4a3b2b]" />}
      />
    </div>
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
        className="mt-4 text-sm underline text-paper/80 hover:text-paper"
      >
        Ver recuerdo
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-night/90 backdrop-blur flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <video
              src={path}
              controls
              autoPlay
              className="max-w-4xl w-full rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
