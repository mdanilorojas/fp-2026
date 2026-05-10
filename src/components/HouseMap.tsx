'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { rooms, type RoomSlug } from '@/data/rooms';
import { flor } from '@/data/flor';
import {
  PasajeSvg, CocinaSvg, PatioSvg, MusicaSvg, FamiliaSvg, BuzonSvg,
} from './room-svgs';
import type { ReactNode } from 'react';

type RoomCardData = {
  slug: RoomSlug;
  order: number;
  shortName: ReactNode; // with <em> wrapping the italicized word
  art: ReactNode;
  night?: boolean;
};

function makeCardData(slug: RoomSlug): RoomCardData {
  const room = rooms.find((r) => r.slug === slug)!;
  switch (slug) {
    case 'pasaje':
      return { slug, order: room.order, shortName: <em>Pasaje</em>, art: <PasajeSvg className="w-full h-full" /> };
    case 'cocina':
      return { slug, order: room.order, shortName: <>La <em>cocina</em></>, art: <CocinaSvg className="w-full h-full" /> };
    case 'patio':
      return { slug, order: room.order, shortName: <>El <em>patio</em></>, art: <PatioSvg className="w-full h-full" /> };
    case 'musica':
      return { slug, order: room.order, shortName: <>Sala de <em>música</em></>, art: <MusicaSvg className="w-full h-full" /> };
    case 'familia':
      return { slug, order: room.order, shortName: <>Los que <em>siguen</em></>, art: <FamiliaSvg className="w-full h-full" onNight />, night: true };
    case 'buzon':
      return { slug, order: room.order, shortName: <>El <em>buzón</em></>, art: <BuzonSvg className="w-full h-full" invert /> };
    default:
      return { slug, order: room.order, shortName: room.title, art: null };
  }
}

export function HouseMap() {
  // Linear flow: at the map, only 'pasaje' is ever offered. The rest of the
  // rooms are reached via the "Siguiente" button inside each room.
  const pasaje = makeCardData('pasaje');

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <motion.header
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 md:pb-8 border-b-2 border-border"
        >
          <h1
            className="font-display text-[clamp(40px,6.5vw,80px)] leading-[0.95] tracking-tight"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1' }}
          >
            La casa de <em>{flor.firstName}</em>
          </h1>
          <div className="text-right">
            <p className="font-display italic text-lg md:text-xl text-muted">— un regalo de Danilo —</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
              Toca un cuarto para entrar
            </p>
          </div>
        </motion.header>

        <div className="pt-8 md:pt-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <Link
              href={`/cuarto/${pasaje.slug}`}
              className="group relative flex flex-col border-2 border-fg overflow-hidden aspect-[4/3] bg-surface text-fg transition-transform duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px]"
              style={{ boxShadow: '6px 6px 0 0 var(--color-fg)' }}
            >
              <span
                aria-hidden="true"
                className="absolute top-3 left-3 z-20 bg-accent text-bg font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1"
              >
                Empieza aquí
              </span>
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-[62%] h-[62%]">{pasaje.art}</div>
              </div>
              <div className="relative z-10 flex justify-between items-baseline px-5 py-4 border-t-2 border-fg bg-bg">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
                  0{pasaje.order} · de 07
                </span>
                <span
                  className="font-display text-2xl md:text-3xl leading-none"
                  style={{ fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1' }}
                >
                  {pasaje.shortName}
                </span>
              </div>
            </Link>
            <p className="font-display italic text-sm md:text-base text-muted text-center mt-4">
              Este es un paseo de un solo camino. Te llevaré de un cuarto al siguiente.
            </p>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
