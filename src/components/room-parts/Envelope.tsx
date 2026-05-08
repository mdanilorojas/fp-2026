'use client';

import { motion } from 'framer-motion';
import { flor } from '@/data/flor';

export function Envelope({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ scale: 1.02, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-md aspect-[3/2] mx-auto rounded-sm overflow-hidden shadow-2xl bg-[#f7e6c8] border border-[#b5a076]"
      aria-label={`Abrir sobre para ${flor.fullName}`}
    >
      <svg viewBox="0 0 300 200" className="absolute inset-0 w-full h-full">
        <polygon points="0,0 150,90 300,0" fill="#e8d09e" stroke="#b5a076" strokeWidth="1" />
      </svg>
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-10 px-6">
        <p className="font-hand text-4xl text-cacao">{flor.fullName}</p>
        <p className="font-serif italic text-xs text-muted-text mt-2">
          Ábrelo cuando estés sola.
        </p>
      </div>
      <div className="absolute top-3 right-3 w-10 h-10 rounded-sm border border-gold bg-paper/60 flex items-center justify-center text-xs text-cacao">
        ✉
      </div>
    </motion.button>
  );
}
