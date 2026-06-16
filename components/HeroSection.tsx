import Link from 'next/link';
import Image from 'next/image';
import { asset } from '@/lib/site';

export default function HeroSection() {
  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[7fr_5fr] gap-12 lg:gap-20 items-start">
          <div>
            <h1 className="font-serif font-medium text-5xl md:text-7xl text-ink tracking-[-0.035em] leading-[1.02] text-balance mb-8">
              Rohan Bali
            </h1>

            <p className="font-serif text-xl md:text-2xl text-ink leading-snug mb-8 max-w-xl text-pretty">
              I work on robust spatiotemporal vision for Earth observation.
            </p>

            <p className="text-base text-muted leading-loose max-w-xl mb-3">
              My current paper audits a benchmark confound in multi-horizon
              urban-growth prediction over CONUS, with sealed temporal
              holdouts, zero-shot geographic transfer to Lagos, and calibrated
              MC Dropout uncertainty.
            </p>
            <p className="text-base text-muted leading-loose max-w-xl mb-10">
              I&apos;m an M.S. Data Science student at the University of
              Massachusetts Dartmouth. Before that I worked as a software
              engineer at Capgemini and as an ML trainee at Upcred.ai.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10">
              <Link
                href="/research/channel-count-confound"
                className="btn-primary"
              >
                Read the paper
              </Link>
              <a
                href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction"
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent text-sm"
              >
                Code
              </a>
              <Link
                href="/cv"
                className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent text-sm"
              >
                CV
              </Link>
              <Link
                href="/contact"
                className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent text-sm"
              >
                Contact
              </Link>
            </div>

            <p className="text-xs font-mono uppercase tracking-wider text-subtle">
              GeoAI <span className="text-rule">·</span> Robust Computer Vision{' '}
              <span className="text-rule">·</span> Earth Observation{' '}
              <span className="text-rule">·</span> Evaluation under Shift
            </p>
          </div>

          <figure className="lg:pt-2">
            <div className="relative w-full aspect-[4/3] bg-surface border border-rule overflow-hidden">
              <Image
                src={asset('/paper_figures/fig_multihorizon.png')}
                alt="Multi-horizon FoM with the channel-matched CNN control isolating the true horizon effect from the channel-count confound."
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
              />
            </div>
            <figcaption className="mt-4 text-xs font-mono text-subtle leading-relaxed">
              <span className="text-muted">Fig. 1.</span> Channel-matched
              controls (open markers) isolate the true horizon effect from
              the channel-count confound. Most of the apparent CNN decline
              from 5yr to 10yr horizons is driven by input-channel reduction,
              not horizon length.
            </figcaption>
            <p className="mt-5 text-xs font-mono text-subtle">
              From{' '}
              <Link
                href="/research/channel-count-confound"
                className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
              >
                The Channel-Count Confound
              </Link>
              . SpatialDI 2026 main paper. GeoAI 2026 short paper, oral. GeoAI
              PDF on Zenodo; SpatialDI forthcoming.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}
