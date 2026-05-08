# "La casa de Flor" — Design Spec

**Fecha:** 2026-05-07
**Deadline:** domingo 2026-05-10, Día de la Madre
**Ventana real de construcción:** ~3 días
**Autor:** Danilo (hijo de 43), para su mamá **Flor Piedra**, 73 años
**Repo:** https://github.com/mdanilorojas/fp-2026
**Hosting:** Vercel, URL privada, sin indexar

## 1. El regalo, en una línea

Una casa digital con siete cuartos. Flor camina por ellos en el orden que quiera, a su ritmo, en el iPad. Cada cuarto es una pequeña experiencia completa: Pasaje, la cocina donde cocinó toda la vida, el patio con Fido y Lila, la sala donde siempre sonó música, el cuarto donde viven los que ya no están, y el buzón — donde abre un sobre con su nombre y escucha a su hijo leerle una carta en voz alta, seguida de tres cupones.

No es un "tour por capítulos". Es un **lugar** al que puede volver cuando quiera.

## 2. Por qué casa y no viaje

El prompt original proponía 10 capítulos lineales. Lo reemplazamos por 7 cuartos no-lineales, por tres razones:

1. **Fatiga:** 10 capítulos en iPad para alguien de 73 = cansancio antes de llegar a la carta, que es lo importante.
2. **Identidad:** Flor lleva 73 años definiendo qué es un hogar. La casa es lenguaje nativo, el viaje es vocabulario de app.
3. **Re-visita:** un viaje lineal se ve una vez. Una casa se habita. Puede entrar a la sala de música el martes a las 6pm porque extraña una canción.

## 3. Alcance

**Dentro:**
- 7 cuartos no-lineales + plano de la casa.
- Navegación desde el plano con botón "Volver a la casa" en cada cuarto.
- Audio ambiente por cuarto (MP3 que Danilo sube progresivamente) con cross-fade.
- **Audio de Danilo leyendo la carta** sincronizado con texto aparecido.
- Memorias específicas en la cocina, escritas con detalles reales.
- Cupones interactivos en el buzón + vista imprimible `/print-coupons`.
- Persistencia mínima en localStorage (audio on/off, cuartos visitados).
- Privacidad: noindex, URL privada de Vercel.

**Fuera (explícitamente cortado del plan original):**
- Capítulo de la libreta → eliminado (era más sobre la culpa del hijo que sobre la mamá).
- Match-3 tipo Candy Crush → reemplazado por el jardín en el patio (Flor juega Candy real; no le damos un juguete condescendiente).
- Capítulo de "los tres hijos" → eliminado (el regalo es de Danilo; meter a los hermanos sin coordinación real sería performativo).
- `/gallery` como ruta aparte → las fotos viven dentro de los cuartos donde importan.
- `/presentation` → si quieres presentación, te sientas con ella. No hace falta una ruta.
- React Three Fiber / constelación 3D → sustituido por velas SVG + Framer. Más íntimo, menos riesgo.
- Backend, login, cuentas.

## 4. La audiencia: Flor Piedra

- **73 años**, nacida en Pasaje, provincia de El Oro, Ecuador.
- Vive en el Valle de los Chillos, cerca de Quito.
- Viuda desde el **22 de febrero de 2022** (esposo fallecido, papá de Danilo).
- Padres: **Eloy y Julia**, ambos fallecidos.
- Tres hijos: Danilo (el autor), Stefania, y un tercer hermano.
- Perrito: **Fido**. También quiere mucho a **Lila**, la perrita de Danilo.
- Juega Candy Crush en su celular. Le gusta que "las cosas suban y bajen".
- Música: pasillos, música chichera, música del recuerdo. Canta.
- Come yogur y kéfir todos los días.

Esta app está escrita para ella, nadie más.

## 5. Dirección de arte

**Base:** Atardecer de Pasaje (luz dorada, costa de El Oro, hojas tropicales en silueta).
**Excepción:** el cuarto 6 ("los que siguen") usa noche estrellada como contraste emocional.

**Paleta (CSS variables en `:root`):**

