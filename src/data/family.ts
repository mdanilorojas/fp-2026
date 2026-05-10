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
    photoPath: '/photos/abuelos/eloy-y-julia.jpg',
    candleLabel: 'Eloy',
    candleLine: 'Te diste cuenta de ser una mujer fuerte porque tu papá lo era.',
  },
  {
    id: 'papa',
    name: 'Mario',
    relation: 'Tu esposo',
    photoPath: '/photos/papa/mario-sefue.jpg',
    candleLabel: 'Mario',
    candleLine: 'Gracias por todo lo que construiste con él, mamá.',
    isCentral: true,
    videoPath: '/video/papa-recuerdo.mp4',
  },
  {
    id: 'julia',
    name: 'Julia',
    relation: 'Tu mamá',
    photoPath: '/photos/abuelos/julia-retrato.jpg',
    candleLabel: 'Julia',
    candleLine: 'Cada vez que cuidas, te pareces a tu mamá.',
  },
];

export const familyRoomQuote =
  'Hay personas que no se van del todo. Se quedan en la forma de amar que te dejaron.';
