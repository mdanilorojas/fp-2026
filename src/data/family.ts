export type FamilyMember = {
  id: 'papa' | 'eloy' | 'julia';
  name: string;
  relation: string;
  photoPath: string;
  candleLabel: string;
  candleLine: string; // shown when tapping the candle
  isCentral?: boolean; // papá (central, slightly bigger)
  videoPath?: string; // only papá
};

export const familyMembers: FamilyMember[] = [
  {
    id: 'eloy',
    name: 'Eloy',
    relation: 'Tu papá',
    photoPath: '/photos/abuelos/eloy-01.jpg',
    candleLabel: 'Eloy',
    candleLine: 'Te diste cuenta de ser una mujer fuerte porque tu papá lo era.',
  },
  {
    id: 'papa',
    name: 'Papá',
    relation: 'Tu esposo',
    photoPath: '/photos/papa/papa-01.jpg',
    candleLabel: 'Papá',
    candleLine: 'Gracias por todo lo que construiste con él, mamá.',
    isCentral: true,
    videoPath: '/video/papa-recuerdo.mp4',
  },
  {
    id: 'julia',
    name: 'Julia',
    relation: 'Tu mamá',
    photoPath: '/photos/abuelos/julia-01.jpg',
    candleLabel: 'Julia',
    candleLine: 'Cada vez que cuidas, te pareces a tu mamá.',
  },
];

export const familyRoomQuote =
  'Hay personas que no se van del todo. Se quedan en la forma de amar que te dejaron.';