```css
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
--color-cushion-cream: #E8D9B8;  /* el cojín de la mecedora de papá */
```

**Tipografía:**
- Títulos: **Playfair Display**, 500 weight.
- Body: **Inter**, 20px mínimo.
- **Carta final: Caveat o similar** (cursiva humana manuscrita), 28-32px con buen interlineado.
- Nombre de Flor en el sobre: escrito a mano estilizado.

**Mínimos táctiles iPad:**
- Tap targets ≥ 56×56px (mayoría más grandes).
- Body 20px, botones 20-22px, títulos de cuarto 44-56px, carta 28-32px.

**Animaciones clave:**
- **Sol animado en La puerta:** pulso lumínico (2.5s loop, scale 1 → 1.04) + float vertical suave (6s loop, 6px).
- Transiciones entre cuartos: fade + subtle zoom, 400-600ms.
- Respeta `prefers-reduced-motion`.

## 6. Stack técnico

| Capa | Decisión |
|---|---|
| Framework | Next.js 15 App Router, TypeScript |
| Estilos | Tailwind CSS + CSS variables |
| Animación | Framer Motion (2D único; cero R3F) |
| Estado | Zustand + persist middleware |
| Package mgr | pnpm |
| Hosting | Vercel con deploy automático |

**Por qué no R3F:** el costo emocional de una constelación 3D con fallback es mayor que el beneficio. Una ventana nocturna 2D con velas bien animadas tiene más peso íntimo y cero riesgo en iPad.

## 7. Arquitectura

### 7.1 Rutas

| Ruta | Propósito |
|---|---|
| `/` | Plano de la casa (o La puerta en la primera visita) |
| `/cuarto/[slug]` | Cada cuarto individual (puerta, pasaje, cocina, patio, musica, familia, buzon) |
| `/print-coupons` | Vista imprimible A5 de los 3 cupones |

**Primera visita vs visitas posteriores:**
- Primera vez → fuerza flujo: `/` muestra La puerta, "Empezar tu regalo" → `/cuarto/pasaje` → ... → hasta que hayan visitado al menos 6 cuartos.
- Después → `/` muestra el plano de la casa, libre navegación.
- Botón siempre visible: "Volver a la casa".

### 7.2 Estructura de carpetas

```
src/
  app/
    layout.tsx                    → HTML shell, fonts, noindex
    page.tsx                      → decide: puerta o plano
    cuarto/[slug]/page.tsx        → renderiza el cuarto correspondiente
    print-coupons/page.tsx
  components/
    AppShell.tsx                  → AudioEngine + AudioToggle + BackToHouse
    HouseMap.tsx                  → plano aéreo de la casa
    RoomLayout.tsx                → shell común de cada cuarto
    AudioEngine.tsx               → cross-fade de MP3 por cuarto
    AudioToggle.tsx               → 🔊/🔇 flotante
    BackToHouse.tsx               → botón "Volver a la casa"
    rooms/
      PuertaRoom.tsx              → cuarto 1
      PasajeRoom.tsx              → cuarto 2
      CocinaRoom.tsx              → cuarto 3
      PatioRoom.tsx               → cuarto 4 (jardín + perritos)
      MusicaRoom.tsx              → cuarto 5 (tocadiscos)
      FamiliaRoom.tsx             → cuarto 6 (ventana + velas)
      BuzonRoom.tsx               → cuarto 7 (sobre + carta + cupones)
    room-parts/
      Sun.tsx                     → sol animado
      MemoryObject.tsx            → objeto tocable con modal
      Garden.tsx                  → jardín regable
      Record.tsx                  → tocadiscos con aguja
      Candle.tsx                  → vela animada (usa en cuarto 6)
      Envelope.tsx                → sobre con nombre que se abre
      Letter.tsx                  → papel manuscrito con texto sync
      CouponCard.tsx              → tarjeta premium
  data/
    flor.ts                       → metadata de Flor (nombre, datos)
    rooms.ts                      → config de los 7 cuartos
    kitchen-memories.ts           → 5 memorias específicas
    music.ts                      → canciones tocables
    coupons.ts                    → 3 cupones
    letter.ts                     → texto canónico de la carta
    family.ts                     → datos de papá, Eloy, Julia
  hooks/
    useAudioEngine.ts
    useMediaExists.ts
    useHouseStore.ts              → Zustand
  lib/
    assets.ts
public/
  photos/
    flor/            flor-{NN}.jpg
    papa/            papa-{NN}.jpg
    abuelos/         eloy-{NN}.jpg, julia-{NN}.jpg
    perritos/        fido-{NN}.jpg, lila-{NN}.jpg
    pasaje/          pasaje-{NN}.jpg
    familia/         familia-{NN}.jpg
  audio/
    ambient/
      room-puerta.mp3
      room-pasaje.mp3
      room-cocina.mp3
      room-patio.mp3
      room-musica.mp3
      room-familia.mp3
      room-buzon.mp3
    songs/
      song-{1..3}.mp3         → canciones tocables del cuarto 5
    voz/
      carta-danilo.mp3        → audio de Danilo leyendo la carta
    sfx/
      cigarras.mp3            → patio
      puerta-abrir.mp3
      sobre-abrir.mp3
      candy-match.mp3         → jardín (cuando florece)
  video/
    papa-recuerdo.mp4         → opcional
```

