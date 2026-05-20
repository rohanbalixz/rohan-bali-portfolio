import type { Metadata } from 'next';
import Link from 'next/link';
import { siteMeta } from '@/lib/site';
import SocialLinks from '@/components/SocialLinks';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact details, fastest-path links, and supervisor-facing materials.',
};

const fastestPath = [
  {
    n: 1,
    title: 'Read the flagship project page',
    href: '/research/channel-count-confound',
    detail: 'Methods, results, claim stack, reproducibility checklist.',
    internal: true,
  },
  {
    n: 2,
    title: 'Jump to the headline results',
    href: '/research/channel-count-confound#results',
    detail: 'Four main results, three figures, two result tables. PDFs for the SpatialDI main paper and the GeoAI 2026 short paper are coming soon.',
    internal: true,
  },
  {
    n: 3,
    title: 'Check the benchmark code repository',
    href: 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction',
    detail:
      'Scripts, tests, results JSONs, evaluation protocol, hardware notes.',
    internal: false,
  },
];

export default function ContactPage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-14 max-w-2xl">
          <p className="overline mb-4">Contact</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-[-0.025em] leading-[1.1] mb-6 text-balance">
            For research supervisors and collaborators.
          </h1>
          <p className="text-base text-muted leading-loose">
            I am most interested in projects involving robust computer vision,
            uncertainty calibration, Earth-observation ML, representation
            learning, and evaluation under distribution shift.
          </p>
        </header>

        <section className="border-t border-rule pt-12 mb-16">
          <p className="overline mb-6">Fastest path</p>
          <ol className="space-y-4">
            {fastestPath.map((step) => {
              const Wrapper = step.internal ? Link : 'a';
              const extra = step.internal
                ? {}
                : { target: '_blank', rel: 'noopener noreferrer' };
              return (
                <li key={step.n}>
                  <Wrapper
                    href={step.href}
                    {...extra}
                    className="group block border border-rule rounded-2xl bg-surface p-5 card-lift"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-serif text-2xl text-accent tabular leading-none flex-shrink-0">
                        {String(step.n).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-serif text-lg text-ink leading-snug group-hover:text-accent transition-colors">
                          {step.title}
                        </p>
                        <p className="text-sm text-muted leading-relaxed mt-1.5">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </Wrapper>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="border-t border-rule pt-12 mb-16">
          <p className="overline mb-6">Direct links</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href={`mailto:${siteMeta.email}`}
              className="btn-primary"
            >
              Email
            </a>
            <Link href="/cv" className="btn-secondary">
              CV
            </Link>
            <Link href="/research-statement" className="btn-secondary">
              Research statement
            </Link>
            <span
              className="text-subtle italic cursor-default"
              aria-disabled="true"
            >
              Paper (coming soon)
            </span>
            <a
              href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction"
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Code
            </a>
          </div>
        </section>

        <section className="border-t border-rule pt-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <p className="overline mb-3">Email</p>
              <a
                href={`mailto:${siteMeta.email}`}
                className="font-serif text-lg text-ink hover:text-accent transition-colors"
              >
                {siteMeta.email}
              </a>
            </div>
            <div>
              <p className="overline mb-3">Location</p>
              <p className="font-serif text-lg text-ink">Boston, MA</p>
              <p className="text-xs font-mono text-subtle mt-2">
                {siteMeta.affiliation}
              </p>
            </div>
            <div>
              <p className="overline mb-3">Elsewhere</p>
              <SocialLinks />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
