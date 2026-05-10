'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useHouseStore } from '@/hooks/useHouseStore';

const SRC = '/audio/songs/julio.mp3';
const VOLUME = 0.55;
const FADE_MS = 800;
const FADE_STEPS = 20;
const STOP_PATH_PREFIX = '/cuarto/musica';
const TIME_KEY = 'flor-intro-audio-time';
const STOPPED_KEY = 'flor-intro-audio-stopped';

function fade(audio: HTMLAudioElement, from: number, to: number, ms: number) {
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

function isStopped() {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem(STOPPED_KEY) === '1';
}

function markStopped() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(STOPPED_KEY, '1');
}

function readResumeTime() {
  if (typeof window === 'undefined') return 0;
  const raw = window.sessionStorage.getItem(TIME_KEY);
  const n = raw ? parseFloat(raw) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function saveResumeTime(t: number) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(TIME_KEY, String(t));
}

export function IntroAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();
  const enabled = useHouseStore((s) => s.audioEnabled);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isStopped()) return;

    if (pathname && pathname.startsWith(STOP_PATH_PREFIX)) {
      markStopped();
      fade(audio, audio.volume, 0, FADE_MS).then(() => {
        audio.pause();
        audio.src = '';
      });
      return;
    }

    if (!audio.src) {
      audio.src = SRC;
      audio.loop = true;
      audio.volume = 0;
      const resume = readResumeTime();
      if (resume > 0) {
        const seek = () => {
          try {
            audio.currentTime = resume;
          } catch {
            // ignore — some browsers require metadata
          }
          audio.removeEventListener('loadedmetadata', seek);
        };
        audio.addEventListener('loadedmetadata', seek);
      }
    }

    if (!enabled) {
      fade(audio, audio.volume, 0, 300).then(() => audio.pause());
      return;
    }

    audio
      .play()
      .then(() => fade(audio, audio.volume, VOLUME, FADE_MS))
      .catch(() => {
        // autoplay blocked — will retry on next user gesture via effect re-run
      });
  }, [pathname, enabled]);

  // Retry on first user gesture if autoplay was blocked
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const kick = () => {
      if (isStopped() || !enabled) return;
      if (audio.paused) {
        audio.play().then(() => fade(audio, audio.volume, VOLUME, FADE_MS)).catch(() => {});
      }
    };
    window.addEventListener('pointerdown', kick, { once: true });
    window.addEventListener('keydown', kick, { once: true });
    return () => {
      window.removeEventListener('pointerdown', kick);
      window.removeEventListener('keydown', kick);
    };
  }, [enabled]);

  // Persist currentTime so navigation preserves position
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const interval = setInterval(() => {
      if (!isStopped() && !audio.paused && audio.currentTime > 0) {
        saveResumeTime(audio.currentTime);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      if (!isStopped() && audio.currentTime > 0) saveResumeTime(audio.currentTime);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden' }}>
      <audio ref={audioRef} preload="none" />
    </div>
  );
}
