'use client';

import { motion } from 'framer-motion';
import { kitchenMemories } from '@/data/kitchen-memories';

type Props = {
  onSelect: (id: string) => void;
};

const OBJECT_POSITIONS: Record<string, { x: number; y: number; label: string }> = {
  olla:         { x: 18,  y: 62, label: 'Olla' },
  mesa:         { x: 48,  y: 74, label: 'Mesa' },
  'olla-grande':{ x: 30,  y: 40, label: 'Olla grande' },
  ventana:      { x: 72,  y: 30, label: 'Ventana' },
  mecedora:     { x: 82,  y: 66, label: 'Mecedora' },
};

export function KitchenScene({ onSelect }: Props) {
  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-paper to-[#e8d9b8] shadow-xl">
      {/* SVG floor/walls */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <rect x="0" y="0" width="400" height="180" fill="#F7E6C8" />
        <rect x="0" y="180" width="400" height="120" fill="#E8D9B8" />
        <rect x="270" y="50" width="70" height="70" rx="4" fill="#BFD7EA" stroke="#5A3A24" strokeWidth="2" />
        <line x1="305" y1="50" x2="305" y2="120" stroke="#5A3A24" strokeWidth="2" />
        <line x1="270" y1="85" x2="340" y2="85" stroke="#5A3A24" strokeWidth="2" />
      </svg>

      {/* Object tap targets */}
      {kitchenMemories.map((m, idx) => {
        const pos = OBJECT_POSITIONS[m.id];
        if (!pos) return null;
        return (
          <motion.button
            key={m.id}
            onClick={() => onSelect(m.id)}
            aria-label={pos.label}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              boxShadow: [
                '0 0 0 0 rgba(217,164,65,0)',
                '0 0 0 14px rgba(217,164,65,0.28)',
                '0 0 0 0 rgba(217,164,65,0)',
              ],
            }}
            transition={{
              opacity: { delay: idx * 0.08, duration: 0.5 },
              boxShadow: { delay: idx * 1.2, duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-surface border-2 border-gold flex flex-col items-center justify-center text-sm font-serif text-deep-brown"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <IconFor id={m.id} />
            <span className="text-xs mt-1">{pos.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function IconFor({ id }: { id: string }) {
  switch (id) {
    case 'olla':         return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9h18l-2 10H5L3 9z" /><path d="M6 9V7h12v2" /></svg>;
    case 'mesa':         return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10h18" /><path d="M6 10v10M18 10v10M3 6h18l-1.5 4H4.5L3 6z"/></svg>;
    case 'olla-grande':  return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 8h20l-3 12H5L2 8z"/><path d="M5 8V6h14v2"/><path d="M10 13q2 1 4 0" /></svg>;
    case 'ventana':      return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M12 4v16M4 12h16"/></svg>;
    case 'mecedora':     return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 14h14" /><path d="M7 14l2-8h6l2 8"/><path d="M4 18q8 3 16 0" /></svg>;
    default: return null;
  }
}
