# La casa de Flor

Regalo digital para Flor Piedra, mamá de Danilo, Día de la Madre 2026-05-10.

Siete cuartos que ella habita en su iPad: La puerta, Pasaje, La cocina, El patio, La sala de música, Los que siguen, El buzón.

## Spec

- Canónica: `docs/superpowers/specs/2026-05-07-madre-regalo-design.md`
- Visual para humanos: `docs/superpowers/specs/2026-05-07-madre-regalo-design.html`

## Stack

Next.js 15 · TypeScript · Tailwind · Framer Motion · Zustand · Vercel.

## Workflow para sumar assets

Arrastras los archivos a `/public/{photos,audio,video}/...` siguiendo la estructura de la spec, `git add . && git commit -m "assets: ..." && git push`. Vercel redeploya en ~30s. La app detecta qué existe y lo muestra; lo que falta se ignora silenciosamente.

## Criterio de éxito

Flor llora de alegría, o sonríe largo rato, o al día siguiente vuelve a abrir la app.

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
