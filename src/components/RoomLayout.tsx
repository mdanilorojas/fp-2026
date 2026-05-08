'use client';

import { motion } from 'framer-motion';
import { type Room } from '@/data/rooms';

type Props = {
  room: Room;
  children: React.ReactNode;
};

export function RoomLayout({ room, children }: Props) {
  return (
    <motion.main
      key={room.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full"
    >
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        <header className="text-center mb-8">
          <p className={`font-serif italic text-sm ${room.isNight ? 'text-paper/70' : 'text-muted-text'}`}>
            Cuarto {room.order}
          </p>
          <h1 className={`font-serif text-4xl md:text-5xl mt-1 ${room.isNight ? 'text-paper' : 'text-deep-brown'}`}>
            {room.title}
          </h1>
          {room.subtitle && (
            <p className={`mt-3 text-lg ${room.isNight ? 'text-paper/70' : 'text-muted-text'}`}>
              {room.subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </motion.main>
  );
}
