'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useHouseStore } from '@/hooks/useHouseStore';
import { flor } from '@/data/flor';

export function PuertaIntro() {
  const router = useRouter();
  const visitRoom = useHouseStore((s) => s.visitRoom);

  const handleStart = () => {
    visitRoom('puerta');
    // Router push kicks first real navigation — iPad Safari will allow audio from here.
    router.push('/cuarto/pasaje');
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Sunset gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,#ffd28a_0%,#e9783f_35%,#c04a2a_70%,#3b2515_100%)]" />
      {/* Leaves */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 bottom-0 w-[28rem] h-[28rem] bg-[radial-gradient(circle,#1e3620_0%,rgba(30,54,32,0)_70%)]" />
        <div className="absolute -right-10 bottom-0 w-[28rem] h-[28rem] bg-[radial-gradient(circle,#1e3620_0%,rgba(30,54,32,0)_70%)]" />
      </div>
      {/* Sun */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[30%] w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle,#fff3c4 0%,#ffd28a 55%,rgba(255,210,138,0) 100%)',
          filter: 'blur(2px)',
        }}
        animate={{ y: [0, -6, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-serif text-5xl md:text-7xl italic text-paper drop-shadow-lg"
        >
          {flor.firstName}, hoy te toca recibir.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-paper/90 text-lg md:text-xl"
        >
          Un lugar para ti, hecho por tu hijo Danilo.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          onClick={handleStart}
          className="mt-14 px-8 py-4 rounded-full bg-paper text-deep-brown font-serif text-xl shadow-xl hover:scale-105 active:scale-95 transition-transform"
        >
          Empezar tu regalo
        </motion.button>
      </div>
    </main>
  );
}
