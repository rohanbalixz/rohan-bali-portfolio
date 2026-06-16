import type { Metadata } from 'next';
import PaperCard from '@/components/PaperCard';
import papers from '@/data/papers.json';

export const metadata: Metadata = {
  title: 'Paper',
  description:
    'Papers and the code, benchmarks, and data that back them up, in Earth-observation machine learning and evaluation under distribution shift.',
};

export default function PublicationsPage() {
  const featured = papers.filter((p) => 'featured' in p && p.featured);
  const inPrep = papers.filter(
    (p) => p.venues?.some((v) => v.label.toLowerCase().includes('preparation')),
  );
  const writing = papers.filter(
    (p) =>
      !('featured' in p && p.featured) &&
      !p.venues?.some((v) => v.label.toLowerCase().includes('preparation')),
  );

  return (
    <div className="py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16 max-w-2xl">
          <p className="overline mb-4">Publications</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-[-0.025em] leading-[1.1] mb-6 text-balance">
            Papers
          </h1>
          <p className="text-base text-muted leading-loose">
            Each entry links to the paper, the public code, and where useful a
            project page documenting the data and evaluation protocol. PDFs are
            mirrored locally so links stay stable.
          </p>
        </header>

        {featured.length > 0 && (
          <section className="mb-16">
            <p className="overline mb-6">Featured</p>
            {featured.map((p) => (
              <PaperCard key={p.id} {...(p as any)} featured />
            ))}
          </section>
        )}

        {inPrep.length > 0 && (
          <section className="mb-16">
            <p className="overline mb-6">In preparation</p>
            {inPrep.map((p) => (
              <PaperCard key={p.id} {...(p as any)} />
            ))}
          </section>
        )}

        {writing.length > 0 && (
          <section>
            <p className="overline mb-6">Working notes &amp; writing</p>
            {writing.map((p) => (
              <PaperCard key={p.id} {...(p as any)} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
