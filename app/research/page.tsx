import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Robust spatiotemporal vision, geographic transfer, and uncertainty under shift. Current research themes and open questions in Earth-observation ML.',
};

const themes = [
  {
    label: 'Theme 01',
    title: 'Benchmark validity',
    body:
      'Whether reported gains on multi-horizon spatiotemporal benchmarks survive when the evaluation protocol is tightened. Most leaderboard advances are reported under protocols that vary alongside the architecture being tested. Input window length, channel count, sampling, and target horizon move together. Disentangling these is itself a research problem.',
    questions: [
      'Which apparent architectural advantages are protocol artefacts?',
      'What does a channel-matched, sealed-holdout, per-tile-tested comparison actually show?',
      'How do we design multi-horizon benchmarks where the comparison is the experiment, not the symptom?',
    ],
    evidence: {
      label: 'See: Channel-Count Confound',
      href: '/research/channel-count-confound',
    },
  },
  {
    label: 'Theme 02',
    title: 'Geographic transfer',
    body:
      'Whether models trained on data-rich regions retain their behavior when evaluated elsewhere. Zero-shot geographic evaluation separates training-distribution memorization from learned spatial structure and exposes which architectures genuinely encode generalizable representations versus which exploit dataset-specific regularities.',
    questions: [
      'When does a model trained on CONUS still work in Lagos, Karachi, or Jakarta?',
      'How do growth-regime and urban-morphology shifts decompose model failure?',
      'What inductive biases enable transfer without per-region fine-tuning?',
    ],
    evidence: {
      label: 'See: Lagos transfer (in flagship)',
      href: '/research/channel-count-confound',
    },
  },
  {
    label: 'Theme 03',
    title: 'Uncertainty under shift',
    body:
      'How well predictive uncertainty ranks and calibrates when the test distribution moves. The gap between ranking quality (useful for triage) and absolute calibration (required for coverage) is where most deployed systems quietly fail. MC Dropout, ensembles, and conformal prediction each address one half of this gap.',
    questions: [
      'When does dropout-based uncertainty ranking survive distribution shift?',
      'Can post-hoc or conformal calibration close the magnitude gap for spatiotemporal models?',
      'What is the right protocol for evaluating uncertainty under temporal and geographic shift jointly?',
    ],
    evidence: {
      label: 'See: MC Dropout calibration (in flagship)',
      href: '/research/channel-count-confound',
    },
  },
];

export default function ResearchPage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-20 max-w-2xl">
          <p className="overline mb-4">Research</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-tighter leading-[1.1] mb-8 text-balance">
            Robust spatiotemporal vision, honestly evaluated.
          </h1>
          <p className="text-base text-ink leading-loose mb-6">
            My current work is in Earth observation and robust computer vision:
            evaluation under temporal and geographic shift, uncertainty
            calibration, and representation learning for satellite time series.
            I care about evaluation protocols that isolate what a model has
            really learned.
          </p>
          <p className="text-base text-muted leading-loose">
            The three themes below run through everything on this site. They
            converge in the flagship project; the open questions point toward
            what I want to work on next.
          </p>
        </header>

        <div className="space-y-20">
          {themes.map((t) => (
            <section
              key={t.label}
              className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12 pt-12 border-t border-rule first:border-t-0 first:pt-0"
            >
              <div>
                <p className="overline mb-2">{t.label}</p>
                <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">
                  {t.title}
                </h2>
              </div>
              <div>
                <p className="text-base text-ink leading-loose mb-8 text-pretty">
                  {t.body}
                </p>
                <p className="overline mb-4">Open questions</p>
                <ul className="space-y-3 mb-8">
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
                <Link href={t.evidence.href} className="link-inline text-sm">
                  {t.evidence.label} &rarr;
                </Link>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-24 pt-12 border-t border-rule">
          <p className="overline mb-6">Methodological values</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            <div>
              <h3 className="font-serif text-lg text-ink mb-2">
                Evaluation rigor
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Sealed holdouts, channel-matched controls, per-tile statistical
                confirmation, and bootstrap intervals on every reported result.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg text-ink mb-2">
                Reproducibility
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Every claim ships with the script that produces it, results
                JSONs that regenerate the figures, and an open license.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg text-ink mb-2">
                Domain grounding
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Real Earth-observation pipelines and real geophysical data
                products, not synthetic benchmarks designed to favor a method.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-lg text-ink mb-2">
                Honest scope
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Limitations stated alongside results. Calibration ranking vs.
                magnitude separated. No claims that outrun the evidence.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
