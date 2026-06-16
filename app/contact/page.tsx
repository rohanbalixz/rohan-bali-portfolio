import type { Metadata } from 'next';
import Link from 'next/link';
import { siteMeta, geoaiPaperUrl } from '@/lib/site';
import SocialLinks from '@/components/SocialLinks';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to reach Rohan Bali, and links to materials.',
};

export default function ContactPage() {
  return (
    <div className="py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-8">
            Contact
          </h1>
          <p className="prose-research">
            Email is the best way to reach me. I&apos;m interested in evaluation
            under distribution shift, robust computer vision, uncertainty
            calibration, and Earth-observation ML, and I welcome conversations
            with potential PhD supervisors and collaborators working on related
            problems.
          </p>
        </header>

        <section className="border-t border-rule pt-10 mb-12">
          <div className="grid sm:grid-cols-3 gap-10">
            <div>
              <p className="overline mb-3">Email</p>
              <a
                href={`mailto:${siteMeta.email}`}
                className="text-base text-ink hover:text-accent transition-colors break-words"
              >
                {siteMeta.email}
              </a>
            </div>
            <div>
              <p className="overline mb-3">Location</p>
              <p className="text-base text-ink">Boston, MA</p>
              <p className="text-sm text-subtle mt-2">{siteMeta.affiliation}</p>
            </div>
            <div>
              <p className="overline mb-3">Elsewhere</p>
              <SocialLinks />
            </div>
          </div>
        </section>

        <section className="border-t border-rule pt-10">
          <p className="overline mb-4">Materials</p>
          <p className="text-sm text-muted">
            <Link href="/cv" className="link-inline">
              CV
            </Link>
            <span className="text-rule mx-2">·</span>
            <Link href="/research-statement" className="link-inline">
              Research statement
            </Link>
            <span className="text-rule mx-2">·</span>
            <a
              href={geoaiPaperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              GeoAI paper (PDF)
            </a>
            <span className="text-rule mx-2">·</span>
            <a
              href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              Code
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
