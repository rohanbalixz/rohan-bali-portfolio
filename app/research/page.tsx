import type { Metadata } from 'next';
import Link from 'next/link';
import { asset } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research agenda in reliable machine learning for Earth observation: evaluation confounds, the identifiability of cross-region explanations, and uncertainty under distribution shift. The questions, what I have found so far, what is open, and the work behind each.',
};

type WorkItem = {
  title: string;
  meta: string;
  href: string;
  external?: boolean;
};

type Thread = {
  n: string;
  title: string;
  question: string;
  body: string;
  finding: string;
  open: string[];
  work: WorkItem[];
};

const threads: Thread[] = [
  {
    n: '01',
    title: 'Evaluation confounds',
    question:
      'When one architecture beats another, is it the architecture, or the way the comparison was set up?',
    body: 'Many reported gains come from protocols that change alongside the model being tested. Channel count, input window, sampling, and forecast horizon often move together, so a comparison can end up measuring the protocol as much as the model.',
    finding:
      'In multi-horizon urban-growth prediction, losing one input epoch, not the longer horizon, explains 94% of a CNN’s apparent decline, and with channels matched the CNN leads the ConvLSTM at every horizon.',
    open: [
      'Which apparent architectural advantages in Earth-observation benchmarks are protocol artefacts?',
      'How should a comparison be designed so the architecture is the only thing that varies?',
    ],
    work: [
      {
        title: 'Channel Count, Not Horizon Length, Drives Architectural Divergence in Multi-Horizon Urban Growth Prediction',
        meta: 'GeoAI 2026 · Oral · Published',
        href: 'https://zenodo.org/records/20278403',
        external: true,
      },
      {
        title: 'The Channel-Count Confound: A Continental Audit of Multi-Horizon Urban Growth Prediction',
        meta: 'SpatialDI 2026 · Springer LNCS · To appear',
        href: '/publications#channel-count-confound-spatialdi',
      },
      {
        title: 'Project page: the channel-count study',
        meta: 'Data, protocol, results, limitations',
        href: '/research/channel-count-confound',
      },
    ],
  },
  {
    n: '02',
    title: 'Identifiability of cross-region explanations',
    question:
      'When a model trained in one region fails in another, can the data tell us why?',
    body: 'The usual explanation points at a covariate: rougher terrain, denser settlement. That explanation is only recoverable for target conditions the source data actually covers. When coverage is thin, a covariate model can fit the source well and still say nothing reliable about the target.',
    finding:
      'Across 44 cities in four world regions, only 5.8% of Andes tiles fall inside the source covariate support, against 77% of held-out US tiles, and a confident, well-fit explanation predicts the wrong sign of the transfer gap for all three degrading architectures.',
    open: [
      'When can the cause of a transfer failure be recovered from source data alone?',
      'What should a cross-region explanation report, beyond the covariates it credits?',
    ],
    work: [
      {
        title: 'Confident but Unidentifiable: Positivity Limits on Cross-Region Attribution in Geospatial Models',
        meta: 'Transactions in GIS · Accepted pending revisions',
        href: '/research/confident-but-unidentifiable',
      },
      {
        title: 'Cross-Region Source-Invariance in Earth Observation',
        meta: 'Ongoing · code and results public',
        href: '#ongoing',
      },
    ],
  },
  {
    n: '03',
    title: 'Uncertainty under distribution shift',
    question:
      'Once the data shifts, does a model’s stated confidence still track its real error?',
    body: 'Ranking errors well and sizing them correctly are different properties. A score good enough to decide which predictions to check by hand is not necessarily good enough to promise coverage, and treating one as the other is where uncertainty claims break in deployment.',
    finding:
      'Over 8.69M pixels, MC Dropout uncertainty ranks errors reliably (r = 0.983) but understates their size by 1.4 to 1.9 times.',
    open: [
      'When does dropout-based uncertainty ranking survive temporal and geographic shift?',
      'Can post-hoc or conformal calibration close the magnitude gap for spatiotemporal models?',
    ],
    work: [
      {
        title: 'The Channel-Count Confound: A Continental Audit of Multi-Horizon Urban Growth Prediction',
        meta: 'SpatialDI 2026 · includes the MC Dropout uncertainty analysis',
        href: '/publications#channel-count-confound-spatialdi',
      },
      {
        title: 'Project page: calibration results',
        meta: 'Calibration figure and decile analysis',
        href: '/research/channel-count-confound#results',
      },
    ],
  },
];

const ongoing = {
  title: 'Cross-Region Source-Invariance in Earth Observation',
  summary:
    'What actually decides whether a geospatial model transfers between regions? The full source-by-target transfer matrix trains one model per region and evaluates every model on every region, across 20 world regions, 8 tasks, and several input representations.',
  results: [
    'Hold the input fixed and the target region sets the score: training on a region’s own data is worth −0.001 FoM, and a region’s difficulty tracks its change rate (Spearman 0.97).',
    'A parameter-free recent-past baseline beats the trained CNN (FoM 0.56 vs 0.34; extent IoU 0.92 vs 0.61). GroupDRO and pooling the sources add nothing, and a 14× larger model still shows no home-field edge.',
    'Swap the input and retention traces a provenance spectrum, from harmonised products (about 1.0) to raw sensor reflectance (0.55). The same target-over-model dominance recurs on the PANGAEA benchmark.',
  ],
  href: 'https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation',
};

