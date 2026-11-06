import type { Metadata } from 'next';
import PaperCard, { type Paper } from '@/components/PaperCard';
import papers from '@/data/papers.json';
import socialLinks from '@/data/social_links.json';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Sole-authored papers on reliable machine learning for Earth observation, each with public code and data: GeoAI 2026 (oral), SpatialDI 2026 (Springer LNCS), and Transactions in GIS.',
};

const all = papers as Paper[];
const peerReviewed = all.filter((p) => 'featured' in p);
const other = all.filter((p) => !('featured' in p));

export default function PublicationsPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 pt-8">
      <div>
        <header className="mb-8">
          <h1 className="text-[32px] leading-tight mb-4">
            Publications
          </h1>
          <p className="leading-relaxed">
            All sole-authored, with public code and data. Abstracts and BibTeX
            are under each entry. Also on{' '}
            <a
              href={socialLinks.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              Google Scholar
            </a>
            .
          </p>
        </header>

        <section className="mb-16" aria-labelledby="peer-reviewed">
          <h2 id="peer-reviewed" className="section-title">
            Peer-reviewed
          </h2>
          <ol className="space-y-12">
            {peerReviewed.map((p) => (
              <li key={p.id} id={p.id} className="scroll-mt-8">
                <PaperCard paper={p} />
              </li>
            ))}
          </ol>
        </section>

        {other.length > 0 && (
          <section aria-labelledby="other-writing">
            <h2 id="other-writing" className="section-title">
              Other writing
            </h2>
            <ol className="space-y-10">
              {other.map((p) => (
                <li key={p.id} id={p.id} className="scroll-mt-24">
                  <PaperCard paper={p} />
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}
