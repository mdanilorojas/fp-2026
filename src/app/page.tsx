'use client';

import { useHouseStore } from '@/hooks/useHouseStore';
import { PuertaIntro } from '@/components/PuertaIntro';
import { HouseMap } from '@/components/HouseMap';
import { AppShell } from '@/components/AppShell';

export default function HomePage() {
  const hasVisitedPuerta = useHouseStore((s) => s.visitedRooms.has('puerta'));

  if (!hasVisitedPuerta) {
    return <PuertaIntro />;
  }

  return (
    <AppShell currentRoomSlug={null} showBack={false}>
      <HouseMap />
    </AppShell>
  );
}
