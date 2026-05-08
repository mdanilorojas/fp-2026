'use client';

import { motion } from 'framer-motion';
import { SafeImage } from '@/components/shared/SafeImage';
import { roomPhotos } from '@/data/photos';
import { useState } from 'react';

export function PasajeRoom() {
  const [revealed, setRevealed] = useState(false);
  const photo = roomPhotos.pasaje?.[0];

  return (
    <div className="flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-serif italic text-2xl md:text-3xl text-deep-brown text-center max-w-2xl"
      >
        Aquí aprendiste a querer así de fuerte.
      </motion.p>

      <motion.button
        onClick={() => setRevealed(true)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 relative overflow-hidden rounded-2xl shadow-2xl border-4 border-paper"
        aria-label="Ver Pasaje"
      >
        <div className="relative w-[min(86vw,640px)] aspect-[4/3] bg-gradient-to-b from-[#ffd28a] to-[#c04a2a]">
          <SafeImage
            src="/photos/pasaje/pasaje-01.jpg"
            alt={photo?.caption ?? 'Pasaje, El Oro'}
            fill
            priority
            sizes="(max-width: 768px) 86vw, 640px"
            className="object-cover"
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-serif text-paper text-3xl italic">Pasaje</p>
              </div>
            }
          />
        </div>
      </motion.button>

      {revealed && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 font-serif italic text-xl text-muted-text max-w-2xl text-center"
        >
          Cada vez que nos cuidas, la costa de El Oro vuelve a casa con nosotros.
        </motion.p>
      )}

      <p className="mt-10 text-sm text-muted-text">Pasaje, El Oro · donde empezó Flor.</p>
    </div>
  );
}
