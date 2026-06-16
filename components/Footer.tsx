import Link from 'next/link';
import { siteMeta } from '@/lib/site';
import socialLinks from '@/data/social_links.json';

export default function Footer() {
  return (
    <footer className="border-t border-rule mt-32">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="overline mb-3">Site</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="link-quiet">About</Link></li>
              <li><Link href="/publications" className="link-quiet">Publications</Link></li>
              <li><Link href="/research-statement" className="link-quiet">Research statement</Link></li>
              <li><Link href="/cv" className="link-quiet">CV</Link></li>
              <li><Link href="/#contact" className="link-quiet">Contact</Link></li>
              <li><Link href="/archive" className="link-quiet">Archive</Link></li>
            </ul>
          </div>
          <div>
            <p className="overline mb-3">Elsewhere</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  GitHub
                </a>
              </li>
              <li>
                <a href={socialLinks.scholar} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  Google Scholar
                </a>
              </li>
              <li>
                <a href={socialLinks.orcid} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  ORCID
                </a>
              </li>
              <li>
                <a href={socialLinks.openreview} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  OpenReview
                </a>
              </li>
              <li>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  Medium
                </a>
              </li>
              <li>
                <a href={`mailto:${siteMeta.email}`} className="link-quiet">
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="overline mb-3">Colophon</p>
            <p className="text-sm text-muted leading-relaxed">
              Figures from primary research.
            </p>
          </div>
        </div>

        <div className="hairline pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-subtle font-mono">
          <p>&copy; {new Date().getFullYear()} Rohan Bali</p>
          <p>Last updated {siteMeta.lastUpdated}</p>
        </div>
      </div>
    </footer>
  );
}
