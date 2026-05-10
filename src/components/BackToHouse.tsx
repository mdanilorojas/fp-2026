'use client';

import Link from 'next/link';

type Props = { variant?: 'default' | 'night' };

export function BackToHouse({ variant = 'default' }: Props) {
  const classes =
    variant === 'night'
      ? 'bg-night text-bg border-bg/30 hover:bg-bg hover:text-night hover:border-bg'
      : 'bg-bg text-fg border-border hover:bg-fg hover:text-bg';
  return (
    <Link
      href="/"
      aria-label="Volver a la casa"
      className={`fixed top-4 left-4 z-50 inline-flex items-center gap-2 px-3 py-2.5 border-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${classes}`}
    >
      <span aria-hidden="true" className="text-sm leading-none">←</span>
      La casa
    </Link>
  );
}
