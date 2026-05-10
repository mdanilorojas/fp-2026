'use client';

import { motion } from 'framer-motion';
import { type Room } from '@/data/rooms';
import { NextRoomLink } from '@/components/NextRoomLink';

type Props = {
  room: Room;
  children: React.ReactNode;
  /** Hide the auto next-room link (e.g. the cocina shows it from KeyReveal instead). */
  hideNext?: boolean;
};

export function RoomLayout({ room, children, hideNext = false }: Props) {
  return (
    <motion.main
      key={room.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative min-h-screen w-full ${room.isNight ? 'bg-night text-bg' : 'bg-bg text-fg'}`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-20">
        <header
          className={`pb-5 mb-8 md:mb-10 border-b-2 ${
            room.isNight ? 'border-bg/30' : 'border-border'
          } flex flex-col md:flex-row md:items-end md:justify-between gap-3`}
        >
          <h1
            className={`font-display text-[clamp(40px,6vw,72px)] leading-[0.95] tracking-tight ${
              room.isNight ? 'text-bg font-semibold' : 'text-fg'
            }`}
            style={{
              fontVariationSettings: room.isNight
                ? '"opsz" 144, "SOFT" 80, "WONK" 1, "wght" 600'
                : '"opsz" 144, "SOFT" 80, "WONK" 1',
            }}
          >
            {room.title}
          </h1>
          <div className="text-right flex flex-col gap-1">
            <span
              className={`font-mono text-[10px] tracking-[0.16em] uppercase ${
                room.isNight ? 'text-bg/80' : 'text-muted'
              }`}
            >
              Cuarto 0{room.order} — de 07
            </span>
            {room.subtitle && (
              <p
                className={`font-display italic text-base md:text-lg ${
                  room.isNight ? 'text-bg font-medium' : 'text-muted'
                }`}
                style={
                  room.isNight ? { fontVariationSettings: '"opsz" 24, "SOFT" 60, "wght" 500' } : undefined
                }
              >
                {room.subtitle}
              </p>
            )}
          </div>
        </header>
        {children}
        {!hideNext && room.slug !== 'buzon' && (
          <NextRoomLink currentSlug={room.slug} onNight={room.isNight} />
        )}
      </div>
    </motion.main>
  );
}
