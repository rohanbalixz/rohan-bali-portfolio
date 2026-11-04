import Image from 'next/image';
import { asset, geoaiPaperUrl } from '@/lib/site';

const REPO = 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction';

const papers = [
  {
    kind: 'Paper 1 · Short paper',
    title:
      'Channel Count, Not Horizon Length, Drives Architectural Divergence in Multi-Horizon Urban Growth Prediction',
    venue: 'GeoAI 2026, Ghent · Oral · Published',
    format: '6 pages, 1 figure, 2 tables',
    scope:
      'The confound and its decomposition, the recency probe on the ConvLSTM, and the main benchmark with a zero-shot test on Lagos.',
    paper: { label: 'Paper (Zenodo)', href: geoaiPaperUrl },
  },
  {
    kind: 'Paper 2 · Full paper',
    title:
      'The Channel-Count Confound: A Continental Audit of Multi-horizon Urban Growth Prediction',
    venue: 'SpatialDI 2026 · Springer LNCS · To appear',
    format: '13 figures, 4 tables',
    scope:
      'Extends the GeoAI paper with related work, the full data and protocol, input and architecture ablations, the MC Dropout uncertainty analysis, and limitations.',
    paper: { label: 'Paper (to appear)', href: '' },
  },
];

export default function FlagshipHero({ slug }: { slug: string; variant?: 'home' | 'page' }) {
  return (
    <section className="border-t border-rule">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <div>
            <p className="overline mb-3">Study · two papers</p>
            <div className="flex flex-col gap-1.5">
              <span className="badge badge-accent">Sole author</span>
              <span className="badge">Code, benchmark &amp; weights public</span>
            </div>
          </div>

          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight leading-tight mb-4 text-balance">
              The channel-count study
            </h1>
            <p className="text-base text-muted leading-relaxed mb-8 text-pretty">
              One benchmark of multi-horizon urban-growth prediction over 5,698
              tiles of the continental US, written up as two papers: a short
              paper at GeoAI&nbsp;2026 and a full-length paper at
              SpatialDI&nbsp;2026. The CNN seems to lose skill at longer
              horizons while the ConvLSTM gains it. Match the number of input
              channels and almost all of the CNN&apos;s decline goes away, and
              the CNN leads at every horizon.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div>
                <p className="overline mb-2">Problem</p>
                <p className="text-sm text-ink leading-relaxed">
                  These benchmarks change the forecast horizon and the input
                  channel count at the same time, so you cannot tell which one
                  is doing the work.
                </p>
              </div>
              <div>
                <p className="overline mb-2">Finding</p>
                <p className="text-sm text-ink leading-relaxed">
                  About 94% of the CNN drop from the 5-year to the 10-year
                  horizon comes from losing an input epoch, not from the longer
                  horizon.
                </p>
              </div>
              <div>
                <p className="overline mb-2">Why it matters</p>
                <p className="text-sm text-ink leading-relaxed">
                  Benchmark design can decide which architecture appears
                  best.
                </p>
              </div>
            </div>

            <div id="papers" className="scroll-mt-24">
              <p className="overline mb-4">The two papers</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {papers.map((p) => (
                  <div key={p.title} className="border border-rule bg-paper p-5 flex flex-col">
                    <p className="text-xs font-medium uppercase tracking-widest text-subtle mb-2">
                      {p.kind}
                    </p>
                    <p className="font-serif text-base text-ink leading-snug mb-2 text-pretty">
                      {p.title}
                    </p>
                    <p className="text-sm text-muted">
                      <em>{p.venue}</em>
                    </p>
                    <p className="text-xs text-subtle mb-3">{p.format}</p>
                    <p className="text-sm text-ink leading-relaxed mb-4 text-pretty">
                      {p.scope}
                    </p>
                    <p className="mt-auto text-sm flex flex-wrap gap-x-4 gap-y-1">
                      {p.paper.href ? (
                        <a href={p.paper.href} target="_blank" rel="noopener noreferrer" className="link-inline">
                          {p.paper.label}
                        </a>
                      ) : (
                        <span className="text-subtle italic" aria-disabled="true">
                          {p.paper.label}
                        </span>
                      )}
                      <a href="#citation" className="link-inline">
                        BibTeX
                      </a>
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm">
                <a href={REPO} target="_blank" rel="noopener noreferrer" className="link-inline">
                  Code, benchmark &amp; trained weights
                </a>{' '}
                <span className="text-muted">(shared by both papers)</span>
              </p>
            </div>
          </div>
        </div>

        <figure className="mt-16">
          <div className="relative w-full aspect-[16/7] bg-rule/30 overflow-hidden border border-rule rounded-2xl">
            <Image
              src={asset('/paper_figures/fig_title_maps.png')}
              alt="Representative validation tile from the 821-tile 2015 spatial holdout. From left: GHSL ground truth, ConvLSTM prediction, MC Dropout uncertainty over 20 stochastic forward passes."
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
          <figcaption className="mt-4 text-xs font-mono text-subtle leading-relaxed max-w-prose">
            <span className="text-muted">Fig. 1.</span> Representative
            validation tile from the 821-tile 2015 spatial holdout, from the
            SpatialDI paper. From left: GHSL ground truth, ConvLSTM prediction,
            and MC Dropout uncertainty over 20 stochastic forward passes.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
