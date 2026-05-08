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
