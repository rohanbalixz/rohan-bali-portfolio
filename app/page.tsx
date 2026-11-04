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
        Gave an oral presentation of{' '}
        <em>
          Channel Count, Not Horizon Length, Drives Architectural Divergence in
          Multi-Horizon Urban Growth Prediction
        </em>{' '}
        at GeoAI&nbsp;2026 in Ghent. The paper is{' '}
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
    date: 'Jun 2026',
    body: (
      <>
        Submitted{' '}
        <em>
          Confident but Unidentifiable: Positivity Limits on Cross-Region
          Attribution in Geospatial Models
        </em>{' '}
        to Transactions in GIS (Wiley). It has since been accepted pending
        revisions, which I am working through now.
      </>
    ),
  },
  {
    date: 'Jun 2026',
    body: (
      <>
        Released the code and results for a follow-on study on cross-region
        transfer,{' '}
        <a
          href="https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation"
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline"
        >
          Cross-Region Source-Invariance in Earth Observation
        </a>
        .
      </>
    ),
  },
  {
    date: 'May 2026',
    body: (
      <>
        Finished my M.S. in Data Science at UMass Dartmouth with a thesis on
        multi-horizon urban growth prediction, advised by Donghui Yan.
      </>
    ),
  },
  {
    date: 'Jan 2026',
    body: (
      <>
        <em>The Channel-Count Confound</em> was accepted at SpatialDI&nbsp;2026
        (Springer LNCS), and a six-page version was accepted as an oral at
        GeoAI&nbsp;2026.
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
    date: 'Dec 2024',
    body: (
      <>
        Wrote up a{' '}
        <a
          href="https://swn465.home.blog/author/rbali196018b763/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline"
        >
          note
        </a>{' '}
        on academic collaboration networks and small world structure.
      </>
    ),
  },
];

const selected = papers.filter((p) => 'featured' in p && p.featured);

function InlineLinks({
  items,
  nowrap = false,
}: {
  items: LinkItem[];
  nowrap?: boolean;
}) {
  const usable = items.filter((l) => l.href);
  return (
    <span
      className={`flex items-center gap-x-2 ${
        nowrap
          ? 'flex-wrap gap-y-1 sm:flex-nowrap sm:overflow-x-auto'
          : 'flex-wrap gap-y-1'
      }`}
    >
      {usable.map((l, i) => (
        <span
          key={l.label}
          className={`inline-flex items-center gap-x-2${
            nowrap ? ' sm:shrink-0 whitespace-nowrap' : ''
          }`}
        >
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
              src={asset('/new_pfp.jpeg')}
              alt="Rohan Bali"
              width={144}
              height={144}
              className="w-28 h-28 sm:w-36 sm:h-36 object-cover border border-rule"
            />
            <figcaption className="mt-2 w-28 sm:w-36 text-xs text-subtle italic leading-snug text-center">
              at the top of rockefeller center, nyc
            </figcaption>
          </figure>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-2">
              Rohan Bali
            </h1>
            <p className="text-base text-muted mb-1">{siteMeta.affiliation}</p>
            <p className="text-base text-ink leading-relaxed mb-4 text-pretty">
              I work on reliable machine learning for Earth observation: knowing
              when a model&apos;s measured skill, its explanation of failure, and
              its uncertainty can be trusted in places and periods it was not
              trained on.
            </p>
            <p className="text-sm text-muted">
              <InlineLinks items={profileLinks} nowrap />
            </p>
          </div>
        </header>

        {/* Bio */}
        <section className="prose-research space-y-5 mb-16">
          <p>
            A lot of what looks like one model beating another turns out to come
            from how the evaluation was set up. My work follows that worry in
            three directions. I find evaluation confounds that masquerade as
            architectural differences: in multi-horizon urban-growth prediction,
            a longer forecast horizon also means fewer input channels, and that
            lost input explains 94% of a CNN&apos;s apparent decline. I test
            whether cross-region explanations are identifiable at all when
            covariate overlap is thin: across 44 cities, a confident, well-fit
            explanation gets the sign of the transfer gap wrong in every
            degrading model. And I measure how well deep-learning uncertainty
            tracks real error under shift: MC Dropout ranks errors reliably
            (r&nbsp;=&nbsp;0.983) but understates their size by 1.4 to 1.9
            times.
          </p>
          <p>
            I finished my M.S. in Data Science at UMass Dartmouth in May 2026,
            with a thesis advised by{' '}
            <a
              href="https://www.umassd.edu/directory/dyan/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              Donghui Yan
            </a>
            , and I now work as an independent researcher. Before grad school I
            was a data scientist at The Parivartan Foundation, an NGO in Shimla.
            During the 2023 Himachal Pradesh floods I used satellite and
            government data to find about 20 communities that had been cut off,
            so relief could reach them. Earlier I was a software engineer at
            Capgemini and a machine learning researcher at Upcred.ai.
          </p>
        </section>

        {/* Publications */}
        <section id="publications" className="mb-16 scroll-mt-24">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-serif text-xl text-ink">Publications</h2>
            <Link href="/publications" className="text-sm text-muted hover:text-accent">
              Abstracts &amp; more
            </Link>
          </div>
          <p className="text-sm text-muted italic mb-6">
            All sole-authored, with public code and data.
          </p>
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
                      {[...(p.venues ?? []).map((v) => v.label), 'state' in p ? p.state : '']
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                    {'summary' in p && p.summary && (
                      <p className="mt-1.5 text-sm text-ink leading-relaxed text-pretty">
                        {p.summary}
                      </p>
                    )}
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
              breaks? And when it does break, can we even say why, or is the
              explanation we reach for something the data cannot pin down? Once
              the data shifts, can you still trust what the model says about how
              sure it is?
            </p>
            <p>
              I try not to say more than the evidence backs up. The holdouts are
              sealed, the inputs are matched, the statistics are checked tile by
              tile, and the limitations sit next to the results instead of
              getting buried at the end. Every number here can be reproduced
              from the code I put out. There is more in my{' '}
              <Link href="/research-statement" className="link-inline">
                research statement
              </Link>
              , the{' '}
              <Link href="/research/channel-count-confound" className="link-inline">
                channel-count study
              </Link>
              , and the rest of my{' '}
              <Link href="/publications" className="link-inline">
                papers
              </Link>
              .
            </p>
          </div>
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
