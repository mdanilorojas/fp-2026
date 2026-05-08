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
