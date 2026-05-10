'use client';

import { useHouseStore } from '@/hooks/useHouseStore';
import { AudioEngine } from './AudioEngine';
import { AudioToggle } from './AudioToggle';
import { BackToHouse } from './BackToHouse';
import type { RoomSlug } from '@/data/rooms';
import { roomsBySlug } from '@/data/rooms';

type Props = {
  currentRoomSlug?: RoomSlug | null;
  showBack?: boolean;
  duck?: boolean;
  children: React.ReactNode;
};

export function AppShell({ currentRoomSlug = null, showBack = true, duck = false, children }: Props) {
  const enabled = useHouseStore((s) => s.audioEnabled);
  const isNight = currentRoomSlug ? roomsBySlug[currentRoomSlug]?.isNight : false;

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ${
        isNight ? 'bg-night text-bg' : 'bg-bg text-fg'
      }`}
    >
      <AudioEngine currentRoomSlug={currentRoomSlug} enabled={enabled} duck={duck} />
      {showBack && <BackToHouse variant={isNight ? 'night' : 'default'} />}
      <AudioToggle />
      {children}
    </div>
  );
}
