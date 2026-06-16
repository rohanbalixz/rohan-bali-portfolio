import Link from 'next/link';
import { asset, siteMeta, geoaiPaperUrl } from '@/lib/site';
import socialLinks from '@/data/social_links.json';
import papers from '@/data/papers.json';

type LinkItem = { label: string; href: string; external?: boolean };

const profileLinks: LinkItem[] = [
  { label: 'Email', href: `mailto:${siteMeta.email}` },
  { label: 'Google Scholar', href: socialLinks.scholar, external: true },
  { label: 'GitHub', href: socialLinks.github, external: true },
  { label: 'ORCID', href: socialLinks.orcid, external: true },
  { label: 'OpenReview', href: socialLinks.openreview, external: true },
  { label: 'CV', href: '/cv' },
  { label: 'LinkedIn', href: socialLinks.linkedin, external: true },
];

const news = [
  {
    date: 'Jun 2026',
    body: (
      <>
        New paper in preparation —{' '}
        <em>
          Train Anywhere, Test Everywhere: Cross-Region Transfer in Earth
          Observation Is Decided by the Data, Not the Model
        </em>
        , prepared as a SIGSPATIAL&nbsp;&rsquo;26 short paper.
      </>
    ),
  },
  {
    date: '2026',
    body: (
      <>
        <em>The Channel-Count Confound</em> accepted at SpatialDI&nbsp;2026
        (Springer LNCS), with a short-paper companion at GeoAI&nbsp;2026 (oral).
        The GeoAI PDF is{' '}
        <a
          href={geoaiPaperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline"
        >
          on Zenodo
        </a>
        .
      </>
    ),
  },
  {
    date: '2024',
    body: (
      <>
        Working note on academic collaboration networks and small-world
        structure.
      </>
    ),
  },
];

const selected = papers.slice(0, 4);

function InlineLinks({ items }: { items: LinkItem[] }) {
  const usable = items.filter((l) => l.href);
  return (
    <>
      {usable.map((l, i) => (
        <span key={l.label}>
          {i > 0 && <span className="text-rule mx-2">·</span>}
          {l.external ? (
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              {l.label}
            </a>
          ) : (
            <Link href={l.href} className="link-inline">
              {l.label}
            </Link>
          )}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8 mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset('/profile.jpg')}
            alt="Rohan Bali"
            width={144}
            height={144}
            className="w-28 h-28 sm:w-36 sm:h-36 object-cover border border-rule shrink-0"
          />
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-2">
              Rohan Bali
            </h1>
            <p className="text-base text-muted mb-1">{siteMeta.affiliation}</p>
            <p className="text-base text-ink leading-relaxed mb-4 text-pretty">
              Evaluation methodology and out-of-distribution generalization for
              Earth-observation vision.
            </p>
            <p className="text-sm text-muted">
              <InlineLinks items={profileLinks} />
            </p>
          </div>
        </header>

        {/* Bio */}
        <section className="prose-research space-y-5 mb-16">
          <p>
            When one spatiotemporal model looks better than another, I try to
            establish whether it actually is — or whether the gain came from how
            the inputs were built and where the data came from. Most of my work
            audits benchmarks in urban-growth prediction: sealed temporal
            holdouts, channel-matched controls, zero-shot transfer to held-out
            regions, and calibrated uncertainty, asking what part of a reported
            result survives a tighter protocol.
          </p>
          <p>
            Before graduate school I was a software engineer at Capgemini and a
            machine-learning trainee at Upcred.ai.
          </p>
        </section>

        {/* News */}
        <section className="mb-16 scroll-mt-24">
          <h2 className="font-serif text-xl text-ink mb-6">News</h2>
          <ol className="space-y-4">
            {news.map((n, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:gap-6">
                <span className="shrink-0 text-sm text-subtle tabular sm:w-24 mb-0.5 sm:mb-0 sm:pt-0.5">
                  {n.date}
                </span>
                <p className="text-sm text-ink leading-relaxed flex-1">
                  {n.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Research */}
        <section id="research" className="mb-16 scroll-mt-24">
          <h2 className="font-serif text-xl text-ink mb-5">Research</h2>
          <div className="prose-research space-y-5">
            <p>
              The through-line is evaluation under distribution shift. Three
              questions recur: when a model improvement comes from the
              architecture versus the evaluation setup; which learned
              representations survive when a model moves between regions; and
              whether uncertainty estimates stay useful once the test
              distribution changes.
            </p>
            <p>
              I keep claims close to the evidence — sealed holdouts and
              channel-matched controls, per-tile statistical confirmation,
              limitations stated next to results, and every reported number
              reproducible from the released code. More in my{' '}
              <Link href="/research-statement" className="link-inline">
                research statement
              </Link>{' '}
              and the{' '}
              <Link href="/research/channel-count-confound" className="link-inline">
                channel-count study
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="mb-16 scroll-mt-24">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-xl text-ink">Selected publications</h2>
            <Link href="/publications" className="text-sm text-muted hover:text-accent">
              All publications
            </Link>
          </div>
          <ol className="space-y-7">
            {selected.map((p) => {
              const pubLinks: LinkItem[] = (p.links ?? [])
                .filter((l) => l.href)
                .map((l) => ({ label: l.label, href: l.href, external: l.external }));
              return (
                <li key={p.id} className="flex flex-col sm:flex-row sm:gap-6">
                  <span className="shrink-0 text-sm text-subtle tabular sm:w-24 mb-1 sm:mb-0 sm:pt-1">
                    {p.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-ink leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {(p.venues ?? []).map((v) => v.label).join(' · ')}
                    </p>
                    {pubLinks.length > 0 && (
                      <p className="mt-1.5 text-sm text-muted">
                        <InlineLinks items={pubLinks} />
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24">
          <h2 className="font-serif text-xl text-ink mb-5">Contact</h2>
          <div className="prose-research mb-4">
            <p>
              Email is the best way to reach me. I welcome conversations with
              potential PhD supervisors and collaborators working on evaluation
              under distribution shift, robust computer vision, uncertainty
              calibration, and Earth-observation ML.
            </p>
          </div>
          <p className="text-sm text-muted">
            <a
              href={`mailto:${siteMeta.email}`}
              className="link-inline"
            >
              {siteMeta.email}
            </a>
            <span className="text-rule mx-2">·</span>
            Boston, MA
          </p>
        </section>
      </div>
    </div>
  );
}
