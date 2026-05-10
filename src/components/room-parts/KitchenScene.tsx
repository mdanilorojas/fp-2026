'use client';

import { motion } from 'framer-motion';
import { kitchenMemories } from '@/data/kitchen-memories';

type Props = {
  onSelect: (id: string) => void;
};

export function KitchenScene({ onSelect }: Props) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-3 md:mb-4 pl-0.5">
        // toca cada cosa. detrás de cada una hay una memoria.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 md:gap-3 max-w-4xl mx-auto">
        {kitchenMemories.map((m, idx) => {
          const isBridge = m.isBridge;
          return (
            <motion.button
              key={m.id}
              onClick={() => onSelect(m.id)}
              aria-label={m.objectName}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className={`relative aspect-square border-2 border-border flex flex-col items-center justify-center gap-2 p-4 transition-colors ${
                isBridge
                  ? 'bg-accent text-bg border-accent hover:bg-fg hover:border-fg'
                  : 'bg-surface text-fg hover:bg-accent-weak'
              }`}
            >
              <IconFor id={m.id} className="w-10 h-10 md:w-12 md:h-12" />
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase">
                {m.objectName.replace(/^La |^El /, '')}
              </span>
              {isBridge && (
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-2 font-mono text-[9px] tracking-[0.18em] uppercase"
                >
                  puente
                </span>
              )}
              {/* inner dashed frame for visual weight */}
              <span
                aria-hidden="true"
                className={`absolute inset-1.5 border border-dashed pointer-events-none ${
                  isBridge ? 'border-bg/40' : 'border-border/25'
                }`}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function IconFor({ id, className }: { id: string; className?: string }) {
  const common = {
    viewBox: '0 0 24 24',
    className,
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (id) {
    case 'olla':
      return (
        <svg {...common}>
          <path d="M3 9h18l-2 10H5L3 9z" />
          <path d="M6 9V7h12v2" />
          <path d="M10 4 Q 12 6, 14 4" />
        </svg>
      );
    case 'mesa':
      return (
        <svg {...common}>
          <path d="M3 10h18" />
          <path d="M6 10v10M18 10v10" />
          <path d="M3 6h18l-1.5 4H4.5L3 6z" />
        </svg>
      );
    case 'olla-grande':
      return (
        <svg {...common}>
          <path d="M2 8h20l-3 12H5L2 8z" />
          <path d="M5 8V6h14v2" />
          <path d="M10 13q2 1 4 0" />
        </svg>
      );
    case 'ventana':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" />
          <path d="M12 4v16M4 12h16" />
        </svg>
      );
    case 'mecedora':
      return (
        <svg {...common}>
          <path d="M5 14h14" />
          <path d="M7 14l2-8h6l2 8" />
          <path d="M4 18q8 3 16 0" />
        </svg>
      );
    default:
      return null;
  }
}
