import type { Metadata } from 'next';
import Link from 'next/link';
import CopyableBibtex from '@/components/CopyableBibtex';
import { geoaiPaperUrl } from '@/lib/site';
import { channelCountBibtex, tgisBibtex } from '@/lib/citations';

export const metadata: Metadata = {
  title: 'Code & data',
  description:
    'Open code and data for the benchmarks behind the papers, with reproduction instructions and citations.',
};

const repos = [
  {
    title: 'Multi-Horizon Urban Growth Prediction',
    href: 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction',
    body:
      'The benchmark behind the channel-count audit, with trained weights. CONUS at 250 m, 45 years of GHSL inputs, 5,698 tiles with an 821-tile spatial holdout, a sealed 2020 temporal holdout, a cold transfer from CONUS to Lagos, and MC Dropout calibration over 8.69 M validation pixels.',
    links: [
      { label: 'GitHub', href: 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction', external: true },
      { label: 'GeoAI paper (PDF)', href: geoaiPaperUrl, external: true },
      { label: 'Project page', href: '/research/channel-count-confound', external: false },
      { label: 'Reproduce', href: 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction#reproducing-all-experiments', external: true },
    ],
  },
  {
    title: 'Confident but Unidentifiable',
    href: 'https://github.com/rohanbalixz/Confident-but-Unidentifiable-Positivity-Limits-on-Cross-Region-Attribution-in-Geospatial-Models',
    body:
      'The positivity diagnostic, the partial-identification bound, and every result file and figure for the Transactions in GIS paper: transfer from the contiguous US to 44 cities in four world regions. One command, bash reproduce.sh, regenerates its result files and figures from the processed per-tile covariates, with no GPU or network access needed.',
    links: [
      { label: 'GitHub', href: 'https://github.com/rohanbalixz/Confident-but-Unidentifiable-Positivity-Limits-on-Cross-Region-Attribution-in-Geospatial-Models', external: true },
      { label: 'Project page', href: '/research/confident-but-unidentifiable', external: false },
    ],
  },
  {
    title: 'Cross-Region Source-Invariance in Earth Observation',
    href: 'https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation',
    body:
      'The source-by-target transfer matrices, evaluation scripts, holdout definitions, and figure-generation code for the cross-region study spanning twenty world regions and several input representations.',
    links: [
      { label: 'GitHub', href: 'https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation', external: true },
    ],
  },
];

export default function CodePage() {
  return (
    <div className="py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-8">
            Code &amp; data
          </h1>
          <p className="prose-research">
            The benchmarks and analysis behind the papers are openly available.
            Each repository is organized so that every figure and table can be
            redrawn from committed result files: experiments run as
            self-contained scripts, results are written as JSON, and the
            figure-generation scripts read those files back. Evaluation runs on
            one shared protocol, the same held-out tile indices across every
            script, and the neural models are trained with two seeds (0 and 42).
          </p>
        </header>

        <section className="mb-16">
          <h2 className="font-serif text-xl text-ink mb-8">Repositories</h2>
          <ol className="space-y-10">
            {repos.map((r) => (
              <li key={r.title} className="border-t border-rule pt-6">
                <h3 className="font-serif text-lg text-ink leading-snug mb-2">
                  {r.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-3 text-pretty">
                  {r.body}
                </p>
                <p className="text-sm text-muted">
                  {r.links.map((l, i) => (
                    <span key={l.label}>
                      {i > 0 && <span className="text-rule mx-2">·</span>}
                      {l.external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="link-inline">
                          {l.label}
                        </Link>
                      )}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16">
          <h2 className="font-serif text-xl text-ink mb-5">Reproducibility</h2>
          <p className="prose-research">
            The Multi-Horizon repository ships under an MIT license with unit
            tests for the models, the per-experiment results files,
            data-download instructions for GHSL R2023A, and notes on runtime
            (about five GPU-days on a single A100). The trained checkpoints for
            all ten reported neural models are in its{' '}
            <a
              href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction#pre-trained-weights"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              models/ folder
            </a>
            , with checksums and a loading example. The GeoAI
            paper has a Zenodo DOI. A container image is still to come, and the
            SpatialDI paper will get its DOI from Springer.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-5">Citation</h2>
          <CopyableBibtex
            bibtex={`${channelCountBibtex}\n\n${tgisBibtex}`}
          />
        </section>
      </div>
    </div>
  );
}
