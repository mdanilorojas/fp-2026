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
