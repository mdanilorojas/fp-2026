'use client';

import { useState } from 'react';
import { KitchenScene } from '@/components/room-parts/KitchenScene';
import { MemoryModal } from '@/components/shared/MemoryModal';
import { KitchenMatch3 } from '@/components/room-parts/KitchenMatch3';
import { KeyReveal } from '@/components/room-parts/KeyReveal';
import { kitchenMemories } from '@/data/kitchen-memories';
import { useHouseStore, type KeyColor } from '@/hooks/useHouseStore';

export function CocinaRoom() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = kitchenMemories.find((m) => m.id === activeId) ?? null;

  const kitchenKeyColor = useHouseStore((s) => s.kitchenKeyColor);
  const setKitchenKey = useHouseStore((s) => s.setKitchenKey);

  // Local session state: show the match-3 until it's solved *in this visit*.
  // This way reopening the kitchen never skips straight to the reveal.
  const [wonThisSession, setWonThisSession] = useState(false);
  const showReveal = wonThisSession && kitchenKeyColor !== null;

  const handleWin = (color: KeyColor) => {
    setKitchenKey(color);
    setWonThisSession(true);
  };

  return (
    <div className="space-y-10 md:space-y-12">
      {/* MEMORIES */}
      <section>
        <KitchenScene onSelect={setActiveId} />
        <aside
          role="note"
          className="max-w-4xl mx-auto mt-6 border-l-2 border-accent bg-accent-weak p-4 md:p-5"
        >
          <p className="font-display italic text-base md:text-lg leading-snug">
            <span className="text-accent">Puente.</span>{' '}
            Una de estas cosas lleva a otro cuarto donde papá sigue contigo. Entra cuando quieras.
          </p>
        </aside>
      </section>

      {/* GAME — same vocabulary, second register */}
      <section className="border-t-2 border-border pt-8 md:pt-10">
        <div className="flex items-baseline justify-between mb-3">
          <h2
            className="font-display text-2xl md:text-3xl leading-none"
            style={{ fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1' }}
          >
            La llave <em>perdida</em>
          </h2>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            un juego
          </span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-5">
          // también se me perdió una llave de casa. ¿me ayudas a buscarla?
        </p>

        {showReveal && kitchenKeyColor ? (
          <KeyReveal color={kitchenKeyColor} />
        ) : (
          <KitchenMatch3 onWin={handleWin} />
        )}
      </section>

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
