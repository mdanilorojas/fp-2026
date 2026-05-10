'use client';

import { motion } from 'framer-motion';
import { useHouseStore } from '@/hooks/useHouseStore';
import type { Coupon } from '@/data/coupons';

type Props = {
  coupon: Coupon;
  expanded?: boolean;
  onToggle?: () => void;
};

// Per-coupon word to italicize inside the title
const ACCENT_WORD: Record<string, string> = {
  masaje: 'Masaje',
  viaje:  'viaje',
  sobres: 'sobre',
};

function renderTitleWithAccent(coupon: Coupon) {
  const word = ACCENT_WORD[coupon.id];
  if (!word) return coupon.title;
  const idx = coupon.title.indexOf(word);
  if (idx === -1) return coupon.title;
  return (
    <>
      {coupon.title.slice(0, idx)}
      <em>{word}</em>
      {coupon.title.slice(idx + word.length)}
    </>
  );
}

export function CouponCard({ coupon, expanded = false, onToggle }: Props) {
  const saved = useHouseStore((s) => s.savedCoupons.includes(coupon.id));
  const save = useHouseStore((s) => s.saveCoupon);

  return (
    <motion.div
      layout
      onClick={onToggle}
      whileHover={{ y: expanded ? 0 : -2 }}
      className="relative cursor-pointer bg-surface border-2 border-border p-6 md:p-8"
    >
      {/* punched-ticket notches */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 -left-[10px] w-4 h-4 -translate-y-1/2 rounded-full border-2 border-border bg-bg"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 -right-[10px] w-4 h-4 -translate-y-1/2 rounded-full border-2 border-border bg-bg"
      />

      {/* stamp */}
      <span className="absolute top-2.5 right-4 md:top-3 md:right-5 border-2 border-accent text-accent font-mono text-[9px] tracking-[0.18em] uppercase px-2 py-1 rotate-[-6deg] bg-bg">
        Cupón {String(coupon.number).padStart(2, '0')} · de 03
      </span>

      <div className="flex items-baseline justify-between pb-3 border-b border-dashed border-border">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
          Canjeable cuando tú quieras
        </span>
        <span className="font-hand text-xl text-fg">para Flor</span>
      </div>

      <h3
        className="font-display text-3xl md:text-4xl leading-[1] tracking-tight mt-4"
        style={{ fontVariationSettings: '"opsz" 72, "SOFT" 80, "WONK" 1' }}
      >
        {renderTitleWithAccent(coupon)}
      </h3>
      <p className="font-display italic text-base md:text-lg text-muted mt-1">
        {coupon.subtitle}
      </p>

      {expanded && (
        <>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-fg/90">{coupon.body}</p>
          <div className="mt-6 pt-4 border-t border-dashed border-border flex items-end justify-between gap-4">
            <span className="font-hand text-3xl text-fg leading-none">— Danilo</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                save(coupon.id);
              }}
              className={`font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-3 border-2 transition-colors ${
                saved
                  ? 'bg-accent-weak border-accent text-accent cursor-default'
                  : 'bg-fg text-bg border-fg hover:bg-accent hover:border-accent'
              }`}
            >
              {saved ? '✓ Guardado' : 'Guardar cupón'}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
