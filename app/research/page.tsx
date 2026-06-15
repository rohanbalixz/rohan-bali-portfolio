import type { Metadata } from 'next';
import Link from 'next/link';
import MetricCard from '@/components/MetricCard';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Evaluation methodology and out-of-distribution generalization for spatiotemporal vision: continental urban-growth audits, cross-region transfer, and latent land-demand forecasting in Earth observation.',
};

const headline = [
  {
    value: '305',
    unit: 'M',
    description:
      'CONUS pixels audited under matched evaluation in the channel-count study.',
  },
  {
    value: '94',
    unit: '%',
    description:
      'of the apparent horizon effect in CNN vs ConvLSTM was a channel-count artefact, not a representational gain.',
    tone: 'secondary' as const,
  },
  {
    value: '20',
    description:
      'world regions in the source-by-target transfer matrix behind the source-invariance study.',
    tone: 'secondary' as const,
  },
  {
    value: 'p<.05',
    description:
      'DSRF beats SimVP, TAU, and PredRNN.V2 on Figure of Merit across 10 seeds in UrbanFinance.',
    tone: 'secondary' as const,
  },
];

const activeWork = [
  {
    status: 'Published',
    statusClass: 'badge badge-accent',
    venue: 'GeoAI 2026 (Oral) · SpatialDI 2026 (Springer LNCS)',
    title: 'The Channel-Count Confound',
    summary:
      'A continental audit of multi-horizon urban-growth prediction. The ConvLSTM advantage that shows up at longer horizons turns out to be an input-design artefact, not a better representation. Once the input stack is channel-matched, the gap collapses.',
    results: [
      '5,698 CONUS tiles at 250 m, sealed 2020 holdout, zero-shot transfer to Lagos',
      '94% of the CNN horizon decline attributes to one removed channel (95% CI [62%, 100%])',
      'MC Dropout calibration r = 0.983 over 8.69M validation pixels',
    ],
    links: [
      { label: 'Project page', href: '/research/channel-count-confound', external: false },
      { label: 'Paper (Zenodo)', href: 'https://zenodo.org/records/20278403', external: true },
      { label: 'Code', href: 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction', external: true },
    ],
  },
  {
    status: 'In preparation',
    statusClass: 'badge badge-secondary',
    venue: 'Sole author · 2026',
    title: 'Cross-Region Source-Invariance in Earth Observation',
    summary:
      'What actually decides whether a geospatial model transfers between regions? One model is trained per region and every model is evaluated on every region, across 20 world regions, 8 tasks, and several input representations.',
    results: [
      'Transfer is governed by the data, not the model: test region and input explain almost all score variance, training region almost none',
      'A parameter-free recent-past baseline matches or beats the trained models on temporal tasks',
      'Retention falls along an invariance spectrum: harmonized products high, raw single-sensor low, SAR better than expected',
    ],
    links: [
      { label: 'Code & data', href: 'https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation', external: true },
      { label: 'All papers', href: '/publications', external: false },
    ],
  },
  {
    status: 'In preparation',
    statusClass: 'badge badge-secondary',
    venue: 'Sole author · 2026',
    title: 'UrbanFinance: Latent Land-Demand at 100 m',
    summary:
      'Instead of predicting built-up area or price, this work predicts the signed gap between economically expressed demand and the supply Earth observation records: the cells where demand runs hot but conversion never happened. Five deliberately divergent Indian metros stress-test cross-typology generalization.',
    results: [
      'DSRF beats SimVP, TAU, and PredRNN.V2 on Figure of Merit at p<0.05 over 10 seeds, with 95% interval coverage of 0.948',
      'Leave-one-city-out transfer to an unseen metro beats SOTA trained on all five cities',
      'Saiz-style supply economics: constrained cities convert less land (corr -0.77) and carry more suppressed demand (corr +0.79)',
    ],
    links: [
      { label: 'All papers', href: '/publications', external: false },
    ],
  },
];

const threads = [
  {
    label: 'Thread 01',
    title: 'Benchmark validity',
    body:
      'Most leaderboard advances are reported under protocols that move alongside the architecture being tested. Channel count, input window, sampling, and target horizon travel together, so the comparison measures the protocol as much as the model.',
    questions: [
      'Which apparent architectural advantages are protocol artefacts?',
      'How do we design comparisons where the architecture is the only thing that varies?',
    ],
    evidence: { label: 'See: Channel-Count Confound', href: '/research/channel-count-confound', external: false },
  },
  {
    label: 'Thread 02',
    title: 'Geographic transfer',
    body:
      'Whether models trained on data-rich regions keep their behavior elsewhere. A full source-by-target matrix separates what the architecture learned from what the training region happened to contain, and it keeps surfacing the data, not the model, as the deciding factor.',
    questions: [
      'When does a model trained on one region still hold up on another?',
      'Which inductive biases enable transfer without per-region fine-tuning?',
    ],
    evidence: { label: 'See: Cross-Region Source-Invariance', href: 'https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation', external: true },
  },
  {
    label: 'Thread 03',
    title: 'Uncertainty under shift',
    body:
      'How well predictive uncertainty ranks and calibrates once the test distribution moves. Ranking quality is useful for triage, absolute coverage is what deployed systems actually need, and the gap between the two is where most of them quietly fail.',
    questions: [
      'When does dropout-based uncertainty ranking survive distribution shift?',
      'Can conformal calibration close the magnitude gap for spatiotemporal models?',
    ],
    evidence: { label: 'See: MC Dropout calibration (flagship)', href: '/research/channel-count-confound', external: false },
  },
];

const values = [
  {
    title: 'Evaluation rigor',
    body:
      'Sealed holdouts, channel-matched controls, per-tile statistical confirmation, and bootstrap intervals on every reported result.',
  },
  {
    title: 'Reproducibility',
    body:
      'Every claim ships with the script that produces it, results JSONs that regenerate the figures, and an open license.',
  },
  {
    title: 'Domain grounding',
    body:
      'Real Earth-observation pipelines and real geophysical data products, not synthetic benchmarks built to favor a method.',
  },
  {
    title: 'Honest scope',
    body:
      'Limitations stated next to results, ranking separated from magnitude, and no claim that outruns the evidence.',
  },
];

export default function ResearchPage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16 max-w-2xl">
          <p className="overline mb-4">Research</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-tighter leading-[1.1] mb-8 text-balance">
            When a spatiotemporal model looks better, I check whether it
            actually is.
          </h1>
          <p className="text-base text-ink leading-loose mb-6">
            I work on evaluation methodology and out-of-distribution
            generalization for Earth-observation vision. The through-line is
            simple: tighten the protocol until the reported gain either survives
            or turns out to be an artefact of how the inputs were built and where
            the data came from.
          </p>
          <p className="text-base text-muted leading-loose">
            Three projects below carry that question through urban-growth
            forecasting, cross-region transfer, and land-demand estimation. The
            numbers are from the work, not the abstract.
          </p>
        </header>

        {/* Headline numbers */}
        <section className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {headline.map((m) => (
              <MetricCard key={m.value} {...m} />
            ))}
          </div>
        </section>

        {/* Active work */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-2xl text-ink tracking-tight">
              Active research
            </h2>
            <Link
              href="/publications"
              className="text-xs font-mono uppercase tracking-wider text-muted hover:text-accent"
            >
              All papers
            </Link>
          </div>

          <div className="space-y-16">
            {activeWork.map((w) => (
              <article
                key={w.title}
                className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12 pt-12 border-t border-rule first:border-t-0 first:pt-0"
              >
                <div>
                  <span className={`${w.statusClass} mb-3`}>{w.status}</span>
                  <p className="mt-3 text-xs font-mono uppercase tracking-wider text-subtle leading-relaxed">
                    {w.venue}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-ink tracking-tight leading-snug mb-4">
                    {w.title}
                  </h3>
                  <p className="text-base text-ink leading-loose mb-6 text-pretty">
                    {w.summary}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {w.results.map((r, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted leading-relaxed flex gap-3"
                      >
                        <span className="font-mono text-accent flex-shrink-0 tabular">
                          [{i + 1}]
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {w.links.map((l) =>
                      l.external ? (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline text-sm"
                        >
                          {l.label} &rarr;
                        </a>
                      ) : (
                        <Link key={l.label} href={l.href} className="link-inline text-sm">
                          {l.label} &rarr;
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Threads */}
        <section className="mb-24">
          <h2 className="font-serif text-2xl text-ink tracking-tight mb-3">
            Threads running through the work
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-12 max-w-2xl">
            The same three questions show up in every project. The open ones
            point at what I want to work on next.
          </p>

          <div className="space-y-12">
            {threads.map((t) => (
              <div
                key={t.label}
                className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12 pt-10 border-t border-rule first:border-t-0 first:pt-0"
              >
                <div>
                  <p className="overline mb-2">{t.label}</p>
                  <h3 className="font-serif text-xl text-ink tracking-tight leading-snug">
                    {t.title}
                  </h3>
                </div>
                <div>
                  <p className="text-base text-ink leading-loose mb-6 text-pretty">
                    {t.body}
                  </p>
                  <p className="overline mb-3">Open questions</p>
                  <ul className="space-y-2.5 mb-5">
                    {t.questions.map((q, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted leading-relaxed flex gap-3"
                      >
                        <span className="font-mono text-accent flex-shrink-0 tabular">
                          [{i + 1}]
                        </span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                  {t.evidence.external ? (
                    <a
                      href={t.evidence.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-inline text-sm"
                    >
                      {t.evidence.label} &rarr;
                    </a>
                  ) : (
                    <Link href={t.evidence.href} className="link-inline text-sm">
                      {t.evidence.label} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How I work */}
        <section className="pt-12 border-t border-rule">
          <p className="overline mb-8">How I work</p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="font-serif text-lg text-ink mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