### 7.3 Estado global

```ts
// useHouseStore.ts
type HouseStore = {
  visitedRooms: Set<string>;      // slugs: 'puerta', 'pasaje', ...
  firstVisit: boolean;            // true hasta que visite 6 cuartos
  audioEnabled: boolean;          // default true
  savedCoupons: string[];
  hasOpenedLetter: boolean;       // desbloquea ver cupones sin re-abrir sobre

  visitRoom: (slug: string) => void;
  toggleAudio: () => void;
  saveCoupon: (id: string) => void;
  markLetterOpened: () => void;
  reset: () => void;
};
```

Persiste bajo key `flor-casa-v1` en localStorage.

## 8. Los 7 cuartos

### Cuarto 1 — La puerta

**Qué ve:** puerta de madera cálida al atardecer. Hojas tropicales en silueta. **Sol animado** (pulso + float). Título grande:

> *Flor, hoy te toca recibir.*

Subtítulo discreto: *"Un lugar para ti, hecho por tu hijo Danilo."*

**Interacción:** tap en la puerta o en el botón "Empezar tu regalo" (ambos son el mismo target conceptual — el botón está visualmente dentro/sobre la puerta) → animación de apertura (0.8s) → desbloquea `AudioContext` (primer gesto del usuario, requerido por Safari) → tras puerta abierta, navega al plano de la casa (no directo a Pasaje — Flor elige el primer cuarto). Sugerencia visual: "Pasaje" parpadea muy sutil como primera parada recomendada.

**Audio:** `room-puerta.mp3` fade-in 2s tras el tap.

**Notas:** usa `flor-01.jpg` como foto hero pequeña si existe (marco ornamental). Si no, solo tipografía.

---

### Cuarto 2 — Pasaje

**Qué ve:** foto real de Pasaje, El Oro, o paisaje costeño ecuatoriano si no hay foto específica. Atardecer dorado. Tipografía mínima. Una sola frase grande:

> *"Aquí aprendiste a querer así de fuerte."*

Bajo la foto, subtexto discreto:

> *Pasaje, El Oro — donde empezó Flor, y donde empezó nuestro amor por ti.*

**Interacción:** minimalista. Tap en la foto → zoom-in suave y una segunda línea aparece:

> *"Cada vez que nos cuidas, la costa de El Oro vuelve a casa con nosotros."*

Botón "Volver a la casa" (aparece tras 4s o inmediato al tocar).

**Audio:** `room-pasaje.mp3` — idealmente pasillo instrumental suave. Si hay audio de olas/cigarras del SFX, mezcla a bajo volumen.

**Assets:** foto de Pasaje (puede ser del archivo familiar o, si no existe, imagen genérica del paisaje ecuatoriano de la región). Placeholder editable: `pasaje-01.jpg`.

