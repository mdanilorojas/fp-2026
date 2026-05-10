export type Song = {
  id: string;
  title: string;
  artist: string;
  file: string;
};

export const songs: Song[] = [
  {
    id: 'song-1',
    title: 'Payaso',
    artist: 'Javier Solis',
    file: '/audio/songs/Javier Solis - Payaso (Video).mp3',
  },
  {
    id: 'song-2',
    title: 'Sendas Distintas',
    artist: 'Julio Jaramillo',
    file: '/audio/songs/Sendas Distintas - Julio Jaramillo (Letra).mp3',
  },
  {
    id: 'song-3',
    title: 'Delilah',
    artist: 'Tom Jones',
    file: '/audio/songs/Tom Jones Delilah  (1968)  Subtitulado en Inglés y Español  HD.mp3',
  },
];
