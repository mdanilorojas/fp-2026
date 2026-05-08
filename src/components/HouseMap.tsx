'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { rooms } from '@/data/rooms';
import { useHouseStore } from '@/hooks/useHouseStore';
import { flor } from '@/data/flor';

export function HouseMap() {
  const visited = useHouseStore((s) => s.visitedRooms);

  const nonPuerta = rooms.filter((r) => r.slug !== 'puerta' && r.slug !== 'buzon');
  const buzon = rooms.find((r) => r.slug === 'buzon')!;

  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-deep-brown">
            La casa de {flor.firstName}
          </h1>
          <p className="mt-3 text-muted-text text-lg">Toca un cuarto para entrar.</p>
        </motion.header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {nonPuerta.map((room, idx) => {
            const isVisited = visited.has(room.slug);
            const isNight = room.isNight;
            return (
              <motion.div
                key={room.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <Link
                  href={`/cuarto/${room.slug}`}
                  className={`block p-6 md:p-8 rounded-2xl border-2 border-dashed transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[160px] ${
                    isNight
                      ? 'bg-gradient-to-b from-night to-[#0e121c] border-gold text-paper'
                      : 'bg-surface border-cacao/60 text-deep-brown'
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-serif font-semibold ${
                      isNight ? 'bg-paper text-night' : 'bg-gold text-surface'
                    }`}
                  >
                    {room.order}
                  </div>
                  <h2 className="mt-3 font-serif text-xl md:text-2xl">{room.title}</h2>
                  <p className={`mt-1 text-sm ${isNight ? 'text-paper/70' : 'text-muted-text'}`}>
                    {room.subtitle}
                  </p>
                  {isVisited && (
                    <span
                      className={`mt-3 inline-block text-xs uppercase tracking-wider ${
                        isNight ? 'text-gold' : 'text-gold'
                      }`}
                    >
                      ✓ Ya entraste aquí
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 md:mt-8"
        >
          <Link
            href={`/cuarto/${buzon.slug}`}
            className="block p-6 md:p-8 rounded-2xl bg-gradient-to-b from-paper to-[#e9c068] border-2 border-gold text-deep-brown hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-deep-brown text-paper font-serif font-semibold flex items-center justify-center text-xl">
                {buzon.order}
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl">{buzon.title}</h2>
                <p className="text-muted-text mt-1">{buzon.subtitle}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
