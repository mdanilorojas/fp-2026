'use client';

import './print.css';
import { coupons } from '@/data/coupons';
import { flor } from '@/data/flor';

export default function PrintCouponsPage() {
  return (
    <main className="min-h-screen bg-white p-10 print:p-0">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center no-print">
          <h1 className="font-serif text-4xl text-deep-brown">Imprimir cupones para {flor.firstName}</h1>
          <p className="text-muted-text mt-2">Tamaño A4. Usa el botón de imprimir de tu navegador.</p>
          <button
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="mt-5 px-6 py-3 rounded-full bg-deep-brown text-paper font-serif hover:scale-105 active:scale-95 transition-transform"
          >
            Imprimir
          </button>
        </header>

        <div className="space-y-10 print:space-y-8">
          {coupons.map((c) => (
            <article
              key={c.id}
              className="relative border-4 border-gold rounded-2xl p-10 bg-gradient-to-b from-paper/40 to-paper break-inside-avoid"
              style={{ minHeight: '250px' }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-sm uppercase tracking-widest text-muted-text">
                  Cupón {c.number}
                </span>
                <span className="font-hand text-2xl text-cacao">para {flor.firstName}</span>
              </div>
              <h2 className="font-serif text-4xl text-deep-brown mt-3">{c.title}</h2>
              <p className="font-serif italic text-muted-text mt-1 text-lg">{c.subtitle}</p>
              <p className="text-xl text-deep-brown/85 mt-6">{c.body}</p>
              <div className="mt-8 flex items-baseline justify-between">
                <p className="font-hand text-lg text-cacao">Con todo mi cariño,</p>
                <p className="font-hand text-3xl text-cacao">Danilo</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
