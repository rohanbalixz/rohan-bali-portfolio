import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import FlagshipHero from '@/components/FlagshipHero';
import MetricCard from '@/components/MetricCard';
import PipelineDiagram from '@/components/PipelineDiagram';
import ReproChecklist from '@/components/ReproChecklist';
import { siteMeta, geoaiPaperUrl } from '@/lib/site';

const researchQuestions = [
  {
    n: '01',
    title: 'Benchmark validity',
    body:
      'When does a model improvement come from architecture, and when does it come from the evaluation setup?',
  },
  {
    n: '02',
    title: 'Geographic transfer',
    body:
      'Which learned representations survive when a model moves from one region to another?',
  },
  {
    n: '03',
    title: 'Uncertainty under shift',
    body:
      'Can uncertainty estimates remain useful when the test distribution changes?',
  },
];

const selectedWork = [
  {
    title: 'The Channel-Count Confound: A Continental Audit of Multi-Horizon Urban Growth Prediction',
    venue: 'SpatialDI 2026 (Springer LNCS) main paper. GeoAI 2026 short paper (oral).',
    body:
      'A continental audit of multi-horizon urban-growth prediction under temporal and geographic shift, with calibrated per-pixel uncertainty on 8.69M validation pixels.',
    href: '/research/channel-count-confound',
    external: false,
    role: 'Flagship',
  },
  {
    title: 'Cross-Region Source-Invariance in Earth Observation',
    venue: 'In preparation, 2026',
    body:
      'A follow-on to the channel-count audit. One model is trained per region and evaluated on every region across twenty world regions, eight tasks, and several input representations. Transfer is governed by the data, not the model: the test region and input representation explain almost all of the score variance while the training region explains almost none.',
    href: 'https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation',
    external: true,
    role: 'In preparation',
  },
  {
    title:
      'UrbanFinance: Forecasting the Latent Land-Demand Residual across Indian Metros',
    venue: 'In preparation, 2026',
    body:
      'Predicts the signed gap between economically expressed demand and EO-realized supply at 100 m across five divergent Indian metros, fusing free GHSL, night-lights, terrain, and NHB RESIDEX layers. DSRF beats SimVP, TAU, and PredRNN.V2 on Figure of Merit at p<0.05 over ten seeds, with calibrated 95% intervals and leave-one-city-out transfer that beats SOTA trained on all five.',
    href: '/publications',
    external: false,
    role: 'In preparation',
  },
  {
    title: 'Disaster Risk Monitoring from Satellite Radar',
    venue: 'NVIDIA DLI, 2025',
    body:
      'U-Net flood segmentation on Sentinel-1 SAR with preprocessing tuned to radar noise. A grounding in real Earth-observation pipelines.',
    href: 'https://github.com/rohanbalixz/Disaster-Risk-Monitoring-Using-Satellite-Imagery',
    external: true,
    role: 'Secondary project',
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Metric strip */}
      <section className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-serif text-2xl text-ink tracking-tight mb-8">
            Headline results
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <MetricCard
              value="5,698"
              description="CONUS tiles at 250 m resolution, with an 821-tile spatial holdout."
            />
            <MetricCard
              value="94"
              unit="%"
              description="of the CNN 5yr to 10yr FoM decline attributes to channel-count reduction."
              tone="secondary"
            />
            <MetricCard
              value="5.4"
              unit="×"
              description="larger ConvLSTM response to removing the most recent epoch."
              tone="secondary"
            />
            <MetricCard
              value="8.69"
              unit="M"
              description="validation pixels audited with MC Dropout calibration (r = 0.983)."
            />
          </div>
        </div>
      </section>

      <FlagshipHero slug="channel-count-confound" variant="home" />

      {/* Research questions */}
      <section className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="font-serif text-2xl text-ink tracking-tight">
              Research questions
            </h2>
            <Link
              href="/research"
              className="text-xs font-mono uppercase tracking-wider text-muted hover:text-accent"
            >
              Research agenda
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {researchQuestions.map((q) => (
              <div
                key={q.n}
                className="border border-rule rounded-2xl bg-surface p-7 card-lift flex flex-col"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-subtle mb-4">
                  Q{q.n}
                </p>
                <h3 className="font-serif text-xl text-ink leading-snug mb-3">
                  {q.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed flex-grow">
                  {q.body}
                </p>
                <Link
                  href="/research/channel-count-confound"
                  className="mt-6 text-xs font-mono uppercase tracking-wider text-accent hover:text-accent-hover"
                >
                  See evidence
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code & reproducibility */}
      <section className="border-t border-rule bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-serif text-2xl text-ink tracking-tight mb-4">
              Code and reproducibility
            </h2>
            <p className="text-base text-ink leading-relaxed text-pretty">
              The benchmark behind the flagship paper ships with every
              experiment as a self-contained script, the results JSONs that
              regenerate the figures, and a sealed evaluation protocol used
              identically across all six models.
            </p>
          </div>

          <PipelineDiagram
            steps={[
              { label: 'GHSL data', detail: '1975 to 2020, 10 epochs' },
              { label: 'Reprojection', detail: 'EPSG:5070 Albers' },
              { label: '250 m tiling', detail: '5,698 CONUS tiles' },
              { label: 'Spatial holdout', detail: 'block_id mod 5 = 0' },
              { label: 'Model training', detail: 'CNN, U-Net, ConvLSTM' },
              { label: 'Channel-matched ablation', detail: 'Multi-horizon control' },
              { label: 'MC Dropout UQ', detail: '20 forward passes' },
              { label: 'Figure generation', detail: 'from results JSONs' },
            ]}
          />

          <div className="mt-12">
            <ReproChecklist
              items={[
                { label: 'Benchmark construction scripts', status: 'yes' },
                { label: 'Evaluation scripts', status: 'yes' },
                { label: 'Figure generation scripts', status: 'yes' },
                { label: 'Holdout definitions', status: 'yes' },
                { label: 'Ablation tables', status: 'yes' },
                { label: 'Code repository', status: 'yes' },
                { label: 'Docker image', status: 'no', detail: 'planned' },
                { label: 'Zenodo DOI (GeoAI)', status: 'yes' },
                { label: 'Zenodo DOI (SpatialDI)', status: 'no', detail: 'forthcoming' },
              ]}
            />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/code" className="btn-primary">
                Full code page
              </Link>
              <a
                href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction"
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent text-sm"
              >
                Repository
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="font-serif text-2xl text-ink tracking-tight">
              Selected work
            </h2>
            <Link
              href="/archive"
              className="text-xs font-mono uppercase tracking-wider text-muted hover:text-accent"
            >
              Engineering archive
            </Link>
          </div>
          <ul className="divide-y divide-rule">
            {selectedWork.map((w) => {
              const TitleLink = w.external ? (
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  {w.title}
                </a>
              ) : (
                <Link
                  href={w.href}
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  {w.title}
                </Link>
              );

              return (
                <li key={w.title} className="py-6 first:pt-0 last:pb-0">
                  <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-10">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-secondary mb-2">
                        {w.role}
                      </p>
                      <h3 className="font-serif text-lg text-ink leading-snug mb-2">
                        {TitleLink}
                      </h3>
                      <p className="text-xs font-mono uppercase tracking-wider text-subtle">
                        {w.venue}
                      </p>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{w.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* For supervisors */}
      <section className="border-t border-rule bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl md:text-3xl text-ink tracking-tight leading-snug mb-6">
              For research supervisors
            </h2>
            <p className="text-base text-muted leading-loose mb-8 max-w-2xl">
              I am most interested in projects involving robust computer
              vision, uncertainty calibration, Earth-observation ML,
              representation learning, and evaluation under distribution
              shift. The flagship project page is the fastest read.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              <Link href="/cv" className="btn-primary">
                CV
              </Link>
              <Link href="/research-statement" className="btn-secondary">
                Research statement
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
              <a
                href={`mailto:${siteMeta.email}`}
                className="link-inline"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
