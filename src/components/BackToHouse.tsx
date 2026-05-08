'use client';

import Link from 'next/link';

type Props = { variant?: 'default' | 'night' };

export function BackToHouse({ variant = 'default' }: Props) {
  const color = variant === 'night' ? 'text-paper border-paper/40' : 'text-deep-brown border-deep-brown/20';
  return (
    <Link
      href="/"
      aria-label="Volver a la casa"
      className={`fixed top-4 left-4 z-50 px-4 py-2 rounded-full bg-surface/80 backdrop-blur shadow border ${color} text-sm font-serif hover:bg-surface active:scale-95 transition`}
    >
      ← Volver a la casa
    </Link>
  );
}
