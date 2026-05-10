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
    id: 'sobres',
    number: 3,
    title: 'Un sobre cada mes',
    subtitle: 'Doce sobres. Un año entero.',
    body: 'El primer domingo de cada mes, durante un año, te llega un sobre con una nota a mano y algo adentro. Para que uses como quieras, sin dar explicaciones.',
    cta: 'Canjear cuando quieras',
  },
];
