import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { asset, geoaiPaperUrl } from '@/lib/site';
import FlagshipHero from '@/components/FlagshipHero';
import ResultsTable from '@/components/ResultsTable';
import ReproChecklist from '@/components/ReproChecklist';
import ClaimStack from '@/components/ClaimStack';
import MetricCard from '@/components/MetricCard';
import CopyableBibtex from '@/components/CopyableBibtex';
import { channelCountBibtex } from '@/lib/citations';

export const metadata: Metadata = {
  title: 'The channel-count study',
  description:
    'One benchmark of multi-horizon urban-growth prediction, two papers: a short paper at GeoAI 2026 (oral) and a full-length paper at SpatialDI 2026 (Springer LNCS). Sealed temporal holdouts, zero-shot transfer to Lagos, and MC Dropout calibration over 8.69M validation pixels.',
};

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="mt-10 scroll-mt-8">
    <h2 className="section-title">{title}</h2>
    <div className="prose-research max-w-none">{children}</div>
  </section>
);

export default function FlagshipPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 pt-4">
      <FlagshipHero slug="channel-count-confound" variant="page" />

      <div>
          <div>
            <Section id="tldr" title="Summary">
              <p>
                I built a benchmark of six models, a CNN, a U-Net, a ConvLSTM
                with MC&nbsp;Dropout, linear extrapolation, the SLEUTH cellular
                automaton and persistence, that predict built-up surface across
                the continental US at 250&nbsp;m from 45 years of Global Human
                Settlement Layer data. The repository holds the full pipeline:
                two independent holdouts (an 821-tile 2015 spatial block and a
                sealed 2020 temporal holdout), four change-threshold settings,
                the channel-matched horizon experiments, a zero-shot transfer to
                Lagos, and MC&nbsp;Dropout calibration over 8.69&nbsp;million
                validation pixels.
              </p>
            </Section>

            <Section id="claims" title="Claims">
              <p className="mb-6 text-pretty">
                The four claims this benchmark supports, and the evidence for
                each.
              </p>
              <ClaimStack
                claims={[
                  {
                    n: 1,
                    claim: 'Horizon changes input channel count.',
                    evidence: (
                      <>
                        Moving from the 5-year to the 10-year horizon reduces
                        the encoder window from{' '}
                        <span className="text-ink tabular">24</span> to{' '}
                        <span className="text-ink tabular">21</span> input
                        channels. The architectural claim and the protocol
                        confound move together.
                      </>
                    ),
                  },
                  {
                    n: 2,
                    claim:
                      'Channel-count reduction explains most of the apparent CNN decline.',
                    evidence: (
                      <>
                        Delta-method attribution:{' '}
                        <span className="text-ink tabular">94%</span> of the
                        CNN’s 5-year to 10-year FoM decline is attributable to input
                        channel reduction, 95% CI{' '}
                        <span className="text-ink tabular">
                          [62%,&nbsp;100%]
                        </span>
                        , propagating the two-seed spread (σ&nbsp;=&nbsp;0.007);
                        conservative floor{' '}
                        <span className="text-ink tabular">≥&nbsp;84%</span>.
                      </>
                    ),
                  },
                  {
                    n: 3,
                    claim: 'ConvLSTM is recency-anchored, not horizon-robust.',
                    evidence: (
                      <>
                        Removing the single most recent epoch moves ConvLSTM
                        FoM{' '}
                        <span className="text-ink tabular">5.4×</span> as much
                        as removing the four oldest epochs combined. A model
                        that weighed every epoch evenly would respond about
                        equally, so the latest epoch is acting as an anchor.
                        The ConvLSTM’s gain is positional, not a
                        long-horizon sequence advantage.
                      </>
                    ),
                  },
                  {
                    n: 4,
                    claim:
                      'Uncertainty ranks error well but underestimates magnitude.',
                    evidence: (
                      <>
                        MC&nbsp;Dropout ranking quality:{' '}
                        <span className="text-ink tabular">r = 0.983</span>{' '}
                        between predicted σ̂ and actual error across 10 decile
                        bins. Absolute magnitudes are{' '}
                        underestimated by{' '}
                        <span className="text-ink tabular">1.4–1.9×</span>. The
                        score is useful for triage, not yet for coverage.
                      </>
                    ),
                  },
                ]}
              />
            </Section>

            <Section id="problem" title="Problem">
              <p>
                Papers on multi-horizon urban growth tend to report the same
                thing. The CNN baselines get worse at longer horizons, while
                the ConvLSTMs, built as sequence models, get better. The story
                people then tell is structural. Recurrence is supposedly
                catching something that flat stacking cannot.
              </p>
              <p>
                But the setup itself changes with the horizon. Going from a
                5-year to a 10-year forecast does not just push the target
                further out. It also drops the most recent input epoch, so at
                the longer horizon both models see one fewer epoch, which for
                the flat-stacking CNN means three fewer input channels. The
                architecture claim and this input change move together, and
                none of the benchmarks I examined separates them.
              </p>

              <figure className="my-6 not-prose">
                <table className="text-[15px] tabular border-collapse border-y-2 border-ink/70">
                  <thead>
                    <tr className="border-b border-ink/40">
                      <th scope="col" className="px-3 py-1.5 text-left font-bold">Horizon</th>
                      <th scope="col" className="px-3 py-1.5 text-left font-bold">Input years</th>
                      <th scope="col" className="px-3 py-1.5 text-left font-bold">Target</th>
                      <th scope="col" className="px-3 py-1.5 text-right font-bold">Epochs</th>
                      <th scope="col" className="px-3 py-1.5 text-right font-bold">Channels</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-1">5-year</td>
                      <td className="px-3 py-1">1975–2010</td>
                      <td className="px-3 py-1">2015</td>
                      <td className="px-3 py-1 text-right">8</td>
                      <td className="px-3 py-1 text-right">24</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1">10-year</td>
                      <td className="px-3 py-1">1975–2005</td>
                      <td className="px-3 py-1">2015</td>
                      <td className="px-3 py-1 text-right">7</td>
                      <td className="px-3 py-1 text-right">21</td>
                    </tr>
                  </tbody>
                </table>
                <figcaption className="mt-2 text-sm text-muted leading-normal">
                  Tab. 1. The horizon changes, but so does the available input
                  stack: each epoch carries 3 GHSL layers, so the channel count
                  drops from 24 to 21 between the 5-year and 10-year tasks.
                  Standard benchmark protocols leave this confound in place.
                </figcaption>
              </figure>

              <h3 className="font-bold mt-6 mb-2">
                What I controlled
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <span>Fixed 2015 prediction target across all horizons</span>
                </li>
                <li>
                  <span>
                    Matched input-channel count via the channel-control CNN
                  </span>
                </li>
                <li>
                  <span>
                    821-tile spatial holdout (
                    <code className="font-mono text-xs">
                      block_id mod 5 = 0
                    </code>
                    )
                  </span>
                </li>
                <li>
                  <span>
                    Sealed 2020 temporal holdout (data downloaded after all
                    model selection)
                  </span>
                </li>
                <li>
                  <span>
                    Zero-shot CONUS to Lagos geographic transfer
                  </span>
                </li>
                <li>
                  <span>
                    MC&nbsp;Dropout calibration on 8.69&nbsp;M validation
                    pixels (20 forward passes)
                  </span>
                </li>
                <li>
                  <span>
                    MSE vs FoM metric analysis (FoM primary, given 89% stable
                    background)
                  </span>
                </li>
                <li>
                  <span>
                    Multi-seed reporting (mean&nbsp;&plusmn;&nbsp;half-range across
                    seeds 0 and 42)
                  </span>
                </li>
              </ul>
            </Section>

            <Section id="contribution" title="Contribution">
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <span>
                    <strong className="text-ink">Channel-matched controls.</strong>{' '}
                    Hold the 2015 target fixed and trim inputs from the oldest
                    end, so the channel count matches each horizon. With
                    channels matched, what is left of the CNN’s horizon
                    effect is &minus;0.004&nbsp;FoM at 10&nbsp;years and
                    &minus;0.015 at 20, and the CNN leads the ConvLSTM at every
                    horizon tested.
                  </span>
                </li>
                <li>
                  <span>
                    <strong className="text-ink">Sealed temporal holdout.</strong>{' '}
                    GHSL&nbsp;2020 was downloaded only after all model selection
                    on the 2015 holdout had finished. Every model is evaluated
                    on an identical 1.57&nbsp;M-pixel domain.
                  </span>
                </li>
                <li>
                  <span>
                    <strong className="text-ink">Uncertainty calibration.</strong>{' '}
                    MC Dropout (20 forward passes) on 8.69&nbsp;M validation
                    pixels. Pearson r&nbsp;=&nbsp;0.9834, Spearman
                    &nbsp;&rho;&nbsp;=&nbsp;1.000 across 10 decile bins.
                  </span>
                </li>
                <li>
                  <span>
                    <strong className="text-ink">
                      Zero-shot geographic transfer.
                    </strong>{' '}
                    The CONUS-trained models are run on 20 Lagos tiles
                    (63,840 pixels) without fine-tuning, as a probe of the
                    recency mechanism in a very different growth regime. The
                    CNN reaches FoM&nbsp;0.460, above linear extrapolation
                    (0.430). The ConvLSTM falls to 0.228, below a
                    predict-all-growth baseline (0.696).
                  </span>
                </li>
              </ol>
            </Section>

            <Section id="methods" title="Methods">
              <p>
                The primary model is a two-layer ConvLSTM (hidden&nbsp;64,
                kernel 3&nbsp;&times;&nbsp;3) with MC&nbsp;Dropout
                p&nbsp;=&nbsp;0.1, followed by a skip-connection decoder of
                four Conv&nbsp;+&nbsp;BN&nbsp;+&nbsp;ReLU blocks ending in a
                1&nbsp;&times;&nbsp;1 sigmoid head, totaling 481,153
                parameters. The flat-stacking CNN baseline (74&nbsp;K) and
                U-Net (474&nbsp;K) share the same decoder; the only
                architectural variable across the three deep models is how the
                eight input epochs are encoded.
              </p>
              <p>
                The data come from the European Commission JRC Global Human
                Settlement Layer R2023A products: GHS-BUILT-S (surface
                density), GHS-BUILT-V (volume), and GHS-POP (population), all
                resampled to 250&nbsp;m in EPSG:5070 and clipped to CONUS
                (12,717&nbsp;&times;&nbsp;23,996 pixels). For spatial validation,
                CONUS is split into blocks of 1280&nbsp;&times;&nbsp;1280 pixels
                (320&nbsp;km on a side), and every fifth block (
                <code className="font-mono text-sm bg-rule/30 px-1 py-0.5">
                  block_id mod 5 == 0
                </code>
                ) is held out. That gives 821 validation tiles that share no
                pixels with the training set.
              </p>
              <figure className="my-6">
                <div className="relative w-full aspect-[16/9] bg-white border border-rule overflow-hidden">
                  <Image
                    src={asset('/paper_figures/fig_architecture.png')}
                    alt="ConvLSTM + MC Dropout architecture diagram showing two stacked ConvLSTM layers with hidden 64 and kernel 3x3, MC Dropout p=0.1, followed by a skip-connection decoder."
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-muted leading-normal">
                  <span>Fig.&nbsp;2.</span> ConvLSTM +
                  MC Dropout architecture. The same decoder is shared across
                  all three deep models; the only variable is how the eight
                  input epochs are encoded (channel concatenation vs.
                  recurrent hidden state).
                </figcaption>
              </figure>
              <p>
                The primary evaluation metric is the Figure of Merit (Pontius
                et al., 2008): FoM&nbsp;=&nbsp;B&nbsp;/&nbsp;(A&nbsp;+&nbsp;B&nbsp;+&nbsp;C),
                where B is correctly predicted growth, A is missed growth, and
                C is false growth. True negatives are excluded, making FoM
                robust to the 89% stable background of CONUS, where MSE
                structurally favors a no-change predictor.
              </p>
            </Section>

            <Section id="related" title="Related work">
              <p>
                This benchmark sits in a long line of urban-growth modeling
                work. The contribution is not the model class. CNNs,
                ConvLSTMs, and U-Nets for spatiotemporal forecasting are
                well established. The contribution is the protocol that
                surfaces when those models actually differ.
              </p>

              <div className="overflow-x-auto my-6 not-prose">
                <table className="w-full text-[15px] border-collapse border-y-2 border-ink/70">
                  <thead>
                    <tr className="border-b border-ink/40">
                      <th scope="col" className="px-3 py-1.5 text-left font-bold">
                        Reference
                      </th>
                      <th scope="col" className="px-3 py-1.5 text-left font-bold">
                        Contribution
                      </th>
                      <th scope="col" className="px-3 py-1.5 text-left font-bold">
                        How this work differs
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-rule">
                      <td className="px-3 py-1.5 align-top">
                        Pontius et&nbsp;al. 2008
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        Figure of Merit for comparing land-change models,
                        which scores predicted change rather than stable
                        pixels.
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        Adopts FoM as the primary metric and pairs it with a
                        per-tile Wilcoxon test and bootstrap CIs, and shows
                        the MSE/FoM inversion in CONUS at 250&nbsp;m.
                      </td>
                    </tr>
                    <tr className="border-b border-rule">
                      <td className="px-3 py-1.5 align-top">
                        Clarke et&nbsp;al. 1997 (SLEUTH)
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        Self-modifying cellular-automaton baseline for urban
                        expansion modeling.
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        Included as one of the six benchmark models,
                        calibrated on 200 training tiles with TIGER/Line
                        primary roads. Establishes a non-neural baseline
                        floor under the same protocol.
                      </td>
                    </tr>
                    <tr className="border-b border-rule">
                      <td className="px-3 py-1.5 align-top">
                        Shi et&nbsp;al. 2015 (ConvLSTM)
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        Original ConvLSTM for spatiotemporal precipitation
                        nowcasting.
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        Treats ConvLSTM as a candidate architecture rather
                        than a default, and tests whether its recurrence
                        gives a measurable long-horizon advantage. After
                        channel-matched controls, it does not.
                      </td>
                    </tr>
                    <tr className="border-b border-rule">
                      <td className="px-3 py-1.5 align-top">
                        GHSL R2023A (JRC)
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        Global Human Settlement Layer built-up, volume, and
                        population products at 100&nbsp;m, used here for 1975
                        to 2020.
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        Underlying data source for all six models.
                        Reprojected to EPSG:5070 and resampled to
                        250&nbsp;m.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 align-top">
                        Recent multi-horizon urban-growth literature
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        CNN vs ConvLSTM comparisons across 5, 10, 20 year
                        horizons show CNN skill falling and ConvLSTM skill
                        rising as the horizon extends, and credit the
                        difference to recurrence.
                      </td>
                      <td className="px-3 py-1.5 align-top">
                        Shows the comparison is confounded: protocols that
                        vary the horizon also vary the input-channel count.
                        With channels matched, the CNN’s horizon effect
                        shrinks to at most 0.015 FoM and the CNN leads at
                        every horizon.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-muted">
                The full reference list is in the SpatialDI paper (to appear)
                and in the repository’s{' '}
                <a
                  href="https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline"
                >
                  README
                </a>
                .
              </p>
            </Section>

            <Section id="results" title="Results">
              <h3 className="font-bold mt-6 mb-2">
                Main results
              </h3>
              <ul className="list-disc pl-6 space-y-1 mb-6 not-prose">
                <MetricCard
                  value="94"
                  unit="%"
                  description="of the CNN’s 5-year to 10-year FoM decline comes from the channel-count reduction (delta-method 95% CI 62–100%)."
                  tone="secondary"
                />
                <MetricCard
                  value="5.4"
                  unit="×"
                  description="ConvLSTM FoM response to removing the most recent epoch, relative to removing the four oldest epochs combined. The gain is positional."
                  tone="secondary"
                />
                <MetricCard
                  value="0.983"
                  description="Pearson r between predicted uncertainty σ̂ and actual error across 10 decile bins on 8.69M validation pixels."
                />
                <MetricCard
                  value="1.4–1.9"
                  unit="×"
                  description="by which MC Dropout understates the size of errors. Useful for ranking errors, not yet for coverage without post-hoc calibration."
                />
              </ul>

              <p>
                <strong className="text-ink">
                  2015 spatial block holdout.
                </strong>{' '}
                Pixel-level FoM on 1,542,747 evaluation pixels (
                <code className="font-mono text-sm">gt &gt; 0.01</code>, 25.1%
                growth). For the neural models, &plusmn; is half the range across
                two seeds, as in both papers.
              </p>

              <ResultsTable
                caption="Tab. 2. 2015 spatial block holdout. The CNN leads on FoM with about 6.5× fewer parameters than the ConvLSTM. SLEUTH has 4 calibrated coefficients rather than trained weights."
                headers={['Model', 'FoM (↑)', 'Params']}
                rows={[
                  ['SimpleCNN (flat stacking)', '0.702 ± 0.019', '74 K'],
                  ['U-Net', '0.676', '474 K'],
                  ['ConvLSTM + MC Dropout', '0.508 ± 0.0001', '481 K'],
                  ['Linear extrapolation', '0.375', 'n/a'],
                  ['SLEUTH', '0.056', '4'],
                  ['Persistence', '0.000', 'n/a'],
                ]}
                highlightRow={0}
              />

              <p>
                <strong className="text-ink">
                  2020 blind temporal holdout.
                </strong>{' '}
                Pre-2015 training only; GHSL 2020 was downloaded after all
                model selection had finished. Identical 1,574,225-pixel
                evaluation domain across all six models.
              </p>

              <ResultsTable
                caption="Tab. 3. 2020 sealed temporal holdout. SimpleCNN shows the mean with its two seeds in parentheses. Persistence achieves the lowest MSE because 89% of evaluated pixels are stable; this inversion is why FoM is reported as the primary metric for sparse-change spatial tasks."
                headers={['Model', 'FoM (↑)', 'MSE (↓)']}
                rows={[
                  ['SimpleCNN', '0.252 (0.243, 0.260)', '4.90 × 10⁻⁴'],
                  ['U-Net', '0.229', '4.30 × 10⁻⁴'],
                  ['ConvLSTM + MC Dropout', '0.156', '4.84 × 10⁻⁴'],
                  ['SLEUTH', '0.121', 'n/a'],
                  ['Linear extrapolation', '0.053', '9.40 × 10⁻⁴'],
                  ['Persistence', '0.000', '2.40 × 10⁻⁴'],
                ]}
                highlightRow={0}
              />

              <figure className="my-6">
                <div className="relative w-full aspect-[16/8] bg-white border border-rule overflow-hidden">
                  <Image
                    src={asset('/paper_figures/fig_multihorizon.png')}
                    alt="Multi-horizon FoM showing ConvLSTM, SimpleCNN, and the channel-matched CNN control across 5, 10, and 20 year horizons."
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-muted leading-normal">
                  <span>Fig.&nbsp;3.</span> Multi-horizon
                  FoM with the channel-matched CNN control (open markers).
                  With channels matched, almost none of the CNN’s decline
                  remains and the CNN leads at every horizon. The
                  ConvLSTM’s rise is real but positional (Claim&nbsp;3).
                </figcaption>
              </figure>

              <p>
                <strong className="text-ink">
                  Statistical confirmation.
                </strong>{' '}
                Paired Wilcoxon signed-rank test on per-tile FoM across all
                821 validation tiles, with bootstrap 95% CIs on the mean per-tile gap
                (n&nbsp;=&nbsp;2000).
              </p>

              <ResultsTable
                caption="Tab. 4. Per-tile statistical confirmation. The CNN beats the ConvLSTM on 817 of the 821 validation tiles."
                headers={['Test', 'Median Δ FoM', 'p-value', 'Mean Δ FoM [95% CI]']}
                rows={[
                  [
                    'CNN > ConvLSTM',
                    '+0.137',
                    '3.0 × 10⁻¹³⁶',
                    '+0.147 [0.142, 0.152]',
                  ],
                  [
                    'U-Net > ConvLSTM',
                    '+0.118',
                    '5.9 × 10⁻¹³⁶',
                    '+0.130 [0.126, 0.135]',
                  ],
                  ['CNN > U-Net', '+0.016', '2.3 × 10⁻⁶³', 'n/a'],
                ]}
              />

              <figure className="my-6">
                <div className="relative w-full aspect-[16/9] bg-white border border-rule overflow-hidden">
                  <Image
                    src={asset('/paper_figures/fig_calibration.png')}
                    alt="MC Dropout calibration plot. Predicted standard deviation from 20 forward passes versus mean absolute error, binned into 10 equal-count deciles (about 0.87M pixels each, 8.69M in total)."
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-muted leading-normal">
                  <span>Fig.&nbsp;4.</span>{' '}
                  MC&nbsp;Dropout calibration. Every higher-uncertainty decile
                  has strictly larger mean actual error than the bin below it.
                  Ranking quality is excellent (r&nbsp;=&nbsp;0.9834); absolute
                  magnitudes are systematically underestimated. Useful for
                  triage, not yet sufficient for coverage without post-hoc
                  calibration.
                </figcaption>
              </figure>
            </Section>

            <Section id="repro" title="Reproducibility">
              <p>
                Every experiment is implemented as a self-contained script
                under{' '}
                <code className="font-mono text-sm bg-rule/30 px-1 py-0.5">
                  scripts/
                </code>
                . Final aggregated numbers are written to{' '}
                <code className="font-mono text-sm bg-rule/30 px-1 py-0.5">
                  results/metrics/all_results.json
                </code>{' '}
                by{' '}
                <code className="font-mono text-sm bg-rule/30 px-1 py-0.5">
                  scripts/consolidate_results.py
                </code>
                . Reported numbers are mean&nbsp;&plusmn;&nbsp;half-range across two
                seeds (0 and 42) for every neural model.
              </p>
              <ReproChecklist
                items={[
                  { label: 'MIT license', status: 'yes' },
                  {
                    label: 'BibTeX citation',
                    status: 'yes',
                    detail: 'CITATION.bib in repo root',
                  },
                  {
                    label: 'CITATION.cff',
                    status: 'no',
                    detail: 'planned',
                  },
                  {
                    label: 'Tests',
                    status: 'yes',
                    detail: 'Model unit tests',
                  },
                  {
                    label: 'Results JSONs',
                    status: 'yes',
                    detail: '25 per-experiment files',
                  },
                  { label: 'Figure generation scripts', status: 'yes' },
                  {
                    label: 'Sealed evaluation protocol',
                    status: 'yes',
                    detail: 'val_tile_indices.json shared across every script',
                  },
                  {
                    label: 'Multi-seed reporting',
                    status: 'yes',
                    detail: 'Seeds 0 and 42',
                  },
                  {
                    label: 'Hardware / runtime',
                    status: 'yes',
                    detail: '~5 GPU-days on a single A100',
                  },
                  {
                    label: 'Data download instructions',
                    status: 'yes',
                    detail: 'GHSL R2023A from Copernicus',
                  },
                  {
                    label: 'Pretrained weights',
                    status: 'yes',
                    detail: '10 checkpoints in models/, with checksums',
                  },
                  {
                    label: 'Docker / smoke test',
                    status: 'no',
                    detail: 'planned',
                  },
                  {
                    label: 'Zenodo DOI (GeoAI)',
                    status: 'yes',
                  },
                  {
                    label: 'DOI (SpatialDI, Springer)',
                    status: 'no',
                    detail: 'on publication',
                  },
                ]}
              />
            </Section>

            <Section id="limitations" title="Limitations">
              <p>
                These follow the limitations section of the SpatialDI paper.
                Experiments are confined to CONUS GHSL at 250&nbsp;m. The 821
                validation tiles cover seven climate zones and growth rates
                from 5% to 40%, but the magnitudes (84–94% channel attribution,
                the 5.4&times; end-removal asymmetry) may differ elsewhere, and
                the 20-tile Lagos test supports directional, not quantitative,
                claims.
              </p>
              <p>
                The channel attribution rests on three single-seed FoM values.
                Its delta-method 95% CI is wide (62–100%), and the 84% floor is
                a sensitivity argument, not the lower end of the interval. The
                channel-count isolation was run only for the CNN, so whether
                part of the ConvLSTM’s gain is also channel-driven is
                untested. The ConvLSTM’s 2020 result is a single run, and
                the &plusmn; values are two-seed half-ranges, not standard
                deviations.
              </p>
              <p className="mt-6 text-sm text-muted">
                Other caveats: 250&nbsp;m resolution misses parcel-level
                dynamics; the neural models use no zoning, terrain, or economic
                covariates; SLEUTH omits terrain slope, so it is a lower bound
                on cellular-automaton performance; the 2010–2020 growth
                slowdown (10.6% of evaluated pixels grew, against 25.1% for
                2015) compresses the 2020 FoM range; and MC&nbsp;Dropout
                understates error size by 1.4–1.9&times;, so it needs post-hoc
                or conformal calibration before it can promise coverage.
              </p>
            </Section>

            <Section id="next" title="What comes next">
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <span>
                    Geographic transfer at scale. Beyond Lagos, characterize
                    when CONUS-trained spatiotemporal vision retains its
                    behavior elsewhere and when it does not. The follow-on{' '}
                    <Link
                      href="/research/confident-but-unidentifiable"
                      className="link-inline"
                    >
                      identifiability study
                    </Link>{' '}
                    takes this to 44 cities in four world regions.
                  </span>
                </li>
                <li>
                  <span>
                    Conformal or post-hoc calibration of dropout-based
                    spatiotemporal uncertainty under temporal shift, so that
                    ranking quality becomes coverage quality.
                  </span>
                </li>
                <li>
                  <span>
                    Sequence-effect probes. What temporal information CNN and
                    ConvLSTM models actually encode, preserve, or overweight,
                    beyond channel-count controls.
                  </span>
                </li>
                <li>
                  <span>
                    Benchmark validity as a research target in its own right:
                    more multi-horizon, multi-region, multi-architecture audits
                    where the evaluation protocol is the experiment.
                  </span>
                </li>
              </ol>
            </Section>

            <Section id="citation" title="Citation">
              <CopyableBibtex
                bibtex={channelCountBibtex}
              />
              <p className="mt-6 text-sm text-muted">
                The GeoAI&nbsp;2026 paper (oral) is published, and the extended
                version is accepted for the SpatialDI&nbsp;2026 proceedings
                (Springer LNCS). The{' '}
                <a
                  href={geoaiPaperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  GeoAI paper is available on Zenodo
                </a>
                .
              </p>
            </Section>

            <p className="mt-12 text-[15px]">
              <Link href="/research">← research</Link>
              {' · '}
              <Link href="/research/confident-but-unidentifiable">the identifiability study</Link>
            </p>
          </div>
      </div>
    </article>
  );
}
