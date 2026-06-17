import type { Metadata } from 'next';
import Link from 'next/link';
import { asset } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Research statement',
  description:
    'My research statement. I work on how Earth-observation models are evaluated, on benchmark confounds, geographic transfer, and whether uncertainty estimates hold up when the data shifts.',
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
            This all started from one question. When a deep model looks better,
            is it actually learning something better, or did the benchmark
            quietly make the comparison unfair?
          </p>

          <p>
            I work on spatiotemporal vision for Earth observation. These models
            get tested across time and geography, but the test setup is often
            not as clean as it looks. The input pipeline can shift with the
            prediction horizon. One metric can crown a model while another
            metric picks the opposite one. A model that does fine in one region
            can fall apart in the next. I care about these spots because they
            are where our beliefs about a model actually come from.
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
            , I found that the usual CNN versus ConvLSTM comparison is not
            really one architecture against another. When the task moves from a
            5-year to a 10-year horizon, the benchmark also drops the most
            recent input epoch, cutting the input stack from 24 channels to 21.
            So horizon length and input availability end up tangled together.
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
            The part that stays with me is the bigger lesson. If the benchmark
            changes the input, the metric, or the test geography, the ranking it
            hands you might be saying as much about the benchmark as about the
            model.
          </p>

          <p>
            Next I want to turn this into reusable checks for spatiotemporal ML
            benchmarks. Things that catch input-design confounds, flag where a
            model stops transferring across time or geography, and test whether
            its uncertainty still means anything once the data shifts. I do not
            want it to end at one urban-growth model. The point is to make model
            comparisons in this field easier to reproduce and easier to trust.
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
              href="/#research"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Research
            </Link>
            <Link
              href="/code"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Code &amp; data
            </Link>
            <a
              href={asset('/RohanBali_CV.pdf')}
              download
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              CV (PDF)
            </a>
            <Link
              href="/#contact"
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
