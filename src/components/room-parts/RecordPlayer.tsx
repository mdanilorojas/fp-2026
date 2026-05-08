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
      <div className="relative bg-gradient-to-b from-[#3b2a1a] to-[#1e150d] rounded-2xl p-8 md:p-12 shadow-2xl">
        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
          <motion.div
            animate={rotate}
            className="w-full h-full rounded-full bg-[radial-gradient(circle,#0a0a0a_0%,#1a1a1a_40%,#0a0a0a_60%,#222_100%)] shadow-inner relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold flex items-center justify-center">
                <p className="font-serif text-deep-brown text-xs md:text-sm text-center px-1">
                  {current?.title ?? 'Flor'}
                </p>
              </div>
            </div>
          </motion.div>
          {/* Tonearm */}
          <div
            className={`absolute -right-8 md:-right-12 top-4 origin-bottom-right transition-transform duration-700 ${
              playing ? 'rotate-[-18deg]' : 'rotate-[-40deg]'
            }`}
          >
            <div className="w-2 h-40 bg-gold rounded" />
            <div className="absolute bottom-0 left-0 w-6 h-3 bg-gold rounded" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
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
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-center p-3 transition ${
        active
          ? 'border-gold bg-gold/20 text-gold scale-105'
          : disabled
          ? 'border-paper/20 bg-paper/10 text-paper/40 cursor-not-allowed'
          : 'border-paper/40 bg-paper/10 text-paper hover:scale-105 active:scale-95'
      }`}
    >
      <p className="font-serif text-sm md:text-base">{song.title}</p>
      <p className="text-xs opacity-70 mt-1">{song.artist}</p>
      {disabled && <p className="absolute bottom-2 text-[10px] uppercase tracking-wider">Próximamente</p>}
    </button>
  );
}
