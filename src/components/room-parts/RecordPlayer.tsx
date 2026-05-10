'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { songs, type Song } from '@/data/music';
import { useMediaExists } from '@/hooks/useMediaExists';

export function RecordPlayer({
  onPlayStateChange,
}: {
  onPlayStateChange?: (playing: boolean) => void;
}) {
  const [current, setCurrent] = useState<Song | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rotate = useAnimation();

  useEffect(() => {
    if (playing) {
      rotate.start({ rotate: 360, transition: { repeat: Infinity, duration: 4, ease: 'linear' } });
    } else {
      rotate.stop();
    }
    onPlayStateChange?.(playing);
  }, [playing, rotate, onPlayStateChange]);

  const select = (song: Song) => {
    if (!audioRef.current) return;
    if (current?.id === song.id && playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    setCurrent(song);
    audioRef.current.src = song.file;
    audioRef.current.volume = 0.9;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const stop = () => setPlaying(false);
    el.addEventListener('ended', stop);
    el.addEventListener('pause', stop);
    return () => {
      el.removeEventListener('ended', stop);
      el.removeEventListener('pause', stop);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative border-2 border-border bg-fg text-bg p-8 md:p-12">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-bg/60">
            Tocadiscos
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-bg/60">
            {playing ? '● PLAY' : '○ PAUSA'}
          </span>
        </div>

        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
          <motion.div
            animate={rotate}
            className="w-full h-full rounded-full relative"
            style={{
              background:
                'radial-gradient(circle, var(--color-fg) 0%, color-mix(in oklch, var(--color-fg) 85%, var(--color-bg) 15%) 40%, var(--color-fg) 60%, color-mix(in oklch, var(--color-fg) 90%, var(--color-bg) 10%) 100%)',
              border: '2px solid var(--color-bg)',
            }}
          >
            {/* grooves */}
            {[90, 75, 60, 45].map((r) => (
              <span
                key={r}
                aria-hidden="true"
                className="absolute rounded-full border border-bg/15"
                style={{ inset: `${100 - r}%` }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center border-2 border-bg">
                <p
                  className="font-display italic text-bg text-sm md:text-base text-center px-1 leading-tight"
                  style={{ fontVariationSettings: '"opsz" 36, "SOFT" 80, "WONK" 1' }}
                >
                  {current?.title ?? 'Flor'}
                </p>
              </div>
              <span aria-hidden="true" className="absolute w-1.5 h-1.5 rounded-full bg-bg" />
            </div>
          </motion.div>

          {/* Tonearm */}
          <div
            className={`absolute -right-4 md:-right-10 top-2 origin-bottom-right transition-transform duration-700 ${
              playing ? 'rotate-[-22deg]' : 'rotate-[-44deg]'
            }`}
            aria-hidden="true"
          >
            <div className="w-1.5 h-40 bg-bg" />
            <div className="absolute bottom-0 -left-1 w-5 h-2 bg-bg" />
            <div className="absolute -top-1 left-[2px] w-3 h-3 rounded-full bg-accent border border-bg" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-2 md:gap-3">
          {songs.map((s) => (
            <SleeveButton key={s.id} song={s} active={current?.id === s.id && playing} onClick={() => select(s)} />
          ))}
        </div>
      </div>
      <audio ref={audioRef} preload="none" />
    </div>
  );
}

function SleeveButton({ song, active, onClick }: { song: Song; active: boolean; onClick: () => void }) {
  const exists = useMediaExists(song.file);
  const disabled = exists === false;

  const base = 'relative aspect-square border-2 flex flex-col items-center justify-center text-center p-3 transition-colors';
  let palette: string;
  if (active) {
    palette = 'border-accent bg-accent text-bg';
  } else if (disabled) {
    palette = 'border-bg/20 bg-fg text-bg/40 cursor-not-allowed';
  } else {
    palette = 'border-bg/60 bg-fg text-bg hover:bg-accent hover:border-accent';
  }

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${palette}`}>
      <p
        className="font-display text-base md:text-lg leading-tight"
        style={{ fontVariationSettings: '"opsz" 24, "SOFT" 60, "WONK" 1' }}
      >
        {song.title}
      </p>
      <p className="font-mono text-[9px] tracking-[0.12em] uppercase opacity-70 mt-1">{song.artist}</p>
      {disabled && (
        <p className="absolute bottom-2 font-mono text-[9px] tracking-[0.18em] uppercase">
          próximamente
        </p>
      )}
    </button>
  );
}
