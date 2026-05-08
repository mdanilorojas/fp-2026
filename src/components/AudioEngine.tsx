'use client';

import { useEffect, useRef } from 'react';
import { roomsBySlug, type RoomSlug } from '@/data/rooms';

type Props = {
  currentRoomSlug: RoomSlug | null;
  enabled: boolean;
  duckingFactor?: number; // when duck is true, multiply volume by this
  duck?: boolean;
};

const DEFAULT_VOLUME = 0.6;
const FADE_MS = 1500;
const FADE_STEPS = 30;

async function fadeVolume(audio: HTMLAudioElement, from: number, to: number, ms: number) {
  const step = (to - from) / FADE_STEPS;
  const interval = ms / FADE_STEPS;
  return new Promise<void>((resolve) => {
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      audio.volume = Math.max(0, Math.min(1, from + step * i));
      if (i >= FADE_STEPS) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });
}

export function AudioEngine({ currentRoomSlug, enabled, duckingFactor = 0.2, duck = false }: Props) {
  const audioARef = useRef<HTMLAudioElement | null>(null);
  const audioBRef = useRef<HTMLAudioElement | null>(null);
  const activeRef = useRef<'A' | 'B'>('A');
  const lastSlugRef = useRef<RoomSlug | null>(null);

  // Swap tracks on room change
  useEffect(() => {
    if (!currentRoomSlug) return;
    if (currentRoomSlug === lastSlugRef.current) return;
    const room = roomsBySlug[currentRoomSlug];
    if (!room) return;
    const nextSrc = room.ambientMp3;

    const active = activeRef.current === 'A' ? audioARef.current : audioBRef.current;
    const inactive = activeRef.current === 'A' ? audioBRef.current : audioARef.current;
    if (!inactive) return;

    inactive.src = nextSrc;
    inactive.loop = true;
    inactive.volume = 0;
    const playPromise = inactive.play().catch(() => {
      // ignore (autoplay blocked or file missing)
    });

    const target = enabled ? (duck ? DEFAULT_VOLUME * duckingFactor : DEFAULT_VOLUME) : 0;
    Promise.resolve(playPromise).then(() => {
      fadeVolume(inactive, 0, target, FADE_MS);
      if (active) {
        fadeVolume(active, active.volume, 0, FADE_MS).then(() => {
          active.pause();
          active.src = '';
        });
      }
      activeRef.current = activeRef.current === 'A' ? 'B' : 'A';
      lastSlugRef.current = currentRoomSlug;
    });
  }, [currentRoomSlug, enabled, duck, duckingFactor]);

  // React to enabled toggle
  useEffect(() => {
    const active = activeRef.current === 'A' ? audioARef.current : audioBRef.current;
    if (!active) return;
    const target = enabled ? (duck ? DEFAULT_VOLUME * duckingFactor : DEFAULT_VOLUME) : 0;
    fadeVolume(active, active.volume, target, 500);
  }, [enabled, duck, duckingFactor]);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden' }}>
      <audio ref={audioARef} preload="none" />
      <audio ref={audioBRef} preload="none" />
    </div>
  );
}
