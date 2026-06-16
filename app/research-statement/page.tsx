import type { Metadata } from 'next';
import Link from 'next/link';
import { asset } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Research statement',
  description:
    'Research statement: evaluation methodology and out-of-distribution generalization for Earth-observation vision — benchmark confounds, geographic transfer, and uncertainty under shift.',
};

export default function ResearchStatementPage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-14">
          <p className="overline mb-4">Research statement</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-[-0.025em] leading-[1.1] mb-6 text-balance">
            When a deep model looks better, is it learning something better, or
            did the benchmark quietly make the comparison unfair?
          </h1>
          <p className="text-sm font-mono uppercase tracking-wider text-subtle">
            Rohan Bali. M.S. Data Science, UMass Dartmouth. 2026.
          </p>
        </header>

        <article className="prose-research max-w-prose">
          <p>
            My research started from a simple question: when a deep model looks
            better, is it actually learning something better, or did the
            benchmark quietly make the comparison unfair?
          </p>

          <p>
            I work on spatiotemporal vision for Earth observation. These
            models are usually tested across time and geography, but the
            evaluation setup is often not as clean as it looks. The input
            pipeline can change with the prediction horizon. A metric can
            make one model look best while another metric says the opposite.
            A model that works in one region can fail badly in another. I am
            interested in these failure points because they decide what we
            believe about a model.
          </p>

          <p>
            My current work studies this through multi-horizon urban-growth
            prediction. In my sole-authored paper,{' '}
            <Link
              href="/research/channel-count-confound"
              className="link-inline"
            >
              The Channel-Count Confound: A Continental Audit of Multi-Horizon
              Urban Growth Prediction
            </Link>
            , I found that a standard CNN vs. ConvLSTM comparison is not
            really architecture against architecture. When the task moves
            from a 5-year to a 10-year horizon, the benchmark also removes
            the most recent input epoch, cutting the input stack from 24 to
            21 channels. That means horizon length and input availability are
            mixed together.
          </p>

          <p>
            To separate those effects, I built a controlled benchmark over
            5,698 CONUS tiles at 250 m resolution, with a sealed 2020
            temporal holdout, uncertainty calibration, and zero-shot transfer
            from CONUS to Lagos. The results showed that most of the apparent
            CNN decline comes from the channel-count drop, not the longer
            horizon. ConvLSTM also showed strong recency sensitivity. MC
            Dropout ranked error well, but underestimated the actual
            magnitude. And replacing Figure of Merit with MSE could change
            which model looked best.
          </p>

          <p>
            The larger lesson is what matters to me: if the benchmark changes
            the input, metric, or test geography, the reported model ranking
            may be telling us as much about the benchmark as about the model.
          </p>

          <p>
            My next step is to build reusable diagnostics for spatiotemporal
            ML benchmarks: tests for input-design confounds, temporal and
            geographic transfer failure, and uncertainty calibration under
            distribution shift. I do not want this work to stop at one
            urban-growth model. I want to make model comparisons in
            Earth-observation ML more reproducible, interpretable, and
            trustworthy.
          </p>
        </article>

        <section className="mt-16 pt-10 border-t border-rule">
          <p className="overline mb-6">Read further</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link
              href="/research/channel-count-confound"
              className="btn-primary"
            >
              Channel-count project page
            </Link>
            <Link
              href="/research"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Research questions
            </Link>
            <Link
              href="/code"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Code &amp; reproducibility
            </Link>
            <a
              href={asset('/RohanBali_CV.pdf')}
              download
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              CV (PDF)
            </a>
            <Link
              href="/contact"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Contact
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
