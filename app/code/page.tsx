import type { Metadata } from 'next';
import Link from 'next/link';
import CopyableBibtex from '@/components/CopyableBibtex';
import { geoaiPaperUrl } from '@/lib/site';

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
      'The benchmark behind the channel-count audit. CONUS at 250 m, 45 years of GHSL inputs, 5,698 tiles with an 821-tile spatial holdout, a sealed 2020 temporal holdout, CONUS→Lagos transfer, and MC Dropout calibration over 8.69 M validation pixels.',
    links: [
      { label: 'GitHub', href: 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction', external: true },
      { label: 'GeoAI paper (PDF)', href: geoaiPaperUrl, external: true },
      { label: 'Project page', href: '/research/channel-count-confound', external: false },
      { label: 'Reproduce', href: 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction#reproducing-all-experiments', external: true },
    ],
  },
  {
    title: 'Cross-Region Transfer in Earth Observation',
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
            Each repository is organized so that every reported number can be
            regenerated from committed results: experiments run as
            self-contained scripts, results are written as JSON, and the
            figure-generation scripts read those files back. Evaluation uses a
            single shared protocol — the same held-out tile indices across every
            script — and results are reported over multiple seeds.
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
            tests for the models and metrics, the per-experiment results files,
            data-download instructions for GHSL R2023A, and notes on runtime
            (about five GPU-days on a single A100). Pretrained weights are not
            distributed — they are regenerable from the scripts. The GeoAI short
            paper has a Zenodo DOI; a container image and the SpatialDI DOI are
            forthcoming.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-5">Citation</h2>
          <CopyableBibtex
            bibtex={`@inproceedings{bali_channel_count_2026_spatialdi,
  author    = {Bali, Rohan},
  title     = {The Channel-Count Confound: A Continental Audit of Multi-Horizon Urban Growth Prediction},
  booktitle = {SpatialDI 2026, Springer LNCS},
  year      = {2026},
  note      = {Main paper}
}

@inproceedings{bali_channel_count_2026_geoai,
  author    = {Bali, Rohan},
  title     = {Channel Count, Not Horizon Length, Drives Architectural Divergence in Multi-Horizon Urban Growth Prediction},
  booktitle = {GeoAI 2026},
  year      = {2026},
  doi       = {10.5281/zenodo.20278403},
  note      = {Short paper, oral. Companion to the SpatialDI main paper.}
}`}
          />
        </section>
      </div>
    </div>
  );
}
