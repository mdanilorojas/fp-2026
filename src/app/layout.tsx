import type { Metadata } from 'next';
import { Fraunces, Caveat, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { IntroAudio } from '@/components/IntroAudio';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'opsz'],
});
const caveat = Caveat({ subsets: ['latin'], variable: '--font-hand', weight: ['400', '500', '600', '700'] });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'Para Flor — Un regalo de Danilo',
  description: 'Un regalo del Día de la Madre.',
  robots: { index: false, follow: false, nocache: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F4F1E8',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${caveat.variable} ${mono.variable}`}>
      <body>
        <IntroAudio />
        {children}
      </body>
    </html>
  );
}
