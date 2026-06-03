import type { Metadata } from 'next';
import Link from 'next/link';
import PipelineDiagram from '@/components/PipelineDiagram';
import ReproChecklist from '@/components/ReproChecklist';
import CopyableBibtex from '@/components/CopyableBibtex';
import { geoaiPaperUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Code & Reproducibility',
  description:
    'Open research code, reproducible benchmark scripts, and the full pipeline behind the Multi-Horizon Urban Growth Prediction benchmark.',
};

export default function CodePage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16 max-w-2xl">
          <p className="overline mb-4">Code &amp; reproducibility</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-[-0.025em] leading-[1.1] mb-6 text-balance">
            Research code, evaluation scripts, and the full pipeline behind
            every claim.
          </h1>
          <p className="text-base text-muted leading-loose">
            The repository below contains the experimental pipeline behind the
            channel-count confound benchmark: data preprocessing, holdout
            definitions, model training, channel-matched ablations, MC&nbsp;Dropout
            uncertainty, and the figure-generation scripts that regenerate
            every plot in the paper from the committed results JSONs.
          </p>
        </header>

        <section className="border-t border-rule pt-12 mb-20">
          <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12 mb-10">
            <div>
              <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">
                Multi-Horizon Urban Growth Benchmark
              </h2>
            </div>
            <div>
              <p className="text-base text-ink leading-relaxed mb-3 text-pretty">
                A reproducible benchmark for testing spatiotemporal vision
                models under horizon shift, channel-count controls, sealed
                temporal holdouts, and zero-shot geographic transfer.
              </p>
              <p className="text-sm text-muted leading-relaxed mb-6">
                CONUS at 250&nbsp;m, 45 years of GHSL inputs, 5,698 spatial
                tiles, 821-tile spatial holdout, sealed 2020 temporal holdout,
                CONUS&nbsp;→&nbsp;Lagos transfer, MC&nbsp;Dropout calibration
                on 8.69&nbsp;M validation pixels.
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm mb-8">
                <a
                  href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  GitHub
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={geoaiPaperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  GeoAI paper (PDF)
                </a>
                <Link
                  href="/research/channel-count-confound#results"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  Figures
                </Link>
                <a
                  href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction/blob/main/requirements.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  Environment
                </a>
                <a
                  href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction#reproducing-all-experiments"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  Reproduce results
                </a>
                <Link
                  href="/research/channel-count-confound"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  Project page
                </Link>
              </div>
            </div>
          </div>

          <p className="overline mb-2">Pipeline</p>
          <PipelineDiagram
            steps={[
              { label: 'GHSL data', detail: '1975–2020 · 10 epochs' },
              { label: 'Reprojection', detail: 'EPSG:5070 · Albers' },
              { label: '250 m tiling', detail: '5,698 CONUS tiles' },
              { label: 'Spatial holdout', detail: 'block_id mod 5 = 0' },
              { label: 'Model training', detail: 'CNN · U-Net · ConvLSTM' },
              { label: 'Channel-matched ablation', detail: 'Multi-horizon control' },
              { label: 'MC Dropout UQ', detail: '20 forward passes' },
              { label: 'Figure generation', detail: 'from results JSONs' },
            ]}
            caption="The full benchmark pipeline. Every stage is implemented as a self-contained script under scripts/; results are written as JSON and read back by the figure-generation scripts."
          />
        </section>

        <section className="border-t border-rule pt-12 mb-20">
          <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12">
            <div>
              <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">
                Reproducibility status
              </h2>
            </div>
            <div>
              <p className="text-base text-muted leading-relaxed mb-6 max-w-prose">
                What ships with the repository today and what is on the path
                to next release. Every &ldquo;yes&rdquo; row is verifiable
                inside{' '}
                <a
                  href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline"
                >
                  the repo
                </a>
                .
              </p>
              <ReproChecklist
                items={[
                  { label: 'MIT license', status: 'yes' },
                  { label: 'BibTeX citation', status: 'yes', detail: 'CITATION.bib' },
                  { label: 'Tests', status: 'yes', detail: 'Model and metric units' },
                  { label: 'Results JSONs', status: 'yes', detail: '25 per-experiment files' },
                  { label: 'Figure generation scripts', status: 'yes' },
                  { label: 'Sealed evaluation protocol', status: 'yes', detail: 'val_tile_indices.json shared across every script' },
                  { label: 'Multi-seed reporting', status: 'yes', detail: 'Seeds 0 and 42' },
                  { label: 'Data download instructions', status: 'yes', detail: 'GHSL R2023A from Copernicus' },
                  { label: 'Hardware / runtime', status: 'yes', detail: '~5 GPU-days on a single A100' },
                  { label: 'CITATION.cff', status: 'no', detail: 'planned at release' },
                  { label: 'Pretrained weights', status: 'no', detail: 'Regenerable; not distributed' },
                  { label: 'Docker / smoke test', status: 'no', detail: 'planned' },
                  { label: 'Zenodo DOI', status: 'no', detail: 'reserved · publishing soon' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-rule pt-12">
          <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12">
            <div>
              <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">
                Citation
              </h2>
            </div>
            <div>
              <CopyableBibtex
                bibtex={`@inproceedings{bali_channel_count_2026_spatialdi,
  author    = {Bali, Rohan},
  title     = {The Channel-Count Confound: A Continental Audit of Multi-horizon Urban Growth Prediction},
  booktitle = {SpatialDI 2026, Springer LNCS},
  year      = {2026},
  note      = {Main paper}
}

@inproceedings{bali_channel_count_2026_geoai,
  author    = {Bali, Rohan},
  title     = {Channel Count, Not Horizon Length, Drives Architectural Divergence in Multi-horizon Urban Growth Prediction},
  booktitle = {GeoAI 2026},
  year      = {2026},
  note      = {6-page short paper, oral. Companion to the SpatialDI main paper. Zenodo DOI forthcoming.}
}`}
              />
              <p className="mt-6 text-sm text-muted">
                Two peer-reviewed artifacts describe this benchmark: the full
                paper at SpatialDI&nbsp;2026 (Springer LNCS) and a 6-page
                short paper companion at GeoAI&nbsp;2026 (oral). The{' '}
                <a
                  href={geoaiPaperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  GeoAI short paper is available on Zenodo
                </a>
                ; the SpatialDI camera-ready PDF will be wired in here when the
                venue releases.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
