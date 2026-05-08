'use client';

import { useState } from 'react';
import { KitchenScene } from '@/components/room-parts/KitchenScene';
import { MemoryModal } from '@/components/shared/MemoryModal';
import { kitchenMemories } from '@/data/kitchen-memories';

export function CocinaRoom() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = kitchenMemories.find((m) => m.id === activeId) ?? null;

  return (
    <div>
      <p className="text-center text-muted-text max-w-xl mx-auto mb-6 text-base md:text-lg">
        Toca cada cosa. Detrás de cada una hay una memoria.
      </p>
      <KitchenScene onSelect={setActiveId} />
      <MemoryModal
        open={active !== null}
        title={active?.objectName ?? ''}
        body={active?.text ?? ''}
        variant={active?.isBridge ? 'bridge' : 'default'}
        onClose={() => setActiveId(null)}
      />
    </div>
  );
}
