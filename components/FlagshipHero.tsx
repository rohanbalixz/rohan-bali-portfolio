import Link from 'next/link';
import Image from 'next/image';
import { asset, geoaiPaperUrl } from '@/lib/site';

interface FlagshipHeroProps {
  slug: string;
  variant?: 'home' | 'page';
}

export default function FlagshipHero({
  slug,
  variant = 'home',
}: FlagshipHeroProps) {
  return (
    <section className="border-t border-rule">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <div>
            <p className="overline mb-3">Flagship research</p>
            <div className="flex flex-col gap-1.5 mb-6">
              <span className="badge badge-accent">SpatialDI 2026 (Springer LNCS)</span>
              <span className="badge badge-secondary">GeoAI 2026 Short Paper (Oral)</span>
              <span className="badge">Sole author · Reproducible benchmark</span>
            </div>
          </div>

          <div>
            {variant === 'page' ? (
              <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight leading-tight mb-4 text-balance">
                The Channel-Count Confound: A Continental Audit of Multi-horizon
                Urban Growth Prediction
              </h1>
            ) : (
              <h2 className="font-serif text-3xl md:text-4xl text-ink tracking-tight leading-tight mb-4 text-balance">
                The Channel-Count Confound: A Continental Audit of Multi-horizon
                Urban Growth Prediction
              </h2>
            )}

            <p className="text-base text-muted leading-relaxed mb-8 text-pretty">
              A continental audit of CNN and ConvLSTM comparisons on 305M
              CONUS pixels. Under sealed 2020 temporal holdouts, zero-shot
              transfer to Lagos, and MC Dropout calibration, the apparent
              ConvLSTM advantage at longer horizons turns out to be a
              channel-count artefact, not a representational benefit.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="overline mb-2">Problem</p>
                <p className="text-sm text-ink leading-relaxed">
                  Multi-horizon urban-growth benchmarks change forecast
                  horizon and input-channel count at the same time.
                </p>
              </div>
              <div>
                <p className="overline mb-2">Finding</p>
                <p className="text-sm text-ink leading-relaxed">
                  94% of the CNN 5yr to 10yr FoM decline is explained by
                  channel-count reduction, not horizon length.
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

            <div className="flex flex-wrap items-center gap-5 text-sm">
              {variant === 'home' ? (
                <>
                  <Link
                    href={`/research/${slug}`}
                    className="btn-primary"
                  >
                    Project page
                  </Link>
                  <a
                    href={geoaiPaperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                  >
                    GeoAI paper (PDF)
                  </a>
                  <a
                    href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                  >
                    Code
                  </a>
                  <Link
                    href={`/research/${slug}#citation`}
                    className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                  >
                    BibTeX
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href={geoaiPaperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    GeoAI paper (PDF)
                  </a>
                  <span
                    className="btn-secondary opacity-60 cursor-default"
                    aria-disabled="true"
                  >
                    SpatialDI paper (coming soon)
                  </span>
                  <a
                    href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Code
                  </a>
                </>
              )}
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
              priority={variant === 'page'}
            />
          </div>
          <figcaption className="mt-4 text-xs font-mono text-subtle leading-relaxed max-w-prose">
            <span className="text-muted">
              Fig. {variant === 'page' ? '1' : '2'}.
            </span>{' '}
            Representative validation tile from the 821-tile 2015 spatial
            holdout. From left: GHSL ground truth, ConvLSTM prediction, and
            MC Dropout uncertainty over 20 stochastic forward passes.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
