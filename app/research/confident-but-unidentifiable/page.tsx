import type { Metadata } from 'next';
import Link from 'next/link';
import { asset } from '@/lib/site';
import StickyToc from '@/components/StickyToc';
import MetricCard from '@/components/MetricCard';
import CopyableBibtex from '@/components/CopyableBibtex';
import { tgisBibtex } from '@/lib/citations';

const REPO =
  'https://github.com/rohanbalixz/Confident-but-Unidentifiable-Positivity-Limits-on-Cross-Region-Attribution-in-Geospatial-Models';

export const metadata: Metadata = {
  title:
    'Confident but Unidentifiable: Positivity Limits on Cross-Region Attribution in Geospatial Models',
  description:
    'When a geospatial model fails in a new region, can the failure be attributed to measured covariates at all? A positivity diagnostic and partial-identification bound, applied to transfer from the contiguous US to 44 cities in four world regions. In major revision at Transactions in GIS.',
};

const toc = [
  { id: 'summary', label: 'Summary' },
  { id: 'question', label: 'The question' },
  { id: 'idea', label: 'The idea' },
  { id: 'findings', label: 'Findings' },
  { id: 'implication', label: 'What it implies' },
  { id: 'repro', label: 'Reproducibility' },
  { id: 'citation', label: 'Citation' },
];

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="border-t border-rule scroll-mt-24">
    <div className="py-14 md:py-16">
      <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12">
        <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">
          {title}
        </h2>
        <div className="prose-research">{children}</div>
      </div>
    </div>
  </section>
);

const Figure = ({
  src,
  alt,
  n,
  children,
}: {
  src: string;
  alt: string;
  n: number;
  children: React.ReactNode;
}) => (
  <figure className="my-10">
    <div className="bg-white border border-rule p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(src)} alt={alt} loading="lazy" className="w-full h-auto" />
    </div>
    <figcaption className="mt-3 text-xs font-mono text-subtle leading-relaxed">
      <span className="text-muted">Fig.&nbsp;{n}.</span> {children}
    </figcaption>
  </figure>
);

