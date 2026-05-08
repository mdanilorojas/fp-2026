'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { coupons } from '@/data/coupons';
import { CouponCard } from '@/components/shared/CouponCard';

export function CouponStack() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4 md:space-y-5">
      {coupons.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 30, rotate: (i - 1) * 2 }}
          animate={{ opacity: 1, y: 0, rotate: expandedId === c.id ? 0 : (i - 1) * 1.5 }}
          transition={{ delay: i * 0.12, type: 'spring', damping: 22 }}
        >
          <CouponCard
            coupon={c}
            expanded={expandedId === c.id}
            onToggle={() => setExpandedId((id) => (id === c.id ? null : c.id))}
          />
        </motion.div>
      ))}
    </div>
  );
}
