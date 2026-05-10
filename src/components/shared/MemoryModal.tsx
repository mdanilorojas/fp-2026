'use client';

import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  open: boolean;
  title: string;
  body: string;
  onClose: () => void;
  variant?: 'default' | 'bridge';
};

export function MemoryModal({ open, title, body, onClose, variant = 'default' }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-fg/60 flex items-center justify-center p-6"
          onClick={onClose}
          style={{ backdropFilter: 'blur(2px)' }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-surface border-2 border-border max-w-xl w-full p-8 md:p-10"
          >
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
              {variant === 'bridge' ? 'Memoria · puente' : 'Una memoria'}
            </span>
            <h3
              className="mt-2 font-display text-3xl md:text-4xl leading-[1] tracking-tight"
              style={{ fontVariationSettings: '"opsz" 60, "SOFT" 80, "WONK" 1' }}
            >
              {title}
            </h3>
            <div
              className={`mt-5 text-base md:text-lg leading-relaxed whitespace-pre-line text-fg/90 ${
                variant === 'bridge' ? 'border-l-2 border-accent pl-4 ml-[-2px]' : ''
              }`}
            >
              {body}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="font-mono text-[11px] tracking-[0.16em] uppercase bg-fg text-bg border-2 border-fg px-5 py-3 hover:bg-accent hover:border-accent transition-colors"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
