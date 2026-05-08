export type KitchenMemory = {
  id: string;
  objectName: string;
  icon: string;
  text: string;
  isBridge?: boolean; // true for mecedora (bridge to familia room)
};

export const kitchenMemories: KitchenMemory[] = [
  {
    id: 'olla',
    objectName: 'La olla',
    icon: 'pot',
    text: `La olla donde cocinaste cangrejos, mariscos, pollo con champiñones, tantas cosas.

Yo me acuerdo de cómo te criticaba la comida. Perdón, mami. Era soberbio. Hoy sé lo que vale que alguien te cocine con cariño todos los días.`,
  },
  {
    id: 'mesa',
    objectName: 'La mesa',
    icon: 'table',
    text: `La mesa donde jugábamos cartas. Donde jugamos Jenga. Donde cantabas y cantábamos.

La cocina era el cuarto más importante de la casa — no porque ahí se comía, sino porque ahí se vivía.`,
  },
  {
    id: 'olla-grande',
    objectName: 'La olla grande',
    icon: 'big-pot',
    text: `La olla grande — la del intento de negocio de colada morada. ¿Te acuerdas?

No nos fue bien. No importa. Fue uno de los momentos más divertidos del COVID, contigo, con papá y conmigo encerrados aquí intentando algo juntos.

No salió el negocio; salió una memoria.`,
  },
  {
    id: 'ventana',
    objectName: 'La ventana',
    icon: 'window',
    text: `Por esta ventana mirábamos pasar los días del encierro. Papá, tú y yo, los tres.

Nadie se enfermó. Tú nos cuidaste. De nuevo.`,
  },
  {
    id: 'mecedora',
    objectName: 'La mecedora de papá',
    icon: 'rocker',
    isBridge: true,
    text: `La mecedora de papá, con el cojín crema que tú le tejiste.

Hace tres años que nadie se sienta ahí. Pero la silla sigue en la cocina, porque aquí fue donde él más estuvo contigo.

Hay otro cuarto donde él sigue contigo. Cuando quieras, entra.`,
  },
];
