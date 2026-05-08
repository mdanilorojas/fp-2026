'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useHouseStore } from '@/hooks/useHouseStore';
import { AppShell } from '@/components/AppShell';
import { RoomLayout } from '@/components/RoomLayout';
import { roomsBySlug, type RoomSlug } from '@/data/rooms';
import { PasajeRoom } from '@/components/rooms/PasajeRoom';
import { CocinaRoom } from '@/components/rooms/CocinaRoom';
import { PatioRoom } from '@/components/rooms/PatioRoom';
import { MusicaRoom } from '@/components/rooms/MusicaRoom';
import { FamiliaRoom } from '@/components/rooms/FamiliaRoom';
import { BuzonRoom } from '@/components/rooms/BuzonRoom';

const KNOWN_SLUGS: RoomSlug[] = ['pasaje', 'cocina', 'patio', 'musica', 'familia', 'buzon'];

export default function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<RoomSlug | null>(null);
  const room = slug ? roomsBySlug[slug] : null;
  const visitRoom = useHouseStore((s) => s.visitRoom);

  // Handle Next.js 15 async params
  useEffect(() => {
    params.then((p) => setSlug(p.slug as RoomSlug));
  }, [params]);

  useEffect(() => {
    if (room && slug) visitRoom(slug);
  }, [slug, visitRoom, room]);

  if (!slug) return <div className="min-h-screen" />;
  if (!room || !KNOWN_SLUGS.includes(slug)) notFound();

  return (
    <AppShell currentRoomSlug={slug}>
      <RoomLayout room={room}>
        {slug === 'pasaje' && <PasajeRoom />}
        {slug === 'cocina' && <CocinaRoom />}
        {slug === 'patio' && <PatioRoom />}
        {slug === 'musica' && <MusicaRoom />}
        {slug === 'familia' && <FamiliaRoom />}
        {slug === 'buzon' && <BuzonRoom />}
      </RoomLayout>
    </AppShell>
  );
}
