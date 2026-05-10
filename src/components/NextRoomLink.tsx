'use client';

import Link from 'next/link';
import { getNextRoom, type RoomSlug } from '@/data/rooms';

type Props = {
  currentSlug: RoomSlug;
  onNight?: boolean;
};

export function NextRoomLink({ currentSlug, onNight = false }: Props) {
  const next = getNextRoom(currentSlug);
  if (!next) return null;

  return (
    <div className={`mt-12 md:mt-16 pt-6 border-t-2 ${onNight ? 'border-bg/30' : 'border-border'}`}>
      <Link
        href={`/cuarto/${next.slug}`}
        className={`group flex items-center justify-between gap-5 border-2 px-5 py-4 md:px-6 md:py-5 transition-colors ${
          onNight
            ? 'border-bg/40 bg-transparent text-bg hover:bg-bg hover:text-fg'
            : 'border-fg bg-fg text-bg hover:bg-accent hover:border-accent'
        }`}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <span
            className={`font-mono text-[10px] tracking-[0.18em] uppercase ${
              onNight ? 'text-bg/70' : 'text-bg/70'
            }`}
          >
            Siguiente · cuarto 0{next.order} de 07
          </span>
          <span
            className="font-display text-2xl md:text-3xl leading-none"
            style={{ fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1' }}
          >
            {next.title}
          </span>
          {next.subtitle && (
            <span
              className={`font-display italic text-sm md:text-base mt-0.5 ${
                onNight ? 'text-bg/70' : 'text-bg/70'
              }`}
            >
              {next.subtitle}
            </span>
          )}
        </div>
        <span
          aria-hidden="true"
          className="font-display text-3xl md:text-4xl leading-none transition-transform group-hover:translate-x-1 shrink-0"
        >
          →
        </span>
      </Link>
    </div>
  );
}
