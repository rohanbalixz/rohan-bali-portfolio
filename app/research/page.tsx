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
      'In multi-horizon urban-growth prediction, losing one input epoch, not the longer horizon, explains 94% of the CNN’s decline from the 5-year to the 10-year horizon, and with channels matched the CNN leads the ConvLSTM at every horizon.',
    open: [
      'Which apparent architectural advantages in Earth-observation benchmarks are protocol artifacts?',
      'How should a comparison be designed so the architecture is the only thing that varies?',
    ],
    work: [
      {
        title: 'Channel Count, Not Horizon Length, Drives Architectural Divergence in Multi-Horizon Urban Growth Prediction',
        meta: 'GeoAI 2026, oral',
        href: 'https://zenodo.org/records/20278403',
        external: true,
      },
      {
        title: 'The Channel-Count Confound: A Continental Audit of Multi-horizon Urban Growth Prediction',
        meta: 'SpatialDI 2026, Springer LNCS, to appear',
        href: '/publications#channel-count-confound-spatialdi',
      },
      {
        title: 'Project page for the channel-count study',
        meta: 'Data, protocol, results and limitations',
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
        meta: 'Transactions in GIS, accepted pending revisions',
        href: '/research/confident-but-unidentifiable',
      },
      {
        title: 'Cross-Region Source-Invariance in Earth Observation',
        meta: 'Ongoing; code and results are public',
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
        title: 'The Channel-Count Confound: A Continental Audit of Multi-horizon Urban Growth Prediction',
        meta: 'SpatialDI 2026, which includes the MC Dropout uncertainty analysis',
        href: '/publications#channel-count-confound-spatialdi',
      },
      {
        title: 'Calibration results on the project page',
        meta: 'The calibration figure and decile analysis',
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
    'A parameter-free recent-past baseline beats the trained CNN (FoM 0.56 vs 0.34; extent IoU 0.92 vs 0.61). GroupDRO and pooling the training regions add nothing, and a model about 14× larger still shows no home-field edge.',
    'Change the input instead, and retention (cross-region score over in-region score) traces a provenance spectrum, from globally harmonized products (about 1.0) to raw Landsat history (about 0.55). The same dominance of the target over the model recurs on the published PANGAEA benchmark.',
  ],
  href: 'https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation',
};

function WorkLink({ w }: { w: WorkItem }) {
  const props = w.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const anchor = w.external || w.href.startsWith('#');
  return (
    <>
      {anchor ? (
        <a href={w.href} {...props}>
          {w.title}
        </a>
      ) : (
        <Link href={w.href}>{w.title}</Link>
      )}
      <span className="text-muted">. {w.meta}</span>
    </>
  );
}

export default function ResearchPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 pt-8">
      <h1 className="text-[32px] leading-tight mb-4">Research</h1>
      <div className="space-y-3 leading-relaxed mb-10">
        <p>
          I work on reliable machine learning for Earth observation: knowing
          when a model’s measured skill, its explanation of failure, and its
          uncertainty can be trusted in places and periods it was not trained
          on. My work runs along three threads. Each one below states the
          question, what I have found so far, what is still open, and the work
          behind it.
        </p>
        <p>
          The papers themselves, with abstracts and BibTeX, are on{' '}
          <Link href="/publications">publications</Link>. Where I want to take
          this is in my <Link href="/research-statement">research statement</Link>.
        </p>
      </div>

      {threads.map((t) => (
        <section key={t.n} id={`thread-${t.n}`} className="mb-10 scroll-mt-8">
          <h2 className="section-title">{t.title}</h2>
          <div className="space-y-3 leading-relaxed">
            <p>
              <em>{t.question}</em>
            </p>
            <p>{t.body}</p>
            <p>
              <strong>So far.</strong> {t.finding}
            </p>
            <div>
              <p>
                <strong>Open questions.</strong>
              </p>
              <ul className="list-disc pl-6 mt-1 space-y-0.5">
                {t.open.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
            <div>
              <p>
                <strong>Work.</strong>
              </p>
              <ul className="list-disc pl-6 mt-1 space-y-0.5">
                {t.work.map((w) => (
                  <li key={w.title + w.meta}>
                    <WorkLink w={w} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section id="ongoing" aria-labelledby="ongoing-h" className="mb-10 scroll-mt-8">
        <h2 id="ongoing-h" className="section-title">
          Ongoing work (not yet a paper)
        </h2>
        <div className="space-y-3 leading-relaxed">
          <p>
            <strong>{ongoing.title}.</strong> {ongoing.summary}
          </p>
          <ul className="list-disc pl-6 space-y-1">
            {ongoing.results.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <p>
            Code and results are public:{' '}
            <a href={ongoing.href} target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>
            .
          </p>
        </div>
      </section>

      <section aria-labelledby="how-h">
        <h2 id="how-h" className="section-title">
          How I work
        </h2>
        <p className="leading-relaxed">
          I try to keep the evaluation honest. The holdouts are sealed, the
          controls are channel-matched, the statistics are checked per tile,
          and the results that matter come with confidence intervals. Every
          claim ships with the script that produces it and the result files
          that redraw the figures, under an open license. The data are real
          Earth-observation products. The limitations sit next to the results,
          ranking is kept separate from magnitude, and I try not to claim more
          than the evidence supports. See also <Link href="/code">code &amp; data</Link>{' '}
          and the <a href={asset('/RohanBali_CV.pdf')}>CV (PDF)</a>.
        </p>
      </section>
    </div>
  );
}
