'use client';

import { useHouseStore } from '@/hooks/useHouseStore';

export function AudioToggle() {
  const enabled = useHouseStore((s) => s.audioEnabled);
  const toggle = useHouseStore((s) => s.toggleAudio);
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Silenciar' : 'Activar sonido'}
      className="fixed top-4 right-4 z-50 w-14 h-14 rounded-full bg-surface/90 backdrop-blur shadow-lg flex items-center justify-center text-2xl hover:scale-105 active:scale-95 transition-transform"
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