---

### Cuarto 3 — La cocina

Este es el **cuarto central**. No es "todo lo que mamá hizo" abstracto. Es **la cocina como centro de la vida familiar**, con 5 memorias específicas que Danilo escribió.

**Qué ve:** ilustración cálida de una cocina con 5 objetos destacados visualmente (no lista — escena). Cada objeto tiene un resplandor suave indicando que es tocable. El resplandor rota entre objetos cada ~4s para guiar sin ser invasivo.

**Los 5 objetos y sus memorias:**

**3.1 — La olla (cangrejos y disculpa)**
> *"La olla donde cocinaste cangrejos, mariscos, pollo con champiñones, tantas cosas.*
> *Yo me acuerdo de cómo te criticaba la comida. Perdón, mami. Era soberbio. Hoy sé lo que vale que alguien te cocine con cariño todos los días."*

**3.2 — La mesa (cartas, Jenga, cantar)**
> *"La mesa donde jugábamos cartas. Donde jugamos Jenga. Donde cantabas y cantábamos. La cocina era el cuarto más importante de la casa — no porque ahí se comía, sino porque ahí se vivía."*

**3.3 — La olla grande (colada morada, COVID, papá)**
> *"La olla grande — la del intento de negocio de colada morada. ¿Te acuerdas?*
> *No nos fue bien. No importa. Fue uno de los momentos más divertidos del COVID, contigo, con papá y conmigo encerrados aquí intentando algo juntos. No salió el negocio; salió una memoria."*

**3.4 — La ventana (refugio del COVID)**
> *"Por esta ventana mirábamos pasar los días del encierro. Papá, tú y yo, los tres. Nadie se enfermó. Tú nos cuidaste. De nuevo."*

**3.5 — La mecedora de papá (el cojín crema)** — puente al cuarto 6
> *"La mecedora de papá, con el cojín crema que tú le tejiste. Hace tres años que nadie se sienta ahí. Pero la silla sigue en la cocina, porque aquí fue donde él más estuvo contigo."*

Al cerrar el modal de la 3.5, pequeña animación: una vela tenue aparece en una esquina, y un subtexto discreto: *"Hay otro cuarto donde él sigue contigo. Cuando quieras, entra."* Esto **insinúa** el cuarto 6 sin forzarlo.

**Interacción:** tap en objeto → modal suave con el texto, fade-in del texto. Botón "Cerrar" grande. Visitar los 5 no es obligatorio.

**Audio:** `room-cocina.mp3`. SFX muy sutil de fondo: clic lejano de olla (loop de 30s, volumen 15%) — opcional, solo si no distrae.

**Assets recomendados:** ilustración SVG de la cocina (la armo yo en el build). Si Danilo tiene una foto real de la cocina, se puede sumar como polaroid al lado.

---

### Cuarto 4 — El patio

**Qué ve:** escena de patio con tierra suave, macetas, un cielo levemente más claro (hacia el día). Flores medio abiertas. Dos siluetas de perritos (Fido y Lila) se mueven lento por la pantalla.

**Interacción principal — el jardín:** Flor toca la tierra o las flores → aparece un destello dorado, crecen flores, caen pétalos. Sin objetivo. No se puede perder. Puede hacerlo 3 veces o 300.

**Interacción secundaria — los perritos:** tap en Fido o Lila → se acercan, mueven cola, aparece una foto real si existe (`fido-01.jpg`, `lila-01.jpg`). Si no, ilustración estilizada.

**Botón:** "Darle cariño a Fido y Lila" → lluvia de corazones flotantes por 3s.

**Audio:**
- `room-patio.mp3` como música suave.
- SFX: **cigarras muy bajas** en loop (`cigarras.mp3`, volumen 10%), pájaros muy ocasionales.

**Notas:** este es el cuarto **feliz** de la casa. Contrapeso emocional al cuarto 3 (memoria) y 6 (duelo).

---

### Cuarto 5 — La sala de música

**Qué ve:** un tocadiscos vintage estilizado, con aguja y vinilo. Alrededor, 3 fundas de disco apoyadas. Una lámpara cálida. Papel de pared sutil con flores.

