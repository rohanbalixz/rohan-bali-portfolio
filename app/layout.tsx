import type { Metadata } from 'next';
import { Inter, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-serif',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rohanbalixz.github.io/rohan-bali-portfolio'),
  title: {
    default: 'Rohan Bali',
    template: '%s · Rohan Bali',
  },
  description:
    'Rohan Bali — M.S. Data Science student at UMass Dartmouth working on evaluation methodology and out-of-distribution generalization for Earth-observation vision.',
  keywords: [
    'Rohan Bali',
    'Earth observation',
    'remote sensing',
    'spatiotemporal vision',
    'distribution shift',
    'out-of-distribution generalization',
    'benchmark evaluation',
    'uncertainty calibration',
  ],
  authors: [{ name: 'Rohan Bali' }],
  openGraph: {
    title: 'Rohan Bali',
    description:
      'M.S. Data Science student at UMass Dartmouth. Evaluation methodology and out-of-distribution generalization for Earth-observation vision.',
    type: 'website',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Rohan Bali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohan Bali',
    description:
      'M.S. Data Science student at UMass Dartmouth. Evaluation methodology and out-of-distribution generalization for Earth-observation vision.',
    images: ['/og.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${plexMono.variable} scroll-smooth`}
    >
      <body className="antialiased bg-paper text-ink">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
