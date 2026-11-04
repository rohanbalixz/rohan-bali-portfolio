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
    <div className="py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-14 max-w-2xl">
          <p className="overline mb-4">Publications</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-[-0.025em] leading-[1.1] mb-6 text-balance">
            Papers
          </h1>
          <p className="text-base text-muted leading-loose">
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
          <h2 id="peer-reviewed" className="overline mb-8">
            Peer-reviewed
          </h2>
          <ol className="space-y-12">
            {peerReviewed.map((p) => (
              <li key={p.id} id={p.id} className="pt-10 border-t border-rule first:border-t-0 first:pt-0 scroll-mt-24">
                <PaperCard paper={p} />
              </li>
            ))}
          </ol>
        </section>

        {other.length > 0 && (
          <section aria-labelledby="other-writing" className="pt-10 border-t border-rule">
            <h2 id="other-writing" className="overline mb-8">
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
