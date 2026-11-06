import type { Metadata } from 'next';
import Link from 'next/link';
import { siteMeta, geoaiPaperUrl } from '@/lib/site';
import socialLinks from '@/data/social_links.json';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to reach Rohan Bali, and links to materials.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 pt-8">
      <div>
        <header className="mb-8">
          <h1 className="text-[32px] leading-tight mb-4">
            Contact
          </h1>
          <p className="leading-relaxed">
            Email is the best way to reach me. I am applying to PhD programs
            starting in Fall 2027 and would be glad to hear from potential supervisors and
            collaborators working on evaluation under distribution shift,
            uncertainty, or machine learning for Earth observation.
          </p>
        </header>

        <p className="leading-relaxed">
          <strong>Email:</strong>{' '}
          <a href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
          <br />
          <strong>Location:</strong> Boston, MA
          <br />
          <strong>Elsewhere:</strong>{' '}
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          {' / '}
          <a href={socialLinks.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>
          {' / '}
          <a href={socialLinks.orcid} target="_blank" rel="noopener noreferrer">ORCID</a>
          {' / '}
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
        <p className="mt-4 leading-relaxed">
          Materials: <Link href="/cv">CV</Link> /{' '}
          <Link href="/research-statement">research statement</Link> /{' '}
          <Link href="/publications">publications</Link> /{' '}
          <a href={geoaiPaperUrl} target="_blank" rel="noopener noreferrer">GeoAI paper (PDF)</a> /{' '}
          <Link href="/code">code &amp; data</Link>
        </p>
      </div>
    </div>
  );
}
