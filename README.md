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