**Interacción:**
- Tap en una funda → se mete en el tocadiscos, aguja baja con animación, empieza a sonar.
- Mientras suena: aguja rota, vinilo gira, visualizador muy sutil (ondas doradas en la periferia).
- Play/pause en el centro del tocadiscos. Volumen con dial grande.
- Al parar o cambiar: aguja sube con animación, funda vuelve a su lugar.

**Importante:** mientras una canción tocable suena, el ambient del cuarto (`room-musica.mp3`) hace duck fade-out 0.8s. Al parar la canción, el ambient vuelve con fade-in 1s.

**Las 3 fundas:** Danilo subirá `song-1.mp3`, `song-2.mp3`, `song-3.mp3`. En `music.ts` se pueden poner títulos y artistas. Si alguna no existe aún, su funda aparece grisada con texto "próximamente".

**Audio:** `room-musica.mp3` como fondo cuando no suena canción tocable.

---

### Cuarto 6 — Los que siguen contigo

**Qué ve:** transición marcada del atardecer a **noche estrellada**. Una ventana grande que da al cielo. Tres velas flameantes dispuestas con respeto (no alineadas simétricamente — humanas). Cada vela tiene debajo un retrato ovalado pequeño.

**Los tres:**
1. **Papá** (esposo de Flor, 22 de febrero de 2022) — vela central, ligeramente más grande. Foto. Si existe `papa-recuerdo.mp4`, aparece un botón discreto "Ver recuerdo" bajo la foto.
2. **Eloy** (papá de Flor) — vela a la izquierda. Foto.
3. **Julia** (mamá de Flor) — vela a la derecha. Foto.

**Frase de cuarto, arriba:**

> *"Hay personas que no se van del todo. Se quedan en la forma de amar que te dejaron."*

**Interacción:** tap en una vela → la vela brilla más, el retrato se ilumina, aparece una línea:

- Papá: *"Gracias por todo lo que construiste con él, mamá."*
- Eloy: *"Te diste cuenta de ser una mujer fuerte porque tu papá lo era."*
- Julia: *"Cada vez que cuidas, te pareces a tu mamá."*

(Estas son placeholders editables. Si Danilo quiere escribirlas más personales, las edita en `family.ts`.)

**Audio:** `room-familia.mp3`. Idealmente instrumental muy suave, pasillo lento o ambiental. Volumen algo más bajo que otros cuartos para respetar.

**Sin 3D. Sin constelación.** Solo velas, retratos, ventana, noche. Más íntimo.

---

### Cuarto 7 — El buzón

Este es el **cierre real**. Todo desemboca aquí.

**Qué ve:** escritorio antiguo con un sobre grande de papel crema. En el sobre, escrito a mano:

> *Flor Piedra*

Debajo, con letra más pequeña:

> *Ábrelo cuando estés sola.*

**Interacción 1 — abrir el sobre:**
Tap → animación de sobre abriéndose (1.2s) → sale una carta plegada → se despliega → SFX muy suave de papel.

**Interacción 2 — la carta:**
El papel tiene **tipografía manuscrita** (Caveat). Texto vacío al principio.

Si existe `carta-danilo.mp3` (grabación de Danilo leyendo):
- Se reproduce automáticamente.
- El texto aparece **línea por línea sincronizado con la voz** (timing hardcoded en data/letter.ts, en segundos).
- Botón discreto "Pausar" y "Volver a escuchar" bajo la carta.

Si no existe el MP3 todavía:
- El texto aparece línea por línea a ritmo de lectura (≈180 chars/min).
- Mensaje pequeño arriba: *"Pronto podrás escuchar a Danilo leerte esta carta."*

**Interacción 3 — los cupones:**
Al terminar la carta (o si Flor toca "Seguir" antes), aparecen **3 cupones apilados** con animación de caer en la mesa.

- Cupón 1: **Masaje**
- Cupón 2: **Viaje a donde tú quieras**
- Cupón 3: **$1,000 en efectivo**

