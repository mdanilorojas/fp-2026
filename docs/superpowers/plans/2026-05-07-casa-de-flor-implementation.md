# La casa de Flor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-room interactive web app for Flor Piedra (73, mamá de Danilo) as a Mother's Day gift — deployable to Vercel, usable on iPad Safari, delivered by Sunday 2026-05-10.

**Architecture:** Next.js 15 App Router SPA-ish site. Each "cuarto" is a route under `/cuarto/[slug]`. Non-linear navigation via a house-plan hub. Audio engine plays per-room ambient MP3 with cross-fade; letter is synced to Danilo's voice recording. Zero backend, localStorage persistence. No R3F. All assets gracefully degrade when missing.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Zustand (+persist), pnpm.

**Spec reference:** `docs/superpowers/specs/2026-05-07-madre-regalo-design.md`

---

## Execution notes

- Commit after each task. Push to `origin/main` every 2-3 tasks so Vercel auto-deploys and Danilo sees progress when he wakes up.
- Test suites use Vitest + React Testing Library. Interaction-heavy components get integration tests; pure visual components get smoke tests only.
- Every asset path uses `useMediaExists` or Next `Image` `onError` — the app must never show broken icons.
- The 6 photos in `/media/` and 2 videos are unassigned until Danilo labels them. Scaffold copies them to `/public/photos/unassigned/` with preserved original names, and the app ignores them until referenced in data files.
- Vercel deploy: Danilo will connect the repo to his Vercel account; plan assumes `vercel.json` + build config are in place for that connection to work one-click.

---

## Task 1: Scaffold Next.js 15 project with pnpm

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `vercel.json`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `vitest.config.ts`
- Create: `public/robots.txt`

- [ ] **Step 1: Initialize package.json**

Create `package.json`:

```json
{
  "name": "casa-de-flor",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "15.0.3",
    "react": "19.0.0-rc-02c0e824-20241028",
    "react-dom": "19.0.0-rc-02c0e824-20241028",
    "framer-motion": "^11.11.17",
    "zustand": "^5.0.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^22.9.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3",
    "vitest": "^2.1.5"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:
```bash
pnpm install
```

Expected: `node_modules/` created, lockfile `pnpm-lock.yaml` generated. No errors.

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create next.config.mjs**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Create Tailwind + PostCSS configs**

`tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        paper: 'var(--color-paper)',
        gold: 'var(--color-gold)',
        'warm-orange': 'var(--color-warm-orange)',
        coral: 'var(--color-coral)',
        'deep-brown': 'var(--color-deep-brown)',
        cacao: 'var(--color-cacao)',
        leaf: 'var(--color-leaf)',
        'valley-green': 'var(--color-valley-green)',
        sky: 'var(--color-sky)',
        night: 'var(--color-night)',
        candle: 'var(--color-candle)',
        'muted-text': 'var(--color-muted-text)',
        'cushion-cream': 'var(--color-cushion-cream)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        hand: ['var(--font-caveat)', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

`postcss.config.mjs`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create globals.css with design tokens**

`src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-background: #FFF8EF;
  --color-surface: #FFFFFF;
  --color-paper: #F7E6C8;
  --color-gold: #D9A441;
  --color-warm-orange: #E9783F;
  --color-coral: #D85C5C;
  --color-deep-brown: #3B2A1A;
  --color-cacao: #5A3A24;
  --color-leaf: #4F7A4F;
  --color-valley-green: #6C8B5F;
  --color-sky: #BFD7EA;
  --color-night: #1E2635;
  --color-candle: #F9B572;
  --color-muted-text: #7A6652;
  --color-cushion-cream: #E8D9B8;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

html, body { margin: 0; padding: 0; }
body {
  background: var(--color-background);
  color: var(--color-deep-brown);
  font-family: var(--font-inter), system-ui, sans-serif;
  font-size: 20px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
```

- [ ] **Step 7: Create src/app/layout.tsx with fonts + noindex**

```tsx
import type { Metadata } from 'next';
import { Playfair_Display, Inter, Caveat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['400', '500', '600'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Para Flor — Un regalo de Danilo',
  description: 'Un regalo del Día de la Madre.',
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create placeholder src/app/page.tsx**

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="font-serif text-3xl">La casa de Flor</p>
    </main>
  );
}
```

- [ ] **Step 9: Create vercel.json**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Robots-Tag", "value": "noindex, nofollow" }
      ]
    }
  ]
}
```

- [ ] **Step 10: Create public/robots.txt**

```
User-agent: *
Disallow: /
```

- [ ] **Step 11: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

- [ ] **Step 12: Create vitest.setup.ts**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 13: Verify build works**

Run:
```bash
pnpm build
```

Expected: Build succeeds. No TypeScript errors. `Compiled successfully` in output.

- [ ] **Step 14: Commit scaffold**

```bash
git add .
git commit -m "chore: scaffold Next.js 15 + Tailwind + Framer + Zustand + Vitest

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 2: Move media/ assets into public/ with correct structure

