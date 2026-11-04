import Link from 'next/link';
import { asset, siteMeta, geoaiPaperUrl } from '@/lib/site';
import socialLinks from '@/data/social_links.json';
import papers from '@/data/papers.json';
import PaperCard, { type Paper } from '@/components/PaperCard';

type LinkItem = { label: string; href: string; external?: boolean };

const profileLinks: LinkItem[] = [
  { label: 'Email', href: `mailto:${siteMeta.email}` },
  { label: 'CV', href: '/cv' },
  { label: 'Google Scholar', href: socialLinks.scholar, external: true },
  { label: 'GitHub', href: socialLinks.github, external: true },
  { label: 'ORCID', href: socialLinks.orcid, external: true },
  { label: 'LinkedIn', href: socialLinks.linkedin, external: true },
];

const ext = {
  target: '_blank',
  rel: 'noopener noreferrer',
  className: 'link-inline',
} as const;

const news = [
  {
    date: 'Nov 2026',
    body: (
      <>
        Released the{' '}
        <a
          href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction#pre-trained-weights"
          {...ext}
        >
          trained weights
        </a>{' '}
        for the channel-count benchmark: ten checkpoints, with checksums and a
        loading example.
      </>
    ),
  },
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
        <a href={geoaiPaperUrl} {...ext}>
          on Zenodo
        </a>
        , and its extended version, <em>The Channel-Count Confound</em>, is
        accepted at SpatialDI&nbsp;2026 (Springer LNCS).
      </>
    ),
  },
  {
    date: 'Jun 2026',
    body: (
      <>
        Submitted{' '}
        <Link href="/research/confident-but-unidentifiable" className="link-inline">
          <em>
            Confident but Unidentifiable: Positivity Limits on Cross-Region
            Attribution in Geospatial Models
          </em>
        </Link>{' '}
        to Transactions in GIS. It has since been accepted pending revisions,
        which I am working through now.
      </>
    ),
  },
  {
    date: 'Jun 2026',
    body: (
      <>
        Released the code and results for a follow-on study of cross-region
        transfer,{' '}
        <a
          href="https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation"
          {...ext}
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
        Finished my M.S. in Data Science at UMass Dartmouth, with a thesis on
        multi-horizon urban growth prediction advised by Donghui Yan.
      </>
    ),
  },
  {
    date: 'Dec 2024',
    body: (
      <>
        Wrote up my first independent research project, on{' '}
        <a
          href="https://swn465.home.blog/2024/12/12/understanding-academic-collaboration-networks-through-small-world/"
          {...ext}
        >
          academic collaboration networks and small-world structure
        </a>
        .
      </>
    ),
  },
];

const selected = (papers as Paper[]).filter((p) => 'featured' in p);

function InlineLinks({ items }: { items: LinkItem[] }) {
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {items
        .filter((l) => l.href)
        .map((l, i) => (
          <span key={l.label} className="inline-flex items-center gap-x-2 whitespace-nowrap">
            {i > 0 && (
              <span className="text-rule" aria-hidden="true">
                ·
              </span>
            )}
            {l.external ? (
              <a href={l.href} {...ext}>
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
        <header className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8 mb-10">
          <figure className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('/headshot.jpg')}
              alt="Rohan Bali"
              width={144}
              height={144}
              className="w-28 h-28 sm:w-36 sm:h-36 object-cover border border-rule"
            />
          </figure>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-2">
              Rohan Bali
            </h1>
            <p className="text-base text-muted mb-1">{siteMeta.affiliation}</p>
            <p className="text-base text-ink leading-relaxed mb-4">
              Reliable machine learning for Earth observation.
            </p>
            <p className="text-sm">
              <InlineLinks items={profileLinks} />
            </p>
          </div>
        </header>

        {/* Bio */}
        <section className="prose-research space-y-5 mb-16">
          <p>
            I study when a model’s measured skill, its explanation of
            failure, and its uncertainty can be trusted in places and periods it
            was not trained on. I find evaluation confounds that masquerade as
            architectural differences, test whether cross-region explanations
            are identifiable at all when covariate overlap is thin, and measure
            how well deep-learning uncertainty tracks real error under
            distribution shift. Each paper ships with its code, data and the
            result files behind its numbers.
          </p>
          <p>
            I finished my M.S. in Data Science at UMass Dartmouth in May 2026,
            with a thesis advised by{' '}
            <a href="https://www.umassd.edu/directory/dyan/" {...ext}>
              Donghui Yan
            </a>
            , and now work as an independent researcher. Before graduate school
            I was a data scientist at The Parivartan Foundation, an NGO in
            Shimla, where during the 2023 Himachal Pradesh floods I used
            satellite and government data to locate about 20 cut-off
            communities and help direct relief to them. Earlier, I was a
            software engineer at Capgemini. My{' '}
            <Link href="/research-statement" className="link-inline">
              research statement
            </Link>{' '}
            says what I want to work on next.
          </p>
        </section>

        {/* Publications */}
        <section id="publications" className="mb-16 scroll-mt-24">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-serif text-xl text-ink">Publications</h2>
            <Link href="/publications" className="text-sm text-muted hover:text-accent">
              Abstracts &amp; BibTeX
            </Link>
          </div>
          <p className="text-sm text-muted italic mb-8">
            All sole-authored, with public code and data.
          </p>
          <ol className="space-y-10">
            {selected.map((p) => (
              <li key={p.id}>
                <PaperCard paper={p} compact />
              </li>
            ))}
          </ol>
        </section>

        {/* News */}
        <section className="mb-16" aria-labelledby="news">
          <h2 id="news" className="font-serif text-xl text-ink mb-6">
            News
          </h2>
          <ol className="space-y-4">
            {news.map((n, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:gap-6">
                <span className="shrink-0 text-sm text-subtle tabular sm:w-24 mb-0.5 sm:mb-0 sm:pt-0.5">
                  {n.date}
                </span>
                <p className="text-sm text-ink leading-relaxed flex-1">{n.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24" aria-labelledby="contact-h">
          <h2 id="contact-h" className="font-serif text-xl text-ink mb-5">
            Contact
          </h2>
          <div className="prose-research mb-4">
            <p>
              I am applying to PhD programs starting in Fall 2027. If you work on evaluation,
              generalization, uncertainty, or machine learning for Earth
              observation, I would be glad to hear from you.
            </p>
          </div>
          <p className="text-sm text-muted">
            <a href={`mailto:${siteMeta.email}`} className="link-inline">
              {siteMeta.email}
            </a>
            {' · '}Boston, MA
          </p>
        </section>
      </div>
    </div>
  );
}
