'use client';

import { motion } from 'framer-motion';
import { useHouseStore } from '@/hooks/useHouseStore';
import type { Coupon } from '@/data/coupons';

type Props = {
  coupon: Coupon;
  expanded?: boolean;
  onToggle?: () => void;
};

export function CouponCard({ coupon, expanded = false, onToggle }: Props) {
  const saved = useHouseStore((s) => s.savedCoupons.includes(coupon.id));
  const save = useHouseStore((s) => s.saveCoupon);

  return (
    <motion.div
      layout
      onClick={onToggle}
      whileHover={{ scale: expanded ? 1 : 1.02 }}
      className={`relative cursor-pointer rounded-2xl border-2 border-gold bg-gradient-to-b from-paper to-[#e9c068] shadow-xl p-6 md:p-8 ${
        expanded ? 'w-full max-w-xl' : 'w-full'
      }`}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-serif text-xs uppercase tracking-widest text-muted-text">
          Cupón {coupon.number}
        </span>
        {saved && <span className="text-xs text-leaf">✓ Guardado</span>}
      </div>
      <h3 className="font-serif text-2xl md:text-3xl text-deep-brown mt-2">{coupon.title}</h3>
      <p className="text-muted-text mt-1">{coupon.subtitle}</p>
      {expanded && (
        <>
          <p className="mt-4 text-base md:text-lg text-deep-brown/85">{coupon.body}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              save(coupon.id);
            }}
            className="mt-6 px-5 py-3 rounded-full bg-deep-brown text-paper font-serif hover:scale-105 active:scale-95 transition-transform"
          >
            {saved ? 'Guardado' : coupon.cta}
          </button>
        </>
      )}
    </motion.div>
  );
}
