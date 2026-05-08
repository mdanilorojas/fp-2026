// Lines array lets us sync each line with the audio if/when carta-danilo.mp3 exists.
// startSeconds is an offset into the audio; if no audio, lines appear sequentially
// at a reading pace controlled by LETTER_READ_PACE_MS_PER_CHAR.

export type LetterLine = {
  text: string;
  startSeconds?: number;
};

export const LETTER_READ_PACE_MS_PER_CHAR = 45; // ~180 chars/min feels right for emotional reading
export const LETTER_AUDIO_PATH = '/audio/voz/carta-danilo.mp3';

export const letterSalutation = 'Flor,';
export const letterSignature = 'Danilo';

export const letterParagraphs: LetterLine[] = [
  { text: 'Este regalo no alcanza para decir todo lo que tengo que decirte, pero es un comienzo.' },
  { text: 'Durante muchos años vi tus cuidados como si fueran parte normal de la vida. La comida lista, la ropa limpia, la casa funcionando, tu preocupación, tus llamadas, tus preguntas, tu forma de estar pendiente.' },
  { text: 'Hoy entiendo que nada de eso era automático. Todo eso eras tú. Tu amor. Tu fuerza. Tu manera de sostenernos.' },
  { text: 'Yo no siempre he sabido cuidarte como tú me cuidaste. No siempre he sido paciente. No siempre he sido justo. A veces te hablé mal, a veces me alejé, a veces no valoré lo suficiente tenerte cerca.' },
  { text: 'Pero ahora lo veo con más claridad. Cuando me sentí perdido, tú estuviste. Cuando me caí, tú estuviste. Cuando me pasó algo malo, tú estuviste. Cuando necesitaba volver a algún lugar seguro, tú seguías ahí.' },
  { text: 'Gracias por ser mi mamá. Gracias por tu comida, por tu preocupación, por tu forma de querer, por tu paciencia, por tu carácter, por tus canciones, por tus enojos justos, por tu manera de cuidar incluso cuando nadie te lo pide.' },
  { text: 'Gracias por haber estado incluso cuando yo no supe estar.' },
  { text: 'Te quiero mucho.' },
];
