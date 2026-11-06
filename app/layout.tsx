import type { Metadata, Viewport } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import socialLinks from '@/data/social_links.json';

const siteUrl = 'https://rohanbalixz.github.io/rohan-bali-portfolio/';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rohan Bali',
  url: siteUrl,
  image: `${siteUrl}headshot.jpg`,
  email: `mailto:${socialLinks.email}`,
  jobTitle: 'Independent Researcher',
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Massachusetts Dartmouth' },
    { '@type': 'CollegeOrUniversity', name: 'Manipal University Jaipur' },
  ],
  knowsAbout: [
    'Machine learning for Earth observation',
    'Distribution shift',
    'Evaluation methodology',
    'Uncertainty quantification',
    'Geospatial artificial intelligence',
  ],
  sameAs: [
    socialLinks.scholar,
    socialLinks.orcid,
    socialLinks.github,
    socialLinks.openreview,
    socialLinks.linkedin,
  ],
};

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rohanbalixz.github.io/rohan-bali-portfolio'),
  title: {
    default: 'Rohan Bali',
    template: '%s · Rohan Bali',
  },
  description:
    'Rohan Bali, independent researcher (M.S. Data Science, UMass Dartmouth, 2026). Reliable machine learning for Earth observation: when a model\'s measured skill, its explanation of failure, and its uncertainty can be trusted in places and periods it was not trained on.',
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
      'Independent researcher. Reliable machine learning for Earth observation: evaluation confounds, identifiability of cross-region explanations, and uncertainty under distribution shift.',
    type: 'website',
    images: [
      {
        url: '/og.png',
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
      'Independent researcher. Reliable machine learning for Earth observation: evaluation confounds, identifiability of cross-region explanations, and uncertainty under distribution shift.',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lato.variable} scroll-smooth`}
    >
      <body className="antialiased bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-paper focus:px-3 focus:py-2 focus:text-sm focus:text-accent focus:border focus:border-rule"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="min-h-[70vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
