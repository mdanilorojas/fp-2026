'use client';

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useHouseStore } from '@/hooks/useHouseStore';
import { AppShell } from '@/components/AppShell';
import { RoomLayout } from '@/components/RoomLayout';
import { roomsBySlug, isRoomUnlocked, type RoomSlug } from '@/data/rooms';
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
  const visited = useHouseStore((s) => s.visitedRooms);
  const visitRoom = useHouseStore((s) => s.visitRoom);
  const router = useRouter();

  // Handle Next.js 15 async params
  useEffect(() => {
    params.then((p) => setSlug(p.slug as RoomSlug));
  }, [params]);

  // Enforce linear progression: if someone types /cuarto/musica without
  // having visited the predecessor, bounce them back to the house map.
  useEffect(() => {
    if (!slug || !room) return;
    if (!isRoomUnlocked(slug, visited)) {
      router.replace('/');
    }
  }, [slug, room, visited, router]);

  useEffect(() => {
    if (room && slug && isRoomUnlocked(slug, visited)) visitRoom(slug);
  }, [slug, visitRoom, room, visited]);

  if (!slug) return <div className="min-h-screen" />;
  if (!room || !KNOWN_SLUGS.includes(slug)) notFound();
  if (!isRoomUnlocked(slug, visited)) return <div className="min-h-screen" />;

  // Cocina renders its own next-link (from KeyReveal) once the key is won.
  const hideNext = slug === 'cocina';

  return (
    <AppShell currentRoomSlug={slug}>
      <RoomLayout room={room} hideNext={hideNext}>
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