Cada cupón: tap → se expande en modal grande → muestra texto completo + botón "Guardar" (marca en el store). La forma se siente como tarjeta premium con papel, borde ornamental sutil, sello dorado.

**Audio:**
- `room-buzon.mp3` al entrar al cuarto (música suave, delicada).
- Cuando empieza la carta: `room-buzon.mp3` baja a 20% volumen, `carta-danilo.mp3` se reproduce encima.
- Al terminar la carta: `room-buzon.mp3` vuelve a volumen normal.

**Botones al final de la carta:**
- "Volver a la casa"
- "Ver los cupones" (si ya los vio, vuelve al cupón favorito; si no, los revela)
- "Ir a la sala de música"
- "Imprimir cupones" → abre `/print-coupons` en nueva pestaña

## 9. La carta (texto canónico)

Texto editable en `data/letter.ts` por si Danilo quiere ajustarlo. Por defecto usamos el del master prompt, con el reemplazo "Mamá" → "Flor" solo en el encabezado y despedida (el cuerpo puede mantener "mamá" en minúscula como apelativo cariñoso).

```
Flor,

Este regalo no alcanza para decir todo lo que tengo que decirte,
pero es un comienzo.

Durante muchos años vi tus cuidados como si fueran parte normal
de la vida. La comida lista, la ropa limpia, la casa funcionando,
tu preocupación, tus llamadas, tus preguntas, tu forma de estar pendiente.

Hoy entiendo que nada de eso era automático.
Todo eso eras tú. Tu amor. Tu fuerza. Tu manera de sostenernos.

Yo no siempre he sabido cuidarte como tú me cuidaste.
No siempre he sido paciente. No siempre he sido justo.
A veces te hablé mal, a veces me alejé, a veces no valoré
lo suficiente tenerte cerca.

Pero ahora lo veo con más claridad. Cuando me sentí perdido,
tú estuviste. Cuando me caí, tú estuviste. Cuando me pasó algo malo,
tú estuviste. Cuando necesitaba volver a algún lugar seguro,
tú seguías ahí.

Gracias por ser mi mamá.
Gracias por tu comida, por tu preocupación, por tu forma de querer,
por tu paciencia, por tu carácter, por tus canciones, por tus enojos
justos, por tu manera de cuidar incluso cuando nadie te lo pide.

Gracias por haber estado incluso cuando yo no supe estar.

Te quiero mucho.

Danilo
```

## 10. Sistema de audio

**Reglas:**
1. **Autoplay bloqueado por Safari iPad** hasta primer gesto. La puerta lo desbloquea con el "Empezar tu regalo".
2. **Cross-fade entre cuartos**: 1.5s. Implementado con dos `<audio>` HTML alternados (no Web Audio API — más simple y cubre el caso).
3. **Loop dentro del cuarto**: cada `room-*.mp3` hace loop. Si Flor pasa 20 min en la cocina, la música sigue.
4. **Duck en cuarto 5** cuando suena canción tocable.
5. **Duck en cuarto 7** cuando empieza `carta-danilo.mp3`.
6. **AudioToggle** flotante siempre visible (esquina superior derecha), persiste en localStorage.
7. Si un MP3 no existe (404 al HEAD), el cuarto entra en silencio sin romperse.
8. Volumen por defecto: 60%.

**Cronograma de audio para Danilo:**
1. Primero prueba con `room-cocina.mp3` y `carta-danilo.mp3`. Son los dos cruciales.
2. Luego los demás en cualquier orden.
3. Las canciones tocables (`song-1.mp3` etc.) pueden llegar cualquier día antes del sábado.

## 11. Assets — responsabilidades

