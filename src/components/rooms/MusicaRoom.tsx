'use client';

import { useState } from 'react';
import { RecordPlayer } from '@/components/room-parts/RecordPlayer';

export function MusicaRoom() {
  const [songPlaying, setSongPlaying] = useState(false);

  return (
    <div className="space-y-5">
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted text-center md:text-left">
        // toca una funda. deja que la aguja haga el trabajo.
      </p>
      <RecordPlayer onPlayStateChange={setSongPlaying} />
      {songPlaying && (
        <p className="text-center">
          <span className="inline-block border-l-2 border-accent pl-3 font-display italic text-lg md:text-xl text-fg/80">
            Sonando para ti.
          </span>
        </p>
      )}
    </div>
  );
}
