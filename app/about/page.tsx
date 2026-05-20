import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Short, research-focused bio for Rohan Bali: M.S. Data Science at UMass Dartmouth, working on robust spatiotemporal vision and Earth-observation ML.",
};

export default function AboutPage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12 max-w-2xl">
          <p className="overline mb-4">About</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-[-0.025em] leading-[1.1] text-balance">
            A short, research-focused bio.
          </h1>
        </header>

        <div className="prose-research space-y-6 max-w-prose">
          <p>
            I am an M.S. Data Science student at the University of Massachusetts
            Dartmouth working on robust spatiotemporal vision and
            Earth-observation ML. My current work audits benchmark confounds
            in multi-horizon urban-growth prediction and tests whether model
            comparisons survive temporal and geographic shift.
          </p>
          <p>
            Previously, I worked as a software engineer at Capgemini and as
            an ML trainee at Upcred.ai, where I built automation, scraping,
            and data workflows. That background now supports my research
            engineering: reproducible pipelines, ablations, and benchmark
            construction.
          </p>
        </div>

        <section className="mt-12 pt-10 border-t border-rule max-w-prose">
          <p className="overline mb-4">Affiliation</p>
          <dl className="space-y-3 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-y-1 sm:gap-x-4">
              <dt className="font-mono text-xs uppercase tracking-wider text-subtle pt-0.5">
                Institution
              </dt>
              <dd className="text-ink">
                M.S. Data Science, University of Massachusetts Dartmouth
              </dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-y-1 sm:gap-x-4">
              <dt className="font-mono text-xs uppercase tracking-wider text-subtle pt-0.5">
                Advisor
              </dt>
              <dd className="text-ink">
                <a
                  href="https://www.umassd.edu/directory/dyan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline"
                >
                  Dr. Donghui Yan
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-y-1 sm:gap-x-4">
              <dt className="font-mono text-xs uppercase tracking-wider text-subtle pt-0.5">
                Thesis
              </dt>
              <dd className="text-ink">
                Multi-Horizon Urban Growth Prediction: A Comparative Deep
                Learning Study
              </dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-y-1 sm:gap-x-4">
              <dt className="font-mono text-xs uppercase tracking-wider text-subtle pt-0.5">
                Location
              </dt>
              <dd className="text-ink">Boston, MA</dd>
            </div>
          </dl>
        </section>

        <div className="mt-14 pt-10 border-t border-rule flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <Link
            href="/research/channel-count-confound"
            className="btn-primary"
          >
            Flagship project
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/cv"
            className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
          >
            CV
          </Link>
          <Link
            href="/contact"
            className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
