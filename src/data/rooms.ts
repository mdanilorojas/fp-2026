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

export function getNextRoom(slug: RoomSlug): Room | null {
  const current = roomsBySlug[slug];
  if (!current) return null;
  return rooms.find((r) => r.order === current.order + 1) ?? null;
}

/**
 * Strict linear unlock: a room is unlocked only if it's the first
 * in-sequence room (pasaje) OR if its immediate predecessor has been visited.
 * 'puerta' is the intro (not in the house map). 'buzon' additionally
 * requires the kitchen key to have been used (enforced in its own room).
 */
export function isRoomUnlocked(slug: RoomSlug, visited: Set<string>): boolean {
  const room = roomsBySlug[slug];
  if (!room) return false;
  if (slug === 'puerta') return true;
  if (slug === 'pasaje') return true; // entry point after puerta
  const prev = rooms.find((r) => r.order === room.order - 1);
  if (!prev) return true;
  return visited.has(prev.slug);
}