| Asset | Obligatorio | Quién | Cuándo |
|---|---|---|---|
| `flor-01.jpg` (foto de Flor) | Sí | Danilo | Sábado AM |
| `pasaje-01.jpg` (foto paisaje) | Muy recomendado | Danilo | Sábado AM |
| `papa-01.jpg` | Sí (sin ella el cuarto 6 se cae) | Danilo | Sábado AM |
| `eloy-01.jpg`, `julia-01.jpg` | Recomendado (si no, solo vela sin foto) | Danilo | Sábado AM |
| `fido-01.jpg`, `lila-01.jpg` | Recomendado (si no, ilustración) | Danilo | Cualquier día |
| `room-cocina.mp3` | Sí | Danilo | Viernes |
| `carta-danilo.mp3` (grabación voz) | **Crítico** | Danilo | Sábado máximo |
| Demás `room-*.mp3` | Deseable | Danilo | Progresivo |
| `song-1/2/3.mp3` | Deseable | Danilo | Progresivo |
| `papa-recuerdo.mp4` | Opcional | Danilo | Si aparece |

**Todos los placeholders se ignoran silenciosamente si no existen.** La app nunca muestra un ícono roto.

## 12. Privacidad y deploy

- Repo: `https://github.com/mdanilorojas/fp-2026` (privado).
- Vercel conectado a `main`. Cada push → deploy en ~30s.
- URL Vercel: `fp-2026-<hash>.vercel.app` (suficientemente opaca).
- Sin password gate.
- `robots.txt`: `User-agent: * / Disallow: /`.
- Meta `noindex, nofollow` en `layout.tsx`.
- Header `X-Robots-Tag: noindex, nofollow` vía `vercel.json`.

## 13. Accesibilidad

- Contraste AA mínimo en todo texto sobre fondo.
- Targets táctiles ≥ 56×56px.
- Todo accionable con tap (sin hover-dependent).
- `aria-label` en botones-ícono.
- `prefers-reduced-motion`: sol estático, cross-fade 0.5s, sin float.
- Modo teclado funcional: Tab/Enter/Space.
- Texto ≥ 20px; carta 28-32px.

## 14. Cronograma

| Día | Entregable |
|---|---|
| Jueves 7 noche | Scaffold Next.js, Tailwind, tokens, AppShell, AudioEngine, Puerta (cuarto 1), Pasaje (cuarto 2), HouseMap (plano). Deploy inicial. |
| Viernes 8 | Cuartos 3 (Cocina), 4 (Patio), 5 (Música). Memorias de cocina escritas, jardín funcional, tocadiscos. |
| Sábado 9 AM | Cuartos 6 (Familia), 7 (Buzón). Carta sincronizada. Cupones + `/print-coupons`. |
| Sábado 9 PM | Danilo sube fotos y audios. QA en iPad real. Ajustes finales. |
| Domingo 10 | Regalo a Flor. |

## 15. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Danilo no alcanza a grabar la carta | La carta funciona solo con texto sincronizado; se puede sumar el audio después sin tocar código |
| Fotos no llegan | Cada cuarto tiene fallback ilustrado; el cuarto 6 de familia muestra vela sin foto si falta |
| MP3 muy pesados | README con instrucción de compresión (128kbps, ≤5MB); warning si >10MB |
| Video de papá gigante | Compresión recomendada; botón solo aparece si el asset existe |
| Flor se pierde en el plano | Primera visita fuerza flujo guiado hasta visitar 6 cuartos; después libre |
| Bug el domingo | Acceso al repo, fix + push + redeploy en 5 min |
| Autoplay bloqueado | Primer tap en La puerta desbloquea AudioContext; todo fluye de ahí |

## 16. Criterio de éxito

Flor, sin ayuda, debe poder:

1. Abrir el link en el iPad y ver su nombre en la pantalla.
2. Tocar "Empezar" y entender el lugar donde está.
3. Moverse entre cuartos sin frustrarse.
4. Tocar objetos y oír memorias que **reconoce** (no frases genéricas).
5. Escuchar música que le gusta.
6. Encender una vela por Eloy, por Julia, por su esposo, sin sentir tristeza cruda — sintiendo presencia.
7. Abrir un sobre con su nombre y escuchar a su hijo.
8. Ver sus 3 cupones.
9. Volver al día siguiente, al otro, al otro — y que la casa siga siendo suya.

Éxito = Flor llora de alegría, o sonríe largo rato, o al día siguiente vuelve a abrir la app. No = código bonito.
