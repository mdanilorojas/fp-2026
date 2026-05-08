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
          className="fixed inset-0 z-40 bg-deep-brown/50 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative rounded-2xl p-8 md:p-10 max-w-xl w-full shadow-2xl ${
              variant === 'bridge'
                ? 'bg-gradient-to-b from-surface to-cushion-cream border-2 border-cushion-cream'
                : 'bg-surface'
            }`}
          >
            <h3 className="font-serif text-3xl text-deep-brown">{title}</h3>
            <div className="mt-5 text-lg leading-relaxed whitespace-pre-line text-deep-brown/85">
              {body}
            </div>
            <button
              onClick={onClose}
              className="mt-8 w-full py-3 rounded-full bg-deep-brown text-paper font-serif text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
