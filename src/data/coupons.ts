export type Coupon = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
};

export const coupons: Coupon[] = [
  {
    id: 'masaje',
    number: 1,
    title: 'Masaje',
    subtitle: 'Un cupón para descansar.',
    body: 'Para que descanses ese cuerpo que tanto ha cuidado a todos.',
    cta: 'Canjear cuando quieras',
  },
  {
    id: 'viaje',
    number: 2,
    title: 'Viaje a donde tú quieras',
    subtitle: 'Tú decides el destino.',
    body: 'Tú escoges el lugar. Yo me encargo de ayudarte a llegar.',
    cta: 'Elegir destino',
  },
  {
    id: 'efectivo',
    number: 3,
    title: '$1,000 en efectivo',
    subtitle: 'Sin explicaciones.',
    body: 'Para que los uses como quieras, cuando quieras, sin dar explicaciones.',
    cta: 'Canjear cuando quieras',
  },
];
