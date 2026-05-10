'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { coupons } from '@/data/coupons';
import { CouponCard } from '@/components/shared/CouponCard';

export function CouponStack() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-5 md:space-y-6">
      {coupons.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
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
