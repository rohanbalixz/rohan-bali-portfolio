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

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

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

function SlashLinks({ items }: { items: LinkItem[] }) {
  return (
    <>
      {items
        .filter((l) => l.href)
        .map((l, i) => (
          <span key={l.label}>
            {i > 0 && ' / '}
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ) : (
              <Link href={l.href}>{l.label}</Link>
            )}
          </span>
        ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-5 pt-8">
      <header className="grid sm:grid-cols-[1fr_180px] gap-x-10 gap-y-6 items-start mb-12">
        <div className="order-2 sm:order-1">
          <h1 className="text-[34px] leading-tight text-ink">Rohan Bali</h1>
          <p className="mt-1 mb-4 text-muted">{siteMeta.affiliation}</p>
          <div className="space-y-3 leading-relaxed">
            <p>
              I study when a model’s measured skill, its explanation of
              failure, and its uncertainty can be trusted in places and periods
              it was not trained on. I find evaluation confounds that
              masquerade as architectural differences, test whether
              cross-region explanations are identifiable at all when covariate
              overlap is thin, and measure how well deep-learning uncertainty
              tracks real error under distribution shift. Each paper ships with
              its code, data and the result files behind its numbers.
            </p>
            <p>
              I finished my M.S. in Data Science at UMass Dartmouth in May
              2026, with a thesis advised by{' '}
              <a href="https://www.umassd.edu/directory/dyan/" target="_blank" rel="noopener noreferrer">
                Donghui Yan
              </a>
              , and now work as an independent researcher. Before graduate
              school I was a data scientist at The Parivartan Foundation, an NGO
              in Shimla, where during the 2023 Himachal Pradesh floods I used
              satellite and government data to locate about 20 cut-off
              communities and help direct relief to them. Earlier, I was a
              software engineer at Capgemini. My{' '}
              <Link href="/research-statement">research statement</Link> says
              what I want to work on next.
            </p>
          </div>
          <p className="mt-4">
            <SlashLinks items={profileLinks} />
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/headshot.jpg')}
          alt="Rohan Bali"
          width={180}
          height={180}
          className="order-1 sm:order-2 w-36 h-36 sm:w-[180px] sm:h-[180px] rounded-full object-cover"
        />
      </header>

      <section id="publications" className="mb-12 scroll-mt-8">
        <h2 className="section-title">Publications</h2>
        <p className="mb-7">
          All sole-authored, with public code and data. Abstracts and BibTeX
          are on the <Link href="/publications">publications page</Link>.
        </p>
        <ol className="space-y-9">
          {selected.map((p) => (
            <li key={p.id}>
              <PaperCard paper={p} compact />
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12" aria-labelledby="news">
        <h2 id="news" className="section-title">
          News
        </h2>
        <table className="w-full text-[15px] leading-normal">
          <tbody>
            {news.map((n, i) => (
              <tr key={i} className="align-top">
                <td className="w-24 pr-4 py-1.5 whitespace-nowrap text-muted tabular">{n.date}</td>
                <td className="py-1.5">{n.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="contact" className="scroll-mt-8" aria-labelledby="contact-h">
        <h2 id="contact-h" className="section-title">
          Contact
        </h2>
        <p className="leading-relaxed">
          I am applying to PhD programs starting in Fall 2027. If you work on
          evaluation, generalization, uncertainty, or machine learning for
          Earth observation, I would be glad to hear from you:{' '}
          <a href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>.
        </p>
      </section>
    </div>
  );
}
