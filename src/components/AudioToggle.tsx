'use client';

import { useHouseStore } from '@/hooks/useHouseStore';

export function AudioToggle() {
  const enabled = useHouseStore((s) => s.audioEnabled);
  const toggle = useHouseStore((s) => s.toggleAudio);
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Silenciar' : 'Activar sonido'}
      aria-pressed={enabled}
      className="fixed top-4 right-4 z-50 w-12 h-12 border-2 border-border bg-bg text-fg hover:bg-accent hover:border-accent hover:text-bg transition-colors flex items-center justify-center"
    >
      {enabled ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="4,9 8,9 13,5 13,19 8,15 4,15" />
          <path d="M17 8 Q20 12, 17 16" />
          <path d="M20 6 Q24 12, 20 18" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="4,9 8,9 13,5 13,19 8,15 4,15" />
          <line x1="17" y1="8" x2="22" y2="16" />
          <line x1="22" y1="8" x2="17" y2="16" />
        </svg>
      )}
    </button>
  );
}
