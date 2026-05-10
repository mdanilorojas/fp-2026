export type RoomPhoto = {
  path: string;
  caption?: string;
};

export const roomPhotos: Record<string, RoomPhoto[]> = {
  pasaje: [
    { path: '/photos/pasaje/pasaje-01.jpg', caption: 'Pasaje, El Oro.' },
  ],
  patio: [
    { path: '/photos/perritos/fido-final.jpeg', caption: 'Fido.' },
    { path: '/photos/perritos/lila-01.jpg', caption: 'Lila.' },
  ],
  // Other rooms don't use photos directly; they use family photos via family.ts
};