export default function ConfidentButUnidentifiablePage() {
  return (
    <article>
      <header className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="overline mb-3">Paper</p>
              <div className="flex flex-col gap-1.5">
                <span className="badge badge-accent">Transactions in GIS (Wiley)</span>
                <span className="badge badge-secondary">Major revision</span>
                <span className="badge">Sole author · Code and data public</span>
              </div>
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight leading-tight mb-4 text-balance">
                Confident but Unidentifiable: Positivity Limits on Cross-Region
                Attribution in Geospatial Models
              </h1>
              <p className="text-sm text-ink mb-6">
                <span className="font-medium">Rohan Bali</span>
              </p>
              <p className="text-base text-muted leading-relaxed mb-8 text-pretty">
                When a model trained in one region fails in another, the usual
                move is to blame a covariate. This paper asks whether the data
                can support that explanation at all, and finds that, for a
                confident and well-fit explanation, the answer can be no.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <a href={REPO} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Code &amp; data
                </a>
                <span className="btn-secondary opacity-60 cursor-default" aria-disabled="true">
                  Paper (under revision)
                </span>
                <a href="#citation" className="btn-secondary">
                  BibTeX
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid xl:grid-cols-[200px_1fr] gap-12">
          <aside className="xl:pt-14">
            <StickyToc items={toc} />
          </aside>

          <div className="max-w-4xl">
            <Section id="summary" title="Summary">
              <p>
                Geospatial models trained in one region routinely fail in
                another, and explainable-AI methods are increasingly used to
                attribute that failure to measured covariates. We ask whether
                such attribution is even <em>identifiable</em>. Framing it as
                transportability, we derive a positivity diagnostic and a
                partial-identification bound that marks when even the sign of
                an attribution is undetermined. For land-cover models
                transferred from the contiguous United States to 44 cities in
                four regions, target covariates fall inside the source support
                far less often than held-out source data do, least of all in
                the Andes, and a confident covariate explanation predicts the
                wrong sign of the gap for all three degrading architectures.
                Separating positivity from conditional invariance shows the
                first fails in the Andes, while elsewhere the evidence is at
                odds with the second, most clearly in South Asia. This
                single-setting study illustrates a proposed standard: honest
                explanation must report identifiability, not just attributions.
              </p>
              <p className="text-sm text-muted">
                Abstract of the revised manuscript, as posted in the{' '}
                <a href={REPO} target="_blank" rel="noopener noreferrer" className="link-inline">
                  repository
                </a>
                . Numbers on this page come from its result files.
              </p>
            </Section>

            <Section id="question" title="The question">
              <p>
                A model that predicts built-up growth well across the United
                States loses skill in Lima or Lagos. A natural next step is to
                fit how performance depends on terrain, roads, and settlement
                form, and read the transfer gap off that fit: the target is
                rougher, so the model does worse. That reading assumes two
                things. The target’s covariates have to fall where the
                source data can say something about them (positivity), and the
                relationship between covariates and performance has to carry
                over between regions (conditional invariance).
              </p>
              <p>
                The paper checks both assumptions directly, using 12 covariates
                on three axes, terrain, transport, and settlement, for every
                tile, and five trained architectures predicting 2015 GHSL
                built-up surface at 250&nbsp;m.
              </p>
            </Section>

            <Section id="idea" title="The idea">
              <p>
                Inside the source support, any performance surface consistent
                with the data agrees with the observed one. Outside it, the
                data stop constraining the surface, and the admissible surfaces
                fan out until they hit the outcome bounds. The attributable gap
                is then a set, not a number, and when that set straddles zero
                the sign of the attribution is not identified.
              </p>
              <Figure
                src="/paper_figures/tgis_schematic.png"
                alt="Schematic of the identified set. Over the observed source sample the performance surface is pinned down; past a tolerance band tau, admissible surfaces diverge upward and downward until they are clipped at 0 and 1."
                n={1}
              >
                The identified set off the support. Admissible surfaces agree on
                the source, then fan out with distance past a tolerance band
                τ, capped at the outcome bounds 0 and 1.
              </Figure>
            </Section>

            <Section id="findings" title="Findings">
              <div className="grid sm:grid-cols-3 gap-4 mb-10 not-prose">
                <MetricCard
                  value="5.8"
                  unit="%"
                  description="of Andes target tiles fall inside the source covariate support, against 77% of held-out US tiles."
                  tone="secondary"
                />
                <MetricCard
                  value="3 / 3"
                  description="degrading architectures (CNN, U-Net, ConvLSTM) where the covariate explanation predicts the wrong sign of the gap, in all four regions."
                  tone="secondary"
                />
                <MetricCard
                  value="4 / 4"
                  description="regions where, at the primary setting, the sign of the attributable gap is not identified and the observed gap lies outside the identified set."
                />
              </div>

              <p>
                <strong className="text-ink">Positivity fails, unevenly.</strong>{' '}
                Under a 12-dimensional percentile box, the primary support
                estimator, 77% of held-out US tiles fall inside the source
                support. Only 42% to 50% of tiles in Sub-Saharan Africa, South
                Asia, and East Asia do, and 5.8% in the Andes. The Andes is the
                lowest under all nine support estimators tested.
              </p>
              <Figure
                src="/paper_figures/tgis_positivity.png"
                alt="Left: share of target tiles inside the source support under the primary estimator, Andes 5.8%, Sub-Saharan Africa 44.6%, South Asia 50.2%, East Asia 42.3%, with held-out CONUS at 77%. Right: the same shares relative to held-out CONUS under nine support estimators; the Andes is lowest under every one."
                n={2}
              >
                Target tiles in the source support. (a) Primary estimator, with
                city-cluster 95% intervals. (b) Nine support estimators; the
                Andes is lowest under every one.
              </Figure>

              <p>
                <strong className="text-ink">
                  A confident explanation points the wrong way.
                </strong>{' '}
                A covariate model of performance fits held-out US data well,
                with R² of about 0.48 to 0.57 for the three architectures whose
                skill degrades. Yet it predicts the wrong sign of the transfer
                gap for all three, in all four regions. The explanation is not
                just uncertain. It points in the opposite direction.
              </p>
              <p>
                <strong className="text-ink">The bound says why.</strong> At the
                primary tolerance, the identified set for the
                covariate-attributable gap straddles zero in every region, so
                its sign is not identified from the data. The observed gap lies
                outside the set in every region, which is inconsistent with the
                gap being transported by the measured covariates alone.
              </p>
              <Figure
                src="/paper_figures/tgis_intervals.png"
                alt="For each of four regions and three tolerance settings, horizontal bars show the identified set for the covariate-attributable gap, and an orange line marks the observed gap. At the primary setting every set straddles zero and every observed gap lies to its left, outside the set."
                n={3}
              >
                Where the observed gap falls relative to the identified set, for
                three choices of the tolerance τ. A set that straddles zero
                means the sign is unidentified; an observed gap outside the set
                is inconsistent with transport.
              </Figure>
            </Section>

            <Section id="implication" title="What it implies">
              <p>
                An attribution can be stable, well fit, and confidently
                reported while saying nothing about the target region, or the
                opposite of the truth. The paper proposes a reporting standard:
                a cross-region explanation should state how much of the target
                falls inside the source support and what the data can and
                cannot identify, not just which covariates it credits.
              </p>
              <p>
                It is one setting, land-cover transfer from the contiguous US,
                and the paper says so. The diagnostic itself needs only the
                source data and the target covariates, so it can be run before
                any explanation is trusted.
              </p>
            </Section>

            <Section id="repro" title="Reproducibility">
              <p>
                The repository regenerates the paper’s result files and
                figures with one command,{' '}
                <code className="font-mono text-sm">bash reproduce.sh</code>.
                Two result files that come from a broader evaluation pipeline
                are included as provided.
                It needs no GPU, network access, or external data: the analysis
                runs on the processed per-tile files included in the repository,
                and each reported quantity has its own result file. Code is MIT
                licensed. The covariates come from the Copernicus GLO-30 DEM,
                OpenStreetMap, and GHSL, and were computed with the pipeline in{' '}
                <a
                  href="https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline"
                >
                  Cross-Region-Source-Invariance-in-Earth-Observation
                </a>
                .
              </p>
            </Section>

            <Section id="citation" title="Citation">
              <CopyableBibtex bibtex={tgisBibtex} />
              <p className="mt-6 text-sm text-muted">
                The paper is in major revision at Transactions in GIS.
                This entry will be updated with volume and DOI once it is
                published.
              </p>
            </Section>

            <div className="border-t border-rule py-12 flex flex-wrap items-center justify-between gap-6">
              <Link
                href="/research"
                className="text-xs font-mono uppercase tracking-wider text-muted hover:text-accent"
              >
                &larr; Research
              </Link>
              <Link
                href="/research/channel-count-confound"
                className="text-xs font-mono uppercase tracking-wider text-muted hover:text-accent"
              >
                The channel-count study &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