function WorkLink({ w }: { w: WorkItem }) {
  const title = <span className="font-serif text-base text-ink leading-snug underline decoration-rule underline-offset-4 group-hover:text-accent group-hover:decoration-accent transition-colors">{w.title}</span>;
  const meta = <span className="block mt-0.5 text-xs text-subtle">{w.meta}</span>;
  if (w.external) {
    return (
      <a href={w.href} target="_blank" rel="noopener noreferrer" className="group block">
        {title}
        {meta}
      </a>
    );
  }
  if (w.href.startsWith('#')) {
    return (
      <a href={w.href} className="group block">
        {title}
        {meta}
      </a>
    );
  }
  return (
    <Link href={w.href} className="group block">
      {title}
      {meta}
    </Link>
  );
}

export default function ResearchPage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-20 max-w-2xl">
          <p className="overline mb-4">Research</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-tighter leading-[1.1] mb-8 text-balance">
            When a model looks better, I check whether it actually is.
          </h1>
          <p className="text-base text-ink leading-loose mb-6">
            I work on reliable machine learning for Earth observation: knowing
            when a model&apos;s measured skill, its explanation of failure, and
            its uncertainty can be trusted in places and periods it was not
            trained on. My work runs along three threads. Each one below states
            the question, what I have found so far, what is still open, and the
            work behind it.
          </p>
          <p className="text-sm text-muted leading-relaxed">
            The papers themselves, with abstracts and BibTeX, are on{' '}
            <Link href="/publications" className="link-inline">
              Publications
            </Link>
            . Where I want to take this is in my{' '}
            <Link href="/research-statement" className="link-inline">
              research statement
            </Link>
            .
          </p>
        </header>

        {/* Threads */}
        <section aria-label="Research threads" className="mb-24">
          <div className="space-y-20">
            {threads.map((t) => (
              <article
                key={t.n}
                id={`thread-${t.n}`}
                className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12 pt-12 border-t border-rule first:border-t-0 first:pt-0 scroll-mt-24"
              >
                <div>
                  <p className="overline mb-2">Thread {t.n}</p>
                  <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">
                    {t.title}
                  </h2>
                </div>
                <div>
                  <p className="font-serif text-xl text-ink leading-snug mb-5 text-pretty">
                    {t.question}
                  </p>
                  <p className="text-base text-ink leading-loose mb-8 text-pretty">
                    {t.body}
                  </p>

                  <div className="border-l-2 border-accent pl-5 mb-8">
                    <p className="overline mb-2">So far</p>
                    <p className="text-base text-ink leading-relaxed text-pretty">
                      {t.finding}
                    </p>
                  </div>

                  <p className="overline mb-3">Open questions</p>
                  <ul className="space-y-2.5 mb-8">
                    {t.open.map((q, i) => (
                      <li key={i} className="text-sm text-muted leading-relaxed flex gap-3">
                        <span className="font-mono text-accent flex-shrink-0 tabular">
                          [{i + 1}]
                        </span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="overline mb-3">Work in this thread</p>
                  <ul className="space-y-4">
                    {t.work.map((w) => (
                      <li key={w.title + w.meta}>
                        <WorkLink w={w} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ongoing work */}
        <section
          id="ongoing"
          aria-labelledby="ongoing-h"
          className="mb-24 pt-12 border-t border-rule scroll-mt-24"
        >
          <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12">
            <div>
              <p className="overline mb-2">Ongoing work</p>
              <h2 id="ongoing-h" className="font-serif text-2xl text-ink tracking-tight leading-snug">
                Not yet a paper
              </h2>
            </div>
            <div>
              <span className="badge badge-secondary">Code and results public · 2026</span>
              <h3 className="mt-3 font-serif text-2xl text-ink tracking-tight leading-snug mb-4">
                {ongoing.title}
              </h3>
              <p className="text-base text-ink leading-loose mb-6 text-pretty">
                {ongoing.summary}
              </p>
              <ul className="space-y-3 mb-6">
                {ongoing.results.map((r, i) => (
                  <li key={i} className="text-sm text-muted leading-relaxed flex gap-3">
                    <span className="font-mono text-accent flex-shrink-0 tabular">
                      [{i + 1}]
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <a
                href={ongoing.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-inline text-sm"
              >
                Code &amp; data &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* How I work */}
        <section className="pt-12 border-t border-rule">
          <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12">
            <div>
              <p className="overline mb-2">Approach</p>
              <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">
                How I work
              </h2>
            </div>
            <div>
              <p className="text-base text-ink leading-loose text-pretty mb-8">
                I try to keep the evaluation honest. The holdouts are sealed,
                the controls are channel-matched, the statistics are checked per
                tile, and the results that matter come with confidence
                intervals. Every claim ships with the script that produces it
                and the result files that redraw the figures, under an open
                license. The data are real Earth-observation products, not
                synthetic benchmarks tuned to make a method look good. The
                limitations sit next to the results, ranking is kept separate
                from magnitude, and no claim runs past the evidence.
              </p>
              <p className="text-sm flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/publications" className="link-inline">
                  Publications
                </Link>
                <Link href="/research-statement" className="link-inline">
                  Research statement
                </Link>
                <Link href="/code" className="link-inline">
                  Code &amp; data
                </Link>
                <a href={asset('/RohanBali_CV.pdf')} download className="link-inline">
                  CV (PDF)
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
