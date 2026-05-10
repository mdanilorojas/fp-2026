'use client';

import './print.css';
import { coupons } from '@/data/coupons';
import { flor } from '@/data/flor';

const ACCENT_WORD: Record<string, string> = {
  masaje: 'Masaje',
  viaje:  'viaje',
  sobres: 'sobre',
};

function renderTitle(title: string, id: string) {
  const word = ACCENT_WORD[id];
  if (!word) return title;
  const idx = title.indexOf(word);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <em>{word}</em>
      {title.slice(idx + word.length)}
    </>
  );
}

export default function PrintCouponsPage() {
  return (
    <main className="min-h-screen bg-bg p-10 print:p-0">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex items-baseline justify-between no-print border-b-2 border-border pb-5">
          <div>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
              Imprimir — A4 vertical
            </span>
            <h1
              className="font-display text-4xl md:text-5xl text-fg mt-1 leading-none"
              style={{ fontVariationSettings: '"opsz" 96, "SOFT" 80, "WONK" 1' }}
            >
              Cupones para <em>{flor.firstName}</em>
            </h1>
          </div>
          <button
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="font-mono text-[11px] tracking-[0.16em] uppercase bg-accent text-bg border-2 border-accent px-5 py-3 hover:bg-fg hover:border-fg transition-colors"
          >
            Imprimir →
          </button>
        </header>

        <div className="space-y-10 print:space-y-8">
          {coupons.map((c) => (
            <article
              key={c.id}
              className="relative bg-surface border-2 border-border p-10 break-inside-avoid"
              style={{ minHeight: '260px' }}
            >
              <span className="absolute top-4 right-6 border-2 border-accent text-accent font-mono text-[10px] tracking-[0.18em] uppercase px-2 py-1 rotate-[-6deg] bg-bg">
                Cupón {String(c.number).padStart(2, '0')} · de 03
              </span>

              <div className="flex items-baseline justify-between pb-3 border-b border-dashed border-border">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
                  Canjeable cuando tú quieras
                </span>
                <span className="font-hand text-2xl text-fg">para {flor.firstName}</span>
              </div>
              <h2
                className="font-display text-[clamp(36px,5vw,56px)] text-fg leading-[0.95] mt-4"
                style={{ fontVariationSettings: '"opsz" 96, "SOFT" 80, "WONK" 1' }}
              >
                {renderTitle(c.title, c.id)}
              </h2>
              <p className="font-display italic text-lg md:text-xl text-muted mt-1">{c.subtitle}</p>
              <p className="text-lg md:text-xl text-fg/85 mt-5 leading-relaxed max-w-prose">{c.body}</p>
              <div className="mt-8 pt-4 border-t border-dashed border-border flex items-end justify-between">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
                  Con todo mi cariño
                </p>
                <p className="font-hand text-4xl text-fg leading-none">Danilo</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
