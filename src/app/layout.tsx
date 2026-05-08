import type { Metadata } from 'next';
import { Playfair_Display, Inter, Caveat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['400', '500', '600'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', weight: ['400', '500', '600', '700'] });

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
  themeColor: '#FFF8EF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
