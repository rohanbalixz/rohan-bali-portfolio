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
  { label: 'Medium', href: socialLinks.medium, external: true },
];

const news = [
  {
    date: 'Jun 2026',
    body: (
      <>
        Submitted a new paper,{' '}
        <em>
          Confident but Unidentifiable: Positivity Limits on Cross-Region
          Attribution in Geospatial Models
        </em>
        , to Transactions in GIS (Wiley). It is under review.
      </>
    ),
  },
  {
    date: 'Jun 2026',
    body: (
      <>
        Started a new paper,{' '}
        <em>
          Train Anywhere, Test Everywhere: Cross-Region Transfer in Earth
          Observation Is Decided by the Data, Not the Model
        </em>
        . It is headed to SIGSPATIAL 2026 as a short paper.
      </>
    ),
  },
  {
    date: '2026',
    body: (
      <>
        <em>The Channel-Count Confound</em> got into SpatialDI&nbsp;2026
        (Springer LNCS). A shorter companion paper is at GeoAI&nbsp;2026 as an
        oral, and that one is{' '}
        <a
          href={geoaiPaperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline"
        >
          up on Zenodo
        </a>
        .
      </>
    ),
  },
  {
    date: 'Feb 2025',
    body: (
      <>
        Started a{' '}
        <a
          href={socialLinks.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline"
        >
          Medium series
        </a>{' '}
        explaining the fundamentals of machine learning from the ground up.
      </>
    ),
  },
  {
    date: '2024',
    body: (
      <>
        Wrote up a note on academic collaboration networks and small world
        structure.
      </>
    ),
  },
];

const selected = papers.slice(0, 4);

function InlineLinks({ items }: { items: LinkItem[] }) {
  const usable = items.filter((l) => l.href);
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {usable.map((l, i) => (
        <span key={l.label} className="inline-flex items-center gap-x-2">
          {i > 0 && (
            <span className="text-rule" aria-hidden="true">
              ·
            </span>
          )}
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
    </span>
  );
}

export default function Home() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8 mb-12">
          <figure className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('/profile.jpg')}
              alt="Rohan Bali"
              width={144}
              height={144}
              className="w-28 h-28 sm:w-36 sm:h-36 object-cover border border-rule"
            />
            <figcaption className="mt-2 w-28 sm:w-36 text-xs text-subtle italic leading-snug text-center">
              somewhere in new hampshire
            </figcaption>
          </figure>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-2">
              Rohan Bali
            </h1>
            <p className="text-base text-muted mb-1">{siteMeta.affiliation}</p>
            <p className="text-base text-ink leading-relaxed mb-4 text-pretty">
              I work on how we test machine learning models for satellite and
              Earth data, and whether they hold up outside the place they were
              trained.
            </p>
            <p className="text-sm text-muted">
              <InlineLinks items={profileLinks} />
            </p>
          </div>
        </header>

        {/* Bio */}
        <section className="prose-research space-y-5 mb-16">
          <p>
            A lot of papers say one model beats another. I spend most of my
            time checking whether that is actually true. Usually the win turns
            out to come from how the data was set up, not from the model. So I
            take benchmarks apart, mostly in urban growth prediction, and see
            how much of the result is left once the test gets harder. That means
            hiding the years the model never saw, matching the inputs so two
            models get a fair shot, testing on cities the model was never
            trained on, and checking that its confidence numbers mean something.
          </p>
          <p>
            Before grad school I worked as a software engineer at Capgemini, and
            before that as a machine learning trainee at Upcred.ai.
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
              Most of my projects come back to the same worry. When the test
              data stops looking like the training data, does the model still
              work, and would our metric even tell us if it did not? A few
              questions keep showing up. Is a model really better, or did the
              benchmark just make it look that way? When a model trained in one
              part of the world gets dropped into another, what holds and what
              breaks? And once the data shifts, can you still trust what the
              model says about how sure it is?
            </p>
            <p>
              I try not to say more than the evidence backs up. The holdouts are
              sealed, the inputs are matched, the statistics are checked tile by
              tile, and the limitations sit next to the results instead of
              getting buried at the end. Every number here can be reproduced
              from the code I put out. There is more in my{' '}
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
              Email is the best way to reach me. I am looking for PhD positions,
              so if you supervise work on evaluation, generalization,
              uncertainty, or machine learning for Earth observation, I would
              like to hear from you. Same goes for anyone working on close
              problems.
            </p>
          </div>
          <p className="text-sm text-muted">
            <a href={`mailto:${siteMeta.email}`} className="link-inline">
              {siteMeta.email}
            </a>
            . Based in Boston, MA.
          </p>
        </section>
      </div>
    </div>
  );
}
