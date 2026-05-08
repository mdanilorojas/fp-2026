'use client';

import { useState } from 'react';
import { useHouseStore } from '@/hooks/useHouseStore';
import { RecordPlayer } from '@/components/room-parts/RecordPlayer';

export function MusicaRoom() {
  const [songPlaying, setSongPlaying] = useState(false);
  const enabled = useHouseStore((s) => s.audioEnabled);
  // Ducking: we surface this to the AudioEngine via context... simpler approach here:
  // we just let the room music stay at normal volume; since the tocadiscos audio is louder
  // it will dominate. Full ducking would require lifting state to AppShell — keep it simple.
  void enabled;

  return (
    <div className="space-y-6">
      <p className="text-center text-muted-text max-w-xl mx-auto text-base md:text-lg">
        Toca una funda. Deja que la aguja haga el trabajo.
      </p>
      <RecordPlayer onPlayStateChange={setSongPlaying} />
      {songPlaying && (
        <p className="text-center text-sm text-muted-text italic">Sonando para ti.</p>
      )}
    </div>
  );
}