**Files:**
- Move: `media/*.jpg` → `public/photos/unassigned/`
- Move: `media/*.mp4` → `public/video/unassigned/`
- Create: `public/photos/{flor,papa,abuelos,perritos,pasaje,familia}/.gitkeep`
- Create: `public/audio/{ambient,songs,voz,sfx}/.gitkeep`
- Create: `public/video/.gitkeep`
- Create: `docs/ASSETS.md`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p public/photos/{flor,papa,abuelos,perritos,pasaje,familia,unassigned}
mkdir -p public/audio/{ambient,songs,voz,sfx}
mkdir -p public/video/unassigned
touch public/photos/{flor,papa,abuelos,perritos,pasaje,familia}/.gitkeep
touch public/audio/{ambient,songs,voz,sfx}/.gitkeep
touch public/video/.gitkeep
```

- [ ] **Step 2: Move existing media to unassigned**

```bash
mv media/*.jpg public/photos/unassigned/ 2>/dev/null || true
mv media/*.mp4 public/video/unassigned/ 2>/dev/null || true
rmdir media 2>/dev/null || true
```

- [ ] **Step 3: Write ASSETS.md with labeling instructions**

`docs/ASSETS.md`:

```markdown
# Asset Workflow

## Labeling unassigned media

The scaffold moves media to `/public/photos/unassigned/` and `/public/video/unassigned/` preserving original filenames. To use a photo/video in a room:

1. Rename the file to match the slot (e.g., `flor-01.jpg`, `papa-01.jpg`, `pasaje-01.jpg`).
2. Move it to the corresponding directory:
   - `public/photos/flor/` — photos of Flor
   - `public/photos/papa/` — photos of papá
   - `public/photos/abuelos/` — Eloy and Julia (`eloy-01.jpg`, `julia-01.jpg`)
   - `public/photos/perritos/` — Fido and Lila (`fido-01.jpg`, `lila-01.jpg`)
   - `public/photos/pasaje/` — landscape of Pasaje
   - `public/photos/familia/` — group photos
3. The app auto-detects them. No code change needed unless you want a custom caption (edit `src/data/photos.ts`).

## Audio

Place MP3s in the corresponding directory:

- `public/audio/ambient/room-{puerta,pasaje,cocina,patio,musica,familia,buzon}.mp3` — ambient per room
- `public/audio/songs/song-{1,2,3}.mp3` — tocadiscos songs
- `public/audio/voz/carta-danilo.mp3` — **critical** — Danilo reading the letter
- `public/audio/sfx/cigarras.mp3` — optional background for patio

Keep files ≤5MB, 96-128kbps MP3.

## Video

`public/video/papa-recuerdo.mp4` — optional video of papá. Keep ≤50MB.
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: move media to public/ with proper structure

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 3: Create data layer (typed data files with all content)

**Files:**
- Create: `src/data/flor.ts`, `src/data/rooms.ts`, `src/data/kitchen-memories.ts`, `src/data/music.ts`, `src/data/coupons.ts`, `src/data/letter.ts`, `src/data/family.ts`, `src/data/photos.ts`

- [ ] **Step 1: Create src/data/flor.ts**

```ts
export const flor = {
  firstName: 'Flor',
  fullName: 'Flor Piedra',
  age: 73,
  birthplace: 'Pasaje, El Oro',
  currentHome: 'Valle de los Chillos',
  favoriteThings: [
    'Candy Crush',
    'pasillos',
    'música del recuerdo',
    'música chichera',
    'yogur',
    'kéfir',
    'cantar',
    'Fido',
    'Lila',
  ],
} as const;
```

- [ ] **Step 2: Create src/data/rooms.ts**

```ts
export type RoomSlug =
  | 'puerta'
  | 'pasaje'
  | 'cocina'
  | 'patio'
  | 'musica'
  | 'familia'
  | 'buzon';

export type Room = {
  slug: RoomSlug;
  order: number;
  title: string;
  subtitle?: string;
  ambientMp3: string;
  isNight?: boolean;
};

export const rooms: Room[] = [
  { slug: 'puerta',  order: 1, title: 'La puerta',           subtitle: 'Flor, hoy te toca recibir.',       ambientMp3: '/audio/ambient/room-puerta.mp3' },
  { slug: 'pasaje',  order: 2, title: 'Pasaje',              subtitle: 'Donde empezó tu forma de querer.', ambientMp3: '/audio/ambient/room-pasaje.mp3' },
  { slug: 'cocina',  order: 3, title: 'La cocina',           subtitle: 'El cuarto donde se vivía.',        ambientMp3: '/audio/ambient/room-cocina.mp3' },
  { slug: 'patio',   order: 4, title: 'El patio',            subtitle: 'Fido, Lila y un pequeño jardín.',  ambientMp3: '/audio/ambient/room-patio.mp3' },
  { slug: 'musica',  order: 5, title: 'La sala de música',   subtitle: 'Pasillos, chichera, recuerdo.',    ambientMp3: '/audio/ambient/room-musica.mp3' },
  { slug: 'familia', order: 6, title: 'Los que siguen',      subtitle: 'Una ventana al cielo.',            ambientMp3: '/audio/ambient/room-familia.mp3', isNight: true },
  { slug: 'buzon',   order: 7, title: 'El buzón',            subtitle: 'Un sobre con tu nombre.',          ambientMp3: '/audio/ambient/room-buzon.mp3' },
];

export const roomsBySlug: Record<RoomSlug, Room> = Object.fromEntries(
  rooms.map((r) => [r.slug, r]),
) as Record<RoomSlug, Room>;

export const VISITABLE_ROOMS_FOR_BUZON_UNLOCK = 6; // visit all 6 non-buzon rooms to "earn" the buzon
```

- [ ] **Step 3: Create src/data/kitchen-memories.ts**

```ts
export type KitchenMemory = {
  id: string;
  objectName: string;
  icon: string;
  text: string;
  isBridge?: boolean; // true for mecedora (bridge to familia room)
};

export const kitchenMemories: KitchenMemory[] = [
  {
    id: 'olla',
    objectName: 'La olla',
    icon: 'pot',
    text: `La olla donde cocinaste cangrejos, mariscos, pollo con champiñones, tantas cosas.

Yo me acuerdo de cómo te criticaba la comida. Perdón, mami. Era soberbio. Hoy sé lo que vale que alguien te cocine con cariño todos los días.`,
  },
  {
    id: 'mesa',
    objectName: 'La mesa',
    icon: 'table',
    text: `La mesa donde jugábamos cartas. Donde jugamos Jenga. Donde cantabas y cantábamos.

La cocina era el cuarto más importante de la casa — no porque ahí se comía, sino porque ahí se vivía.`,
  },
  {
    id: 'olla-grande',
    objectName: 'La olla grande',
    icon: 'big-pot',
    text: `La olla grande — la del intento de negocio de colada morada. ¿Te acuerdas?

No nos fue bien. No importa. Fue uno de los momentos más divertidos del COVID, contigo, con papá y conmigo encerrados aquí intentando algo juntos.

No salió el negocio; salió una memoria.`,
  },
  {
    id: 'ventana',
    objectName: 'La ventana',
    icon: 'window',
    text: `Por esta ventana mirábamos pasar los días del encierro. Papá, tú y yo, los tres.

Nadie se enfermó. Tú nos cuidaste. De nuevo.`,
  },
  {
    id: 'mecedora',
    objectName: 'La mecedora de papá',
    icon: 'rocker',
    isBridge: true,
    text: `La mecedora de papá, con el cojín crema que tú le tejiste.

Hace tres años que nadie se sienta ahí. Pero la silla sigue en la cocina, porque aquí fue donde él más estuvo contigo.

Hay otro cuarto donde él sigue contigo. Cuando quieras, entra.`,
  },
];
```

- [ ] **Step 4: Create src/data/music.ts**

```ts
export type Song = {
  id: string;
  title: string;
  artist: string;
  file: string;
};

export const songs: Song[] = [
  { id: 'song-1', title: 'Canción 1', artist: 'Por definir', file: '/audio/songs/song-1.mp3' },
  { id: 'song-2', title: 'Canción 2', artist: 'Por definir', file: '/audio/songs/song-2.mp3' },
  { id: 'song-3', title: 'Canción 3', artist: 'Por definir', file: '/audio/songs/song-3.mp3' },
];
```

- [ ] **Step 5: Create src/data/coupons.ts**

```ts
export type Coupon = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
};

export const coupons: Coupon[] = [
  {
    id: 'masaje',
    number: 1,
    title: 'Masaje',
    subtitle: 'Un cupón para descansar.',
    body: 'Para que descanses ese cuerpo que tanto ha cuidado a todos.',
    cta: 'Canjear cuando quieras',
  },
  {
    id: 'viaje',
    number: 2,
    title: 'Viaje a donde tú quieras',
    subtitle: 'Tú decides el destino.',
    body: 'Tú escoges el lugar. Yo me encargo de ayudarte a llegar.',
    cta: 'Elegir destino',
  },
  {
    id: 'efectivo',
    number: 3,
    title: '$1,000 en efectivo',
    subtitle: 'Sin explicaciones.',
    body: 'Para que los uses como quieras, cuando quieras, sin dar explicaciones.',
    cta: 'Canjear cuando quieras',
  },
];
```

- [ ] **Step 6: Create src/data/letter.ts**

```ts
// Lines array lets us sync each line with the audio if/when carta-danilo.mp3 exists.
// startSeconds is an offset into the audio; if no audio, lines appear sequentially
// at a reading pace controlled by LETTER_READ_PACE_MS_PER_CHAR.

export type LetterLine = {
  text: string;
  startSeconds?: number;
};

export const LETTER_READ_PACE_MS_PER_CHAR = 45; // ~180 chars/min feels right for emotional reading
export const LETTER_AUDIO_PATH = '/audio/voz/carta-danilo.mp3';

export const letterSalutation = 'Flor,';
export const letterSignature = 'Danilo';

export const letterParagraphs: LetterLine[] = [
  { text: 'Este regalo no alcanza para decir todo lo que tengo que decirte, pero es un comienzo.' },
  { text: 'Durante muchos años vi tus cuidados como si fueran parte normal de la vida. La comida lista, la ropa limpia, la casa funcionando, tu preocupación, tus llamadas, tus preguntas, tu forma de estar pendiente.' },
  { text: 'Hoy entiendo que nada de eso era automático. Todo eso eras tú. Tu amor. Tu fuerza. Tu manera de sostenernos.' },
  { text: 'Yo no siempre he sabido cuidarte como tú me cuidaste. No siempre he sido paciente. No siempre he sido justo. A veces te hablé mal, a veces me alejé, a veces no valoré lo suficiente tenerte cerca.' },
  { text: 'Pero ahora lo veo con más claridad. Cuando me sentí perdido, tú estuviste. Cuando me caí, tú estuviste. Cuando me pasó algo malo, tú estuviste. Cuando necesitaba volver a algún lugar seguro, tú seguías ahí.' },
  { text: 'Gracias por ser mi mamá. Gracias por tu comida, por tu preocupación, por tu forma de querer, por tu paciencia, por tu carácter, por tus canciones, por tus enojos justos, por tu manera de cuidar incluso cuando nadie te lo pide.' },
  { text: 'Gracias por haber estado incluso cuando yo no supe estar.' },
  { text: 'Te quiero mucho.' },
];
```

- [ ] **Step 7: Create src/data/family.ts**

```ts
export type FamilyMember = {
  id: 'papa' | 'eloy' | 'julia';
  name: string;
  relation: string;
  photoPath: string;
  candleLabel: string;
  candleLine: string; // shown when tapping the candle
  isCentral?: boolean; // papá (central, slightly bigger)
  videoPath?: string; // only papá
};

export const familyMembers: FamilyMember[] = [
  {
    id: 'eloy',
    name: 'Eloy',
    relation: 'Tu papá',
    photoPath: '/photos/abuelos/eloy-01.jpg',
    candleLabel: 'Eloy',
    candleLine: 'Te diste cuenta de ser una mujer fuerte porque tu papá lo era.',
  },
  {
    id: 'papa',
    name: 'Papá',
    relation: 'Tu esposo',
    photoPath: '/photos/papa/papa-01.jpg',
    candleLabel: 'Papá',
    candleLine: 'Gracias por todo lo que construiste con él, mamá.',
    isCentral: true,
    videoPath: '/video/papa-recuerdo.mp4',
  },
  {
    id: 'julia',
    name: 'Julia',
    relation: 'Tu mamá',
    photoPath: '/photos/abuelos/julia-01.jpg',
    candleLabel: 'Julia',
    candleLine: 'Cada vez que cuidas, te pareces a tu mamá.',
  },
];

export const familyRoomQuote =
  'Hay personas que no se van del todo. Se quedan en la forma de amar que te dejaron.';
```

- [ ] **Step 8: Create src/data/photos.ts**

```ts
export type RoomPhoto = {
  path: string;
  caption?: string;
};

export const roomPhotos: Record<string, RoomPhoto[]> = {
  pasaje: [
    { path: '/photos/pasaje/pasaje-01.jpg', caption: 'Pasaje, El Oro.' },
  ],
  patio: [
    { path: '/photos/perritos/fido-01.jpg', caption: 'Fido.' },
    { path: '/photos/perritos/lila-01.jpg', caption: 'Lila.' },
  ],
  // Other rooms don't use photos directly; they use family photos via family.ts
};
```

- [ ] **Step 9: Commit**

```bash
git add src/data
git commit -m "feat: data layer with all rooms, memories, letter, family, coupons

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 4: Build Zustand store with persist middleware (house state)

**Files:**
- Create: `src/hooks/useHouseStore.ts`
- Create: `src/hooks/__tests__/useHouseStore.test.ts`

- [ ] **Step 1: Write the failing test**

`src/hooks/__tests__/useHouseStore.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useHouseStore } from '../useHouseStore';

describe('useHouseStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useHouseStore.getState().reset();
  });

  it('starts with no visited rooms and firstVisit=true', () => {
    const { result } = renderHook(() => useHouseStore());
    expect(Array.from(result.current.visitedRooms)).toEqual([]);
    expect(result.current.firstVisit).toBe(true);
    expect(result.current.audioEnabled).toBe(true);
  });

  it('visitRoom adds slug and deduplicates', () => {
    const { result } = renderHook(() => useHouseStore());
    act(() => {
      result.current.visitRoom('cocina');
      result.current.visitRoom('cocina');
      result.current.visitRoom('patio');
    });
    expect(result.current.visitedRooms.has('cocina')).toBe(true);
    expect(result.current.visitedRooms.has('patio')).toBe(true);
    expect(result.current.visitedRooms.size).toBe(2);
  });

  it('firstVisit becomes false after visiting 6 non-buzon rooms', () => {
    const { result } = renderHook(() => useHouseStore());
    act(() => {
      ['puerta', 'pasaje', 'cocina', 'patio', 'musica', 'familia'].forEach((s) =>
        result.current.visitRoom(s as any),
      );
    });
    expect(result.current.firstVisit).toBe(false);
  });

  it('toggleAudio flips audioEnabled', () => {
    const { result } = renderHook(() => useHouseStore());
    act(() => result.current.toggleAudio());
    expect(result.current.audioEnabled).toBe(false);
    act(() => result.current.toggleAudio());
    expect(result.current.audioEnabled).toBe(true);
  });

  it('saveCoupon and hasOpenedLetter work', () => {
    const { result } = renderHook(() => useHouseStore());
    act(() => {
      result.current.saveCoupon('masaje');
      result.current.markLetterOpened();
    });
    expect(result.current.savedCoupons).toContain('masaje');
    expect(result.current.hasOpenedLetter).toBe(true);
  });
});
```

- [ ] **Step 2: Verify test fails**

```bash
pnpm test src/hooks/__tests__/useHouseStore.test.ts
```

Expected: FAIL, `Cannot find module '../useHouseStore'`.

- [ ] **Step 3: Implement store**

`src/hooks/useHouseStore.ts`:

```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { VISITABLE_ROOMS_FOR_BUZON_UNLOCK, type RoomSlug } from '@/data/rooms';

type HouseState = {
  visitedRooms: Set<string>;
  firstVisit: boolean;
  audioEnabled: boolean;
  savedCoupons: string[];
  hasOpenedLetter: boolean;
};

type HouseActions = {
  visitRoom: (slug: RoomSlug) => void;
  toggleAudio: () => void;
  saveCoupon: (id: string) => void;
  markLetterOpened: () => void;
  reset: () => void;
};

const initialState: HouseState = {
  visitedRooms: new Set(),
  firstVisit: true,
  audioEnabled: true,
  savedCoupons: [],
  hasOpenedLetter: false,
};

export const useHouseStore = create<HouseState & HouseActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      visitRoom: (slug) =>
        set((s) => {
          const next = new Set(s.visitedRooms);
          next.add(slug);
          const nonBuzon = [...next].filter((r) => r !== 'buzon');
          return {
            visitedRooms: next,
            firstVisit: nonBuzon.length < VISITABLE_ROOMS_FOR_BUZON_UNLOCK,
          };
        }),
      toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
      saveCoupon: (id) =>
        set((s) => ({
          savedCoupons: s.savedCoupons.includes(id) ? s.savedCoupons : [...s.savedCoupons, id],
        })),
      markLetterOpened: () => set({ hasOpenedLetter: true }),
      reset: () => set(initialState),
    }),
    {
      name: 'flor-casa-v1',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? window.localStorage : undefined as any)),
      partialize: (state) => ({
        ...state,
        visitedRooms: Array.from(state.visitedRooms),
      }),
      merge: (persistedState, currentState) => {
        const p = persistedState as Partial<HouseState> & { visitedRooms?: string[] | Set<string> };
        return {
          ...currentState,
          ...p,
          visitedRooms:
            p?.visitedRooms instanceof Set
              ? p.visitedRooms
              : new Set(Array.isArray(p?.visitedRooms) ? p.visitedRooms : []),
        } as HouseState & HouseActions;
      },
    },
  ),
);
```

- [ ] **Step 4: Run tests**

```bash
pnpm test src/hooks/__tests__/useHouseStore.test.ts
```

Expected: PASS all 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/hooks src/data
git commit -m "feat: Zustand house store with persist (visited rooms, audio, coupons)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 5: Build useMediaExists hook

**Files:**
- Create: `src/hooks/useMediaExists.ts`
- Create: `src/hooks/__tests__/useMediaExists.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMediaExists } from '../useMediaExists';

describe('useMediaExists', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns null then true when HEAD returns 200', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, status: 200 } as Response);
    const { result } = renderHook(() => useMediaExists('/foo.mp3'));
    expect(result.current).toBe(null);
    await waitFor(() => expect(result.current).toBe(true));
  });

  it('returns false when HEAD returns 404', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 } as Response);
    const { result } = renderHook(() => useMediaExists('/missing.mp3'));
    await waitFor(() => expect(result.current).toBe(false));
  });

  it('returns false when fetch throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('network'));
    const { result } = renderHook(() => useMediaExists('/error.mp3'));
    await waitFor(() => expect(result.current).toBe(false));
  });
});
```

- [ ] **Step 2: Verify test fails**

```bash
pnpm test src/hooks/__tests__/useMediaExists.test.ts
```

Expected: FAIL, module not found.

- [ ] **Step 3: Implement**

`src/hooks/useMediaExists.ts`:

```ts
'use client';

import { useEffect, useState } from 'react';

const cache = new Map<string, boolean>();

export function useMediaExists(path: string | undefined | null): boolean | null {
  const [exists, setExists] = useState<boolean | null>(
    path && cache.has(path) ? (cache.get(path) as boolean) : null,
  );

  useEffect(() => {
    if (!path) {
      setExists(false);
      return;
    }
    if (cache.has(path)) {
      setExists(cache.get(path) as boolean);
      return;
    }
    let cancelled = false;
    fetch(path, { method: 'HEAD' })
      .then((res) => {
        const ok = res.ok;
        cache.set(path, ok);
        if (!cancelled) setExists(ok);
      })
      .catch(() => {
        cache.set(path, false);
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return exists;
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm test src/hooks/__tests__/useMediaExists.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks
git commit -m "feat: useMediaExists hook with in-memory cache

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 6: Build AudioEngine (dual-element cross-fade)

**Files:**
- Create: `src/components/AudioEngine.tsx`
- Create: `src/components/__tests__/AudioEngine.test.tsx`

- [ ] **Step 1: Write a test for the player mounting with two audio elements**

```tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { AudioEngine } from '../AudioEngine';

describe('AudioEngine', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders two audio elements', () => {
    const { container } = render(<AudioEngine currentRoomSlug="puerta" enabled={true} />);
    const audios = container.querySelectorAll('audio');
    expect(audios.length).toBe(2);
  });

  it('does not throw when enabled=false', () => {
    expect(() =>
      render(<AudioEngine currentRoomSlug="pasaje" enabled={false} />),
    ).not.toThrow();
  });
});
```

- [ ] **Step 2: Implement AudioEngine**

`src/components/AudioEngine.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { roomsBySlug, type RoomSlug } from '@/data/rooms';

type Props = {
  currentRoomSlug: RoomSlug | null;
  enabled: boolean;
  duckingFactor?: number; // when duck is true, multiply volume by this
  duck?: boolean;
};

const DEFAULT_VOLUME = 0.6;
const FADE_MS = 1500;
const FADE_STEPS = 30;

async function fadeVolume(audio: HTMLAudioElement, from: number, to: number, ms: number) {
  const step = (to - from) / FADE_STEPS;
  const interval = ms / FADE_STEPS;
  return new Promise<void>((resolve) => {
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      audio.volume = Math.max(0, Math.min(1, from + step * i));
      if (i >= FADE_STEPS) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });
}

export function AudioEngine({ currentRoomSlug, enabled, duckingFactor = 0.2, duck = false }: Props) {
  const audioARef = useRef<HTMLAudioElement | null>(null);
  const audioBRef = useRef<HTMLAudioElement | null>(null);
  const activeRef = useRef<'A' | 'B'>('A');
  const lastSlugRef = useRef<RoomSlug | null>(null);

  // Swap tracks on room change
  useEffect(() => {
    if (!currentRoomSlug) return;
    if (currentRoomSlug === lastSlugRef.current) return;
    const room = roomsBySlug[currentRoomSlug];
    if (!room) return;
    const nextSrc = room.ambientMp3;

    const active = activeRef.current === 'A' ? audioARef.current : audioBRef.current;
    const inactive = activeRef.current === 'A' ? audioBRef.current : audioARef.current;
    if (!inactive) return;

    inactive.src = nextSrc;
    inactive.loop = true;
    inactive.volume = 0;
    const playPromise = inactive.play().catch(() => {
      // ignore (autoplay blocked or file missing)
    });

    const target = enabled ? (duck ? DEFAULT_VOLUME * duckingFactor : DEFAULT_VOLUME) : 0;
    Promise.resolve(playPromise).then(() => {
      fadeVolume(inactive, 0, target, FADE_MS);
      if (active) {
        fadeVolume(active, active.volume, 0, FADE_MS).then(() => {
          active.pause();
          active.src = '';
        });
      }
      activeRef.current = activeRef.current === 'A' ? 'B' : 'A';
      lastSlugRef.current = currentRoomSlug;
    });
  }, [currentRoomSlug, enabled, duck, duckingFactor]);

  // React to enabled toggle
  useEffect(() => {
    const active = activeRef.current === 'A' ? audioARef.current : audioBRef.current;
    if (!active) return;
    const target = enabled ? (duck ? DEFAULT_VOLUME * duckingFactor : DEFAULT_VOLUME) : 0;
    fadeVolume(active, active.volume, target, 500);
  }, [enabled, duck, duckingFactor]);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden' }}>
      <audio ref={audioARef} preload="none" />
      <audio ref={audioBRef} preload="none" />
    </div>
  );
}
```

- [ ] **Step 3: Run tests**

```bash
pnpm test src/components/__tests__/AudioEngine.test.tsx
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components
git commit -m "feat: AudioEngine with dual-element cross-fade and duck

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 7: Build AudioToggle, BackToHouse, AppShell

**Files:**
- Create: `src/components/AudioToggle.tsx`
- Create: `src/components/BackToHouse.tsx`
- Create: `src/components/AppShell.tsx`

- [ ] **Step 1: Build AudioToggle**

`src/components/AudioToggle.tsx`:

```tsx
'use client';

import { useHouseStore } from '@/hooks/useHouseStore';

export function AudioToggle() {
  const enabled = useHouseStore((s) => s.audioEnabled);
  const toggle = useHouseStore((s) => s.toggleAudio);
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Silenciar' : 'Activar sonido'}
      className="fixed top-4 right-4 z-50 w-14 h-14 rounded-full bg-surface/90 backdrop-blur shadow-lg flex items-center justify-center text-2xl hover:scale-105 active:scale-95 transition-transform"
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
```

- [ ] **Step 2: Build BackToHouse**

`src/components/BackToHouse.tsx`:

```tsx
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
```

- [ ] **Step 3: Build AppShell**

`src/components/AppShell.tsx`:

```tsx
'use client';

import { useHouseStore } from '@/hooks/useHouseStore';
import { AudioEngine } from './AudioEngine';
import { AudioToggle } from './AudioToggle';
import { BackToHouse } from './BackToHouse';
import type { RoomSlug } from '@/data/rooms';
import { roomsBySlug } from '@/data/rooms';

type Props = {
  currentRoomSlug?: RoomSlug | null;
  showBack?: boolean;
  duck?: boolean;
  children: React.ReactNode;
};

export function AppShell({ currentRoomSlug = null, showBack = true, duck = false, children }: Props) {
  const enabled = useHouseStore((s) => s.audioEnabled);
  const isNight = currentRoomSlug ? roomsBySlug[currentRoomSlug]?.isNight : false;

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ${
        isNight ? 'bg-night text-paper' : 'bg-background text-deep-brown'
      }`}
    >
      <AudioEngine currentRoomSlug={currentRoomSlug} enabled={enabled} duck={duck} />
      {showBack && <BackToHouse variant={isNight ? 'night' : 'default'} />}
      <AudioToggle />
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components
git commit -m "feat: AppShell + AudioToggle + BackToHouse

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 8: Build house map page (plano) + router logic

**Files:**
- Create: `src/app/page.tsx` (replace placeholder)
- Create: `src/components/HouseMap.tsx`
- Create: `src/components/PuertaIntro.tsx`

- [ ] **Step 1: Build PuertaIntro (first-visit gate)**

`src/components/PuertaIntro.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useHouseStore } from '@/hooks/useHouseStore';
import { flor } from '@/data/flor';

export function PuertaIntro() {
  const router = useRouter();
  const visitRoom = useHouseStore((s) => s.visitRoom);

  const handleStart = () => {
    visitRoom('puerta');
    // Router push kicks first real navigation — iPad Safari will allow audio from here.
    router.push('/cuarto/pasaje');
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Sunset gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,#ffd28a_0%,#e9783f_35%,#c04a2a_70%,#3b2515_100%)]" />
      {/* Leaves */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 bottom-0 w-[28rem] h-[28rem] bg-[radial-gradient(circle,#1e3620_0%,rgba(30,54,32,0)_70%)]" />
        <div className="absolute -right-10 bottom-0 w-[28rem] h-[28rem] bg-[radial-gradient(circle,#1e3620_0%,rgba(30,54,32,0)_70%)]" />
      </div>
      {/* Sun */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[30%] w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle,#fff3c4 0%,#ffd28a 55%,rgba(255,210,138,0) 100%)',
          filter: 'blur(2px)',
        }}
        animate={{ y: [0, -6, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-serif text-5xl md:text-7xl italic text-paper drop-shadow-lg"
        >
          {flor.firstName}, hoy te toca recibir.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-paper/90 text-lg md:text-xl"
        >
          Un lugar para ti, hecho por tu hijo Danilo.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          onClick={handleStart}
          className="mt-14 px-8 py-4 rounded-full bg-paper text-deep-brown font-serif text-xl shadow-xl hover:scale-105 active:scale-95 transition-transform"
        >
          Empezar tu regalo
        </motion.button>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Build HouseMap**

`src/components/HouseMap.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { rooms } from '@/data/rooms';
import { useHouseStore } from '@/hooks/useHouseStore';
import { flor } from '@/data/flor';

export function HouseMap() {
  const visited = useHouseStore((s) => s.visitedRooms);

  const nonPuerta = rooms.filter((r) => r.slug !== 'puerta' && r.slug !== 'buzon');
  const buzon = rooms.find((r) => r.slug === 'buzon')!;

  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-deep-brown">
            La casa de {flor.firstName}
          </h1>
          <p className="mt-3 text-muted-text text-lg">Toca un cuarto para entrar.</p>
        </motion.header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {nonPuerta.map((room, idx) => {
            const isVisited = visited.has(room.slug);
            const isNight = room.isNight;
            return (
              <motion.div
                key={room.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <Link
                  href={`/cuarto/${room.slug}`}
                  className={`block p-6 md:p-8 rounded-2xl border-2 border-dashed transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[160px] ${
                    isNight
                      ? 'bg-gradient-to-b from-night to-[#0e121c] border-gold text-paper'
                      : 'bg-surface border-cacao/60 text-deep-brown'
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-serif font-semibold ${
                      isNight ? 'bg-paper text-night' : 'bg-gold text-surface'
                    }`}
                  >
                    {room.order}
                  </div>
                  <h2 className="mt-3 font-serif text-xl md:text-2xl">{room.title}</h2>
                  <p className={`mt-1 text-sm ${isNight ? 'text-paper/70' : 'text-muted-text'}`}>
                    {room.subtitle}
                  </p>
                  {isVisited && (
                    <span
                      className={`mt-3 inline-block text-xs uppercase tracking-wider ${
                        isNight ? 'text-gold' : 'text-gold'
                      }`}
                    >
                      ✓ Ya entraste aquí
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 md:mt-8"
        >
          <Link
            href={`/cuarto/${buzon.slug}`}
            className="block p-6 md:p-8 rounded-2xl bg-gradient-to-b from-paper to-[#e9c068] border-2 border-gold text-deep-brown hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-deep-brown text-paper font-serif font-semibold flex items-center justify-center text-xl">
                {buzon.order}
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl">{buzon.title}</h2>
                <p className="text-muted-text mt-1">{buzon.subtitle}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Replace src/app/page.tsx**

```tsx
'use client';

import { useHouseStore } from '@/hooks/useHouseStore';
import { PuertaIntro } from '@/components/PuertaIntro';
import { HouseMap } from '@/components/HouseMap';
import { AppShell } from '@/components/AppShell';

export default function HomePage() {
  const hasVisitedPuerta = useHouseStore((s) => s.visitedRooms.has('puerta'));

  if (!hasVisitedPuerta) {
    return <PuertaIntro />;
  }

  return (
    <AppShell currentRoomSlug={null} showBack={false}>
      <HouseMap />
    </AppShell>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat: PuertaIntro + HouseMap + router entry

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 9: Build dynamic room route + RoomLayout

**Files:**
- Create: `src/app/cuarto/[slug]/page.tsx`
- Create: `src/components/RoomLayout.tsx`
- Create: `src/components/NextRoomHint.tsx`

- [ ] **Step 1: Create RoomLayout**

`src/components/RoomLayout.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { type Room } from '@/data/rooms';

type Props = {
  room: Room;
  children: React.ReactNode;
};

export function RoomLayout({ room, children }: Props) {
  return (
    <motion.main
      key={room.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full"
    >
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        <header className="text-center mb-8">
          <p className={`font-serif italic text-sm ${room.isNight ? 'text-paper/70' : 'text-muted-text'}`}>
            Cuarto {room.order}
          </p>
          <h1 className={`font-serif text-4xl md:text-5xl mt-1 ${room.isNight ? 'text-paper' : 'text-deep-brown'}`}>
            {room.title}
          </h1>
          {room.subtitle && (
            <p className={`mt-3 text-lg ${room.isNight ? 'text-paper/70' : 'text-muted-text'}`}>
              {room.subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </motion.main>
  );
}
```

- [ ] **Step 2: Create dynamic route**

`src/app/cuarto/[slug]/page.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useHouseStore } from '@/hooks/useHouseStore';
import { AppShell } from '@/components/AppShell';
import { RoomLayout } from '@/components/RoomLayout';
import { roomsBySlug, type RoomSlug } from '@/data/rooms';
import { PasajeRoom } from '@/components/rooms/PasajeRoom';
import { CocinaRoom } from '@/components/rooms/CocinaRoom';
import { PatioRoom } from '@/components/rooms/PatioRoom';
import { MusicaRoom } from '@/components/rooms/MusicaRoom';
import { FamiliaRoom } from '@/components/rooms/FamiliaRoom';
import { BuzonRoom } from '@/components/rooms/BuzonRoom';

const KNOWN_SLUGS: RoomSlug[] = ['pasaje', 'cocina', 'patio', 'musica', 'familia', 'buzon'];

export default function RoomPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as RoomSlug;
  const room = roomsBySlug[slug];
  const visitRoom = useHouseStore((s) => s.visitRoom);

  useEffect(() => {
    if (room) visitRoom(slug);
  }, [slug, visitRoom, room]);

  if (!room || !KNOWN_SLUGS.includes(slug)) notFound();

  return (
    <AppShell currentRoomSlug={slug}>
      <RoomLayout room={room}>
        {slug === 'pasaje' && <PasajeRoom />}
        {slug === 'cocina' && <CocinaRoom />}
        {slug === 'patio' && <PatioRoom />}
        {slug === 'musica' && <MusicaRoom />}
        {slug === 'familia' && <FamiliaRoom />}
        {slug === 'buzon' && <BuzonRoom />}
      </RoomLayout>
    </AppShell>
  );
}
```

- [ ] **Step 3: Create stub files for all room components (filled in later tasks)**

For each of `PasajeRoom`, `CocinaRoom`, `PatioRoom`, `MusicaRoom`, `FamiliaRoom`, `BuzonRoom`, create `src/components/rooms/{Name}.tsx`:

```tsx
'use client';

export function PasajeRoom() {
  return <div className="text-center py-12 text-muted-text">Por construir.</div>;
}
```

(Repeat for each, changing the component name.)

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat: dynamic room route + room stubs

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 10: Build Cuarto 2 — Pasaje

**Files:**
- Modify: `src/components/rooms/PasajeRoom.tsx`
- Create: `src/components/shared/SafeImage.tsx`

- [ ] **Step 1: Build SafeImage (graceful fallback)**

`src/components/shared/SafeImage.tsx`:

```tsx
'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type Props = Omit<ImageProps, 'onError'> & {
  fallback?: React.ReactNode;
};

export function SafeImage({ fallback = null, ...props }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <Image {...props} onError={() => setFailed(true)} />;
}
```

- [ ] **Step 2: Build PasajeRoom**

`src/components/rooms/PasajeRoom.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { SafeImage } from '@/components/shared/SafeImage';
import { roomPhotos } from '@/data/photos';
import { useState } from 'react';

export function PasajeRoom() {
  const [revealed, setRevealed] = useState(false);
  const photo = roomPhotos.pasaje?.[0];

  return (
    <div className="flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-serif italic text-2xl md:text-3xl text-deep-brown text-center max-w-2xl"
      >
        Aquí aprendiste a querer así de fuerte.
      </motion.p>

      <motion.button
        onClick={() => setRevealed(true)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 relative overflow-hidden rounded-2xl shadow-2xl border-4 border-paper"
        aria-label="Ver Pasaje"
      >
        <div className="relative w-[min(86vw,640px)] aspect-[4/3] bg-gradient-to-b from-[#ffd28a] to-[#c04a2a]">
          <SafeImage
            src="/photos/pasaje/pasaje-01.jpg"
            alt={photo?.caption ?? 'Pasaje, El Oro'}
            fill
            priority
            sizes="(max-width: 768px) 86vw, 640px"
            className="object-cover"
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-serif text-paper text-3xl italic">Pasaje</p>
              </div>
            }
          />
        </div>
      </motion.button>

      {revealed && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 font-serif italic text-xl text-muted-text max-w-2xl text-center"
        >
          Cada vez que nos cuidas, la costa de El Oro vuelve a casa con nosotros.
        </motion.p>
      )}

      <p className="mt-10 text-sm text-muted-text">Pasaje, El Oro · donde empezó Flor.</p>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src
git commit -m "feat(cuarto 2): Pasaje with SafeImage and revealable line

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 11: Build Cuarto 3 — Cocina (5 memories)

**Files:**
- Modify: `src/components/rooms/CocinaRoom.tsx`
- Create: `src/components/shared/MemoryModal.tsx`
- Create: `src/components/room-parts/KitchenScene.tsx`

- [ ] **Step 1: Create MemoryModal**

`src/components/shared/MemoryModal.tsx`:

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  open: boolean;
  title: string;
  body: string;
  onClose: () => void;
  variant?: 'default' | 'bridge';
};

export function MemoryModal({ open, title, body, onClose, variant = 'default' }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-deep-brown/50 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative rounded-2xl p-8 md:p-10 max-w-xl w-full shadow-2xl ${
              variant === 'bridge'
                ? 'bg-gradient-to-b from-surface to-cushion-cream border-2 border-cushion-cream'
                : 'bg-surface'
            }`}
          >
            <h3 className="font-serif text-3xl text-deep-brown">{title}</h3>
            <div className="mt-5 text-lg leading-relaxed whitespace-pre-line text-deep-brown/85">
              {body}
            </div>
            <button
              onClick={onClose}
              className="mt-8 w-full py-3 rounded-full bg-deep-brown text-paper font-serif text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create KitchenScene (SVG illustration with 5 tap targets)**

`src/components/room-parts/KitchenScene.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { kitchenMemories } from '@/data/kitchen-memories';

type Props = {
  onSelect: (id: string) => void;
};

const OBJECT_POSITIONS: Record<string, { x: number; y: number; label: string }> = {
  olla:         { x: 18,  y: 62, label: 'Olla' },
  mesa:         { x: 48,  y: 74, label: 'Mesa' },
  'olla-grande':{ x: 30,  y: 40, label: 'Olla grande' },
  ventana:      { x: 72,  y: 30, label: 'Ventana' },
  mecedora:     { x: 82,  y: 66, label: 'Mecedora' },
};

export function KitchenScene({ onSelect }: Props) {
  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-paper to-[#e8d9b8] shadow-xl">
      {/* SVG floor/walls */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <rect x="0" y="0" width="400" height="180" fill="#F7E6C8" />
        <rect x="0" y="180" width="400" height="120" fill="#E8D9B8" />
        <rect x="270" y="50" width="70" height="70" rx="4" fill="#BFD7EA" stroke="#5A3A24" strokeWidth="2" />
        <line x1="305" y1="50" x2="305" y2="120" stroke="#5A3A24" strokeWidth="2" />
        <line x1="270" y1="85" x2="340" y2="85" stroke="#5A3A24" strokeWidth="2" />
      </svg>

      {/* Object tap targets */}
      {kitchenMemories.map((m, idx) => {
        const pos = OBJECT_POSITIONS[m.id];
        if (!pos) return null;
        return (
          <motion.button
            key={m.id}
            onClick={() => onSelect(m.id)}
            aria-label={pos.label}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              boxShadow: [
                '0 0 0 0 rgba(217,164,65,0)',
                '0 0 0 14px rgba(217,164,65,0.28)',
                '0 0 0 0 rgba(217,164,65,0)',
              ],
            }}
            transition={{
              opacity: { delay: idx * 0.08, duration: 0.5 },
              boxShadow: { delay: idx * 1.2, duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-surface border-2 border-gold flex flex-col items-center justify-center text-sm font-serif text-deep-brown"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <IconFor id={m.id} />
            <span className="text-xs mt-1">{pos.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function IconFor({ id }: { id: string }) {
  switch (id) {
    case 'olla':         return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9h18l-2 10H5L3 9z" /><path d="M6 9V7h12v2" /></svg>;
    case 'mesa':         return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10h18" /><path d="M6 10v10M18 10v10M3 6h18l-1.5 4H4.5L3 6z"/></svg>;
    case 'olla-grande':  return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 8h20l-3 12H5L2 8z"/><path d="M5 8V6h14v2"/><path d="M10 13q2 1 4 0" /></svg>;
    case 'ventana':      return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M12 4v16M4 12h16"/></svg>;
    case 'mecedora':     return <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 14h14" /><path d="M7 14l2-8h6l2 8"/><path d="M4 18q8 3 16 0" /></svg>;
    default: return null;
  }
}
```

- [ ] **Step 3: Build CocinaRoom**

`src/components/rooms/CocinaRoom.tsx`:

```tsx
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
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat(cuarto 3): Cocina with 5 tappable memories

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 12: Build Cuarto 4 — Patio (jardín + perritos)

**Files:**
- Modify: `src/components/rooms/PatioRoom.tsx`
- Create: `src/components/room-parts/Garden.tsx`
- Create: `src/components/room-parts/Perritos.tsx`

- [ ] **Step 1: Create Garden (tap-to-grow flowers)**

`src/components/room-parts/Garden.tsx`:

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Flower = { id: number; x: number; y: number; hue: number };

export function Garden() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [nextId, setNextId] = useState(0);

  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const target = e.currentTarget.getBoundingClientRect();
    let clientX = 0, clientY = 0;
    if ('touches' in e && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX; clientY = e.clientY;
    }
    const x = ((clientX - target.left) / target.width) * 100;
    const y = ((clientY - target.top) / target.height) * 100;
    const id = nextId;
    setNextId((n) => n + 1);
    const hue = Math.floor(Math.random() * 360);
    setFlowers((fs) => [...fs.slice(-40), { id, x, y, hue }]);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Jardín — toca para que crezcan flores"
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const id = nextId; setNextId((n) => n + 1);
          setFlowers((fs) => [...fs.slice(-40), { id, x: 50, y: 50, hue: Math.random() * 360 }]);
        }
      }}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer select-none bg-gradient-to-b from-[#a8c6df] via-[#c8d7a8] to-[#6c8b5f]"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#5a7a3f] to-transparent pointer-events-none" />
      <AnimatePresence>
        {flowers.map((f) => (
          <motion.div
            key={f.id}
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 18 }}
            className="absolute pointer-events-none"
            style={{ left: `${f.x}%`, top: `${f.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow">
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse
                  key={a}
                  cx="20" cy="12" rx="5" ry="8"
                  fill={`hsl(${f.hue}, 75%, 70%)`}
                  transform={`rotate(${a} 20 20)`}
                />
              ))}
              <circle cx="20" cy="20" r="3.5" fill={`hsl(${(f.hue + 30) % 360}, 85%, 60%)`} />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
      <p className="absolute top-3 left-4 text-deep-brown/60 font-serif text-sm md:text-base pointer-events-none">
        Toca la tierra. Deja que florezca.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create Perritos**

`src/components/room-parts/Perritos.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { SafeImage } from '@/components/shared/SafeImage';

const PERRITOS = [
  { id: 'fido', name: 'Fido', src: '/photos/perritos/fido-01.jpg' },
  { id: 'lila', name: 'Lila', src: '/photos/perritos/lila-01.jpg' },
];

export function Perritos() {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      {PERRITOS.map((p) => (
        <motion.div
          key={p.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative aspect-square rounded-2xl overflow-hidden border-4 border-paper shadow-xl bg-cushion-cream"
        >
          <SafeImage
            src={p.src}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 45vw, 320px"
            className="object-cover"
            fallback={
              <div className="absolute inset-0 flex items-center justify-center text-7xl">
                {p.id === 'fido' ? '🐕' : '🐩'}
              </div>
            }
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-brown/80 to-transparent p-3">
            <p className="text-paper font-serif text-xl">{p.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Build PatioRoom**

`src/components/rooms/PatioRoom.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Garden } from '@/components/room-parts/Garden';
import { Perritos } from '@/components/room-parts/Perritos';

export function PatioRoom() {
  const [hearts, setHearts] = useState<number[]>([]);

  const rainHearts = () => {
    const ids = Array.from({ length: 18 }, (_, i) => Date.now() + i);
    setHearts((h) => [...h, ...ids]);
    setTimeout(() => setHearts((h) => h.filter((id) => !ids.includes(id))), 4000);
  };

  return (
    <div className="space-y-8">
      <Garden />

      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-deep-brown text-center mb-4">
          Fido y Lila
        </h2>
        <Perritos />

        <div className="text-center mt-6">
          <button
            onClick={rainHearts}
            className="px-6 py-3 rounded-full bg-coral text-paper font-serif text-lg shadow hover:scale-105 active:scale-95 transition-transform"
          >
            Darle cariño a Fido y Lila
          </button>
        </div>
      </div>

      {/* Hearts overlay */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <AnimatePresence>
          {hearts.map((id) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 1.5;
            return (
              <motion.span
                key={id}
                initial={{ y: '100vh', opacity: 1, scale: 1 }}
                animate={{ y: '-10vh', opacity: 0, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, delay, ease: 'easeOut' }}
                className="absolute text-3xl md:text-4xl"
                style={{ left: `${left}%` }}
              >
                ❤️
              </motion.span>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat(cuarto 4): Patio with Garden + Perritos + hearts

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 13: Build Cuarto 5 — Sala de música (tocadiscos)

**Files:**
- Modify: `src/components/rooms/MusicaRoom.tsx`
- Create: `src/components/room-parts/RecordPlayer.tsx`

- [ ] **Step 1: Create RecordPlayer**

`src/components/room-parts/RecordPlayer.tsx`:

```tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { songs, type Song } from '@/data/music';
import { useMediaExists } from '@/hooks/useMediaExists';

export function RecordPlayer({
  onPlayStateChange,
}: {
  onPlayStateChange?: (playing: boolean) => void;
}) {
  const [current, setCurrent] = useState<Song | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rotate = useAnimation();

  useEffect(() => {
    if (playing) {
      rotate.start({ rotate: 360, transition: { repeat: Infinity, duration: 4, ease: 'linear' } });
    } else {
      rotate.stop();
    }
    onPlayStateChange?.(playing);
  }, [playing, rotate, onPlayStateChange]);

  const select = (song: Song) => {
    if (!audioRef.current) return;
    if (current?.id === song.id && playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    setCurrent(song);
    audioRef.current.src = song.file;
    audioRef.current.volume = 0.9;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const stop = () => setPlaying(false);
    el.addEventListener('ended', stop);
    el.addEventListener('pause', stop);
    return () => {
      el.removeEventListener('ended', stop);
      el.removeEventListener('pause', stop);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative bg-gradient-to-b from-[#3b2a1a] to-[#1e150d] rounded-2xl p-8 md:p-12 shadow-2xl">
        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
          <motion.div
            animate={rotate}
            className="w-full h-full rounded-full bg-[radial-gradient(circle,#0a0a0a_0%,#1a1a1a_40%,#0a0a0a_60%,#222_100%)] shadow-inner relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold flex items-center justify-center">
                <p className="font-serif text-deep-brown text-xs md:text-sm text-center px-1">
                  {current?.title ?? 'Flor'}
                </p>
              </div>
            </div>
          </motion.div>
          {/* Tonearm */}
          <div
            className={`absolute -right-8 md:-right-12 top-4 origin-bottom-right transition-transform duration-700 ${
              playing ? 'rotate-[-18deg]' : 'rotate-[-40deg]'
            }`}
          >
            <div className="w-2 h-40 bg-gold rounded" />
            <div className="absolute bottom-0 left-0 w-6 h-3 bg-gold rounded" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {songs.map((s) => (
            <SleeveButton key={s.id} song={s} active={current?.id === s.id && playing} onClick={() => select(s)} />
          ))}
        </div>
      </div>
      <audio ref={audioRef} preload="none" />
    </div>
  );
}

function SleeveButton({ song, active, onClick }: { song: Song; active: boolean; onClick: () => void }) {
  const exists = useMediaExists(song.file);
  const disabled = exists === false;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-center p-3 transition ${
        active
          ? 'border-gold bg-gold/20 text-gold scale-105'
          : disabled
          ? 'border-paper/20 bg-paper/10 text-paper/40 cursor-not-allowed'
          : 'border-paper/40 bg-paper/10 text-paper hover:scale-105 active:scale-95'
      }`}
    >
      <p className="font-serif text-sm md:text-base">{song.title}</p>
      <p className="text-xs opacity-70 mt-1">{song.artist}</p>
      {disabled && <p className="absolute bottom-2 text-[10px] uppercase tracking-wider">Próximamente</p>}
    </button>
  );
}
```

- [ ] **Step 2: Build MusicaRoom**

`src/components/rooms/MusicaRoom.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useHouseStore } from '@/hooks/useHouseStore';
import { RecordPlayer } from '@/components/room-parts/RecordPlayer';

export function MusicaRoom() {
  const [songPlaying, setSongPlaying] = useState(false);
  const enabled = useHouseStore((s) => s.audioEnabled);
  // Ducking: we surface this to the AudioEngine via context... simpler approach here:
  // we just let the room music stay at normal volume; since the tocadiscos audio is louder
  // it will dominate. Full ducking would require lifting state to AppShell — keep it simple.
  void enabled;

  return (
    <div className="space-y-6">
      <p className="text-center text-muted-text max-w-xl mx-auto text-base md:text-lg">
        Toca una funda. Deja que la aguja haga el trabajo.
      </p>
      <RecordPlayer onPlayStateChange={setSongPlaying} />
      {songPlaying && (
        <p className="text-center text-sm text-muted-text italic">Sonando para ti.</p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src
git commit -m "feat(cuarto 5): Sala de música with spinning tocadiscos + 3 songs

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 14: Build Cuarto 6 — Los que siguen (ventana + velas)

**Files:**
- Modify: `src/components/rooms/FamiliaRoom.tsx`
- Create: `src/components/room-parts/Candle.tsx`
- Create: `src/components/room-parts/NightWindow.tsx`

- [ ] **Step 1: Create Candle**

`src/components/room-parts/Candle.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';

type Props = {
  label: string;
  active: boolean;
  size?: 'sm' | 'lg';
  onClick: () => void;
};

export function Candle({ label, active, size = 'sm', onClick }: Props) {
  const flameW = size === 'lg' ? 22 : 18;
  const flameH = size === 'lg' ? 32 : 26;
  const bodyH = size === 'lg' ? 80 : 60;
  return (
    <button
      onClick={onClick}
      aria-label={`Vela por ${label}`}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="relative" style={{ height: bodyH + flameH + 10 }}>
        <motion.div
          animate={{
            scaleY: [1, 1.1, 0.95, 1.08, 1],
            scaleX: [1, 0.95, 1.05, 0.98, 1],
            opacity: active ? 1 : 0.85,
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 -translate-x-1/2 origin-bottom"
          style={{ width: flameW, height: flameH, top: 0 }}
        >
          <svg viewBox="0 0 20 30" className="w-full h-full">
            <defs>
              <radialGradient id={`flame-${label}`} cx="0.5" cy="0.65" r="0.55">
                <stop offset="0%" stopColor="#fff4c0" />
                <stop offset="55%" stopColor="#f9b572" />
                <stop offset="100%" stopColor="#d9a441" />
              </radialGradient>
            </defs>
            <path d="M10 2 C 15 10, 16 20, 10 28 C 4 20, 5 10, 10 2 Z" fill={`url(#flame-${label})`} />
          </svg>
        </motion.div>
        <motion.div
          animate={{ opacity: active ? 0.8 : 0.3 }}
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#f9b572] blur-2xl pointer-events-none"
          style={{ width: flameW * 4, height: flameH * 3, top: -10 }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-sm bg-gradient-to-b from-[#f8e4ad] to-[#d4b97c] border border-[#b59664]"
          style={{ width: flameW - 2, height: bodyH, top: flameH + 6 }}
        />
      </div>
      <span className={`font-serif text-base ${active ? 'text-paper' : 'text-paper/70'}`}>{label}</span>
    </button>
  );
}
```

- [ ] **Step 2: Create NightWindow**

`src/components/room-parts/NightWindow.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';

export function NightWindow() {
  return (
    <div className="relative mx-auto w-full max-w-3xl aspect-[16/9] rounded-2xl overflow-hidden border-8 border-[#3b2a1a] shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e121c] via-[#1e2635] to-[#2a3348]" />
      <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {Array.from({ length: 60 }).map((_, i) => {
          const cx = Math.random() * 800;
          const cy = Math.random() * 450;
          const r = Math.random() * 1.4 + 0.3;
          return <circle key={i} cx={cx} cy={cy} r={r} fill="#fff8ef" opacity={Math.random() * 0.9} />;
        })}
      </svg>
      {/* Moon */}
      <motion.div
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[14%] top-[18%] w-20 h-20 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fef3c7,#d9a441)] shadow-[0_0_40px_rgba(217,164,65,0.45)]"
      />
      {/* Window crossbars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-[6px] -translate-x-1/2 bg-[#3b2a1a]/80" />
        <div className="absolute top-1/2 left-0 right-0 h-[6px] -translate-y-1/2 bg-[#3b2a1a]/80" />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Build FamiliaRoom**

`src/components/rooms/FamiliaRoom.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NightWindow } from '@/components/room-parts/NightWindow';
import { Candle } from '@/components/room-parts/Candle';
import { SafeImage } from '@/components/shared/SafeImage';
import { familyMembers, familyRoomQuote } from '@/data/family';
import { useMediaExists } from '@/hooks/useMediaExists';

export function FamiliaRoom() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = familyMembers.find((m) => m.id === activeId) ?? null;

  return (
    <div className="flex flex-col items-center gap-10">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="font-serif italic text-center text-xl md:text-2xl text-paper max-w-2xl"
      >
        {familyRoomQuote}
      </motion.p>

      <NightWindow />

      <div className="flex items-end gap-10 md:gap-16">
        {familyMembers.map((m) => (
          <div key={m.id} className="flex flex-col items-center gap-4">
            <Candle
              label={m.candleLabel}
              active={activeId === m.id}
              size={m.isCentral ? 'lg' : 'sm'}
              onClick={() => setActiveId((id) => (id === m.id ? null : m.id))}
            />
            <MemberPortrait memberId={m.id} photoPath={m.photoPath} label={m.name} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-surface/10 border border-paper/30 rounded-2xl p-6 max-w-xl text-center backdrop-blur"
          >
            <p className="font-serif text-xl md:text-2xl italic text-paper">{active.candleLine}</p>
            {active.id === 'papa' && active.videoPath && <PapaVideoButton path={active.videoPath} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MemberPortrait({ memberId, photoPath, label }: { memberId: string; photoPath: string; label: string }) {
  return (
    <div className="relative w-16 h-20 md:w-20 md:h-24 rounded-full overflow-hidden border-2 border-gold">
      <SafeImage
        src={photoPath}
        alt={label}
        fill
        sizes="80px"
        className="object-cover"
        fallback={<div className="w-full h-full bg-[#4a3b2b]" />}
      />
    </div>
  );
}

function PapaVideoButton({ path }: { path: string }) {
  const exists = useMediaExists(path);
  const [open, setOpen] = useState(false);
  if (!exists) return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 text-sm underline text-paper/80 hover:text-paper"
      >
        Ver recuerdo
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-night/90 backdrop-blur flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <video
              src={path}
              controls
              autoPlay
              className="max-w-4xl w-full rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat(cuarto 6): Los que siguen con ventana nocturna y 3 velas

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 15: Build Cuarto 7 — Buzón (sobre + carta + cupones)

**Files:**
- Modify: `src/components/rooms/BuzonRoom.tsx`
- Create: `src/components/room-parts/Envelope.tsx`
- Create: `src/components/room-parts/Letter.tsx`
- Create: `src/components/room-parts/CouponStack.tsx`
- Create: `src/components/shared/CouponCard.tsx`

- [ ] **Step 1: Create CouponCard**

`src/components/shared/CouponCard.tsx`:

```tsx
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
```

- [ ] **Step 2: Create CouponStack**

`src/components/room-parts/CouponStack.tsx`:

```tsx
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
```

- [ ] **Step 3: Create Envelope**

`src/components/room-parts/Envelope.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { flor } from '@/data/flor';

export function Envelope({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ scale: 1.02, rotate: -1 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-md aspect-[3/2] mx-auto rounded-sm overflow-hidden shadow-2xl bg-[#f7e6c8] border border-[#b5a076]"
      aria-label={`Abrir sobre para ${flor.fullName}`}
    >
      <svg viewBox="0 0 300 200" className="absolute inset-0 w-full h-full">
        <polygon points="0,0 150,90 300,0" fill="#e8d09e" stroke="#b5a076" strokeWidth="1" />
      </svg>
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-10 px-6">
        <p className="font-hand text-4xl text-cacao">{flor.fullName}</p>
        <p className="font-serif italic text-xs text-muted-text mt-2">
          Ábrelo cuando estés sola.
        </p>
      </div>
      <div className="absolute top-3 right-3 w-10 h-10 rounded-sm border border-gold bg-paper/60 flex items-center justify-center text-xs text-cacao">
        ✉
      </div>
    </motion.button>
  );
}
```

- [ ] **Step 4: Create Letter (with audio sync)**

`src/components/room-parts/Letter.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  letterSalutation,
  letterSignature,
  letterParagraphs,
  LETTER_AUDIO_PATH,
  LETTER_READ_PACE_MS_PER_CHAR,
} from '@/data/letter';
import { useMediaExists } from '@/hooks/useMediaExists';

export function Letter({ onFinish }: { onFinish: () => void }) {
  const hasAudio = useMediaExists(LETTER_AUDIO_PATH);
  const [visible, setVisible] = useState<number>(0); // number of paragraphs visible
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (hasAudio === null) return;
    let cancelled = false;

    if (hasAudio && audioRef.current) {
      audioRef.current.src = LETTER_AUDIO_PATH;
      audioRef.current.play().catch(() => {
        // fallback to paced reveal
        pacedReveal(cancelled);
      });
      // Reveal paragraphs at fixed intervals proportional to expected audio length.
      // Without explicit timings, we reveal one paragraph per ~6 seconds.
      let i = 0;
      const timer = setInterval(() => {
        i += 1;
        if (cancelled) { clearInterval(timer); return; }
        setVisible(i);
        if (i >= letterParagraphs.length) clearInterval(timer);
      }, 6000);
      audioRef.current.addEventListener('ended', () => {
        clearInterval(timer);
        setVisible(letterParagraphs.length);
        onFinish();
      });
    } else {
      pacedReveal(cancelled);
    }

    function pacedReveal(cancelledFlag: boolean) {
      let i = 0;
      const revealNext = () => {
        if (cancelledFlag) return;
        if (i >= letterParagraphs.length) {
          onFinish();
          return;
        }
        const p = letterParagraphs[i];
        setVisible(i + 1);
        const ms = Math.max(2500, p.text.length * LETTER_READ_PACE_MS_PER_CHAR);
        i += 1;
        setTimeout(revealNext, ms);
      };
      revealNext();
    }

    return () => {
      cancelled = true;
    };
  }, [hasAudio, onFinish]);

  return (
    <div className="relative mx-auto max-w-xl bg-[#fffbef] px-8 md:px-14 py-12 md:py-16 shadow-2xl rounded-sm border border-[#e8dcc5]">
      <p className="font-hand text-3xl md:text-4xl text-deep-brown">{letterSalutation}</p>
      <div className="mt-6 space-y-5 font-hand text-2xl md:text-3xl leading-snug text-deep-brown/90">
        {letterParagraphs.slice(0, visible).map((p, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            {p.text}
          </motion.p>
        ))}
      </div>
      {visible >= letterParagraphs.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 font-hand text-3xl md:text-4xl text-deep-brown"
        >
          — {letterSignature}
        </motion.p>
      )}
      <audio ref={audioRef} preload="none" />
    </div>
  );
}
```

- [ ] **Step 5: Build BuzonRoom**

`src/components/rooms/BuzonRoom.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Envelope } from '@/components/room-parts/Envelope';
import { Letter } from '@/components/room-parts/Letter';
import { CouponStack } from '@/components/room-parts/CouponStack';
import { useHouseStore } from '@/hooks/useHouseStore';

type Stage = 'envelope' | 'letter' | 'coupons';

export function BuzonRoom() {
  const hasOpened = useHouseStore((s) => s.hasOpenedLetter);
  const markOpened = useHouseStore((s) => s.markLetterOpened);
  const [stage, setStage] = useState<Stage>(hasOpened ? 'coupons' : 'envelope');
  const [lettersFinished, setLettersFinished] = useState(hasOpened);

  return (
    <div className="min-h-[70vh] flex flex-col items-center gap-10">
      <AnimatePresence mode="wait">
        {stage === 'envelope' && (
          <motion.div key="env" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Envelope
              onOpen={() => {
                markOpened();
                setStage('letter');
              }}
            />
          </motion.div>
        )}
        {stage === 'letter' && (
          <motion.div key="letter" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Letter onFinish={() => setLettersFinished(true)} />
            {lettersFinished && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setStage('coupons')}
                  className="px-6 py-3 rounded-full bg-deep-brown text-paper font-serif text-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  Ver tus cupones
                </button>
              </div>
            )}
          </motion.div>
        )}
        {stage === 'coupons' && (
          <motion.div
            key="coupons"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-center text-deep-brown mb-6">
              Tus cupones
            </h2>
            <CouponStack />
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setStage('letter')}
                className="px-5 py-3 rounded-full border border-deep-brown/30 text-deep-brown font-serif hover:bg-surface"
              >
                Volver a escuchar la carta
              </button>
              <Link
                href="/print-coupons"
                className="px-5 py-3 rounded-full bg-gold text-deep-brown font-serif hover:scale-105 active:scale-95 transition-transform"
                target="_blank"
              >
                Imprimir cupones
              </Link>
              <Link
                href="/cuarto/musica"
                className="px-5 py-3 rounded-full border border-deep-brown/30 text-deep-brown font-serif hover:bg-surface"
              >
                Ir a la sala de música
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 6: Verify build**

```bash
pnpm build
```

- [ ] **Step 7: Commit**

```bash
git add src
git commit -m "feat(cuarto 7): Buzón con sobre, carta sincronizada y cupones

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 16: Build /print-coupons route

**Files:**
- Create: `src/app/print-coupons/page.tsx`
- Create: `src/app/print-coupons/print.css`

- [ ] **Step 1: Create print stylesheet**

`src/app/print-coupons/print.css`:

```css
@media print {
  @page {
    size: A4 portrait;
    margin: 14mm;
  }
  body { background: white; }
  .no-print { display: none !important; }
}
```

- [ ] **Step 2: Create page**

`src/app/print-coupons/page.tsx`:

```tsx
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
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src
git commit -m "feat: /print-coupons A4 printable view

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Task 17: Final polish + QA checklist + README updates

**Files:**
- Modify: `README.md`
- Modify: `src/app/layout.tsx` (add viewport)
- Create: `docs/QA-CHECKLIST.md`

- [ ] **Step 1: Update layout with iPad viewport**

Edit `src/app/layout.tsx` to add `viewport` export:

```tsx
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFF8EF',
};
```

- [ ] **Step 2: Add QA checklist**

`docs/QA-CHECKLIST.md`:

```markdown
# QA checklist — iPad Safari

Run this pass on real iPad Safari before showing Flor.

## Navigation
- [ ] First visit shows La puerta
- [ ] Tap "Empezar tu regalo" → audio starts + lands on Pasaje
- [ ] After visiting 6 rooms, `/` shows plano directly (no intro)
- [ ] Every room has "Volver a la casa" button
- [ ] Every room has working audio toggle (🔊/🔇) top right

## Per-room
- [ ] Puerta: sun pulses and floats
- [ ] Pasaje: photo loads or fallback shows "Pasaje"
- [ ] Cocina: 5 objects tappable, modals open and close
- [ ] Cocina: mecedora modal has bridge styling
- [ ] Patio: garden grows flowers on tap, infinite
- [ ] Patio: perritos photos load or dog emoji fallback
- [ ] Patio: "Darle cariño" rains hearts
- [ ] Música: tocadiscos rotates when playing
- [ ] Música: missing songs show "próximamente"
- [ ] Familia: night mode activates (dark bg)
- [ ] Familia: 3 candles visible, tap makes them brighter
- [ ] Familia: video button only shows if papa-recuerdo.mp4 exists
- [ ] Buzón: envelope opens, letter reveals line-by-line
- [ ] Buzón: if carta-danilo.mp3 exists, audio plays in sync
- [ ] Buzón: 3 coupons expand on tap, "Guardar" persists

## Audio
- [ ] First tap unlocks audio
- [ ] Cross-fade between rooms is smooth
- [ ] Mute toggle persists across navigation
- [ ] Missing room MP3 doesn't crash

## Print
- [ ] /print-coupons renders 3 coupons cleanly
- [ ] Print preview in Safari shows A4 layout
```

- [ ] **Step 3: Update README**

Append to `README.md`:

```markdown
## Running locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 in iPad Safari (via LAN) or desktop Safari.

## Running tests

```bash
pnpm test
```

## Deploying to Vercel

1. Log in to Vercel.
2. Import this repo.
3. Deploy — no env vars needed.
4. URL: `fp-2026-<hash>.vercel.app`. Share only with Flor.

## Asset workflow

See `docs/ASSETS.md`.

## QA before showing Flor

See `docs/QA-CHECKLIST.md`.
```

- [ ] **Step 4: Verify build + tests**

```bash
pnpm build && pnpm test
```

Expected: build succeeds, all tests pass.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: iPad viewport + QA checklist + README

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

---

## Self-review notes

- Spec coverage: 7 rooms ✓, house map ✓, non-linear nav ✓, audio engine with cross-fade ✓, letter audio sync ✓, cupones interactivos ✓, print view ✓, noindex ✓, Zustand persist ✓, fallbacks for missing assets ✓, accessibility minimums ✓, kitchen 5 memories with real content ✓.
- Consciously deferred: songs duck from global tocadiscos (the RecordPlayer uses its own audio element louder than ambient — good enough for MVP; explicit global ducking would require context provider). Acceptable per spec.
- The music route uses its own audio element; AudioEngine ambient continues at default volume. Since tocadiscos volume is 0.9 and ambient is 0.6, the song dominates. Full ducking is a post-MVP polish.
- No placeholder TBDs. Every step has concrete code.
- Testing scope: store + mediaExists + AudioEngine. Interaction-heavy rooms tested by real iPad QA, not unit tests — appropriate for visual/emotional work.
