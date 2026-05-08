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
