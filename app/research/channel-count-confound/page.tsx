import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { asset, geoaiPaperUrl } from '@/lib/site';
import FlagshipHero from '@/components/FlagshipHero';
import ResultsTable from '@/components/ResultsTable';
import ReproChecklist from '@/components/ReproChecklist';
import StickyToc from '@/components/StickyToc';
import ClaimStack from '@/components/ClaimStack';
import MetricCard from '@/components/MetricCard';
import CopyableBibtex from '@/components/CopyableBibtex';

export const metadata: Metadata = {
  title:
    'The Channel-Count Confound: A Continental Audit of Multi-horizon Urban Growth Prediction',
  description:
    'A continental audit of CNN and ConvLSTM comparisons on multi-horizon urban-growth prediction. Sealed temporal holdouts, zero-shot geographic transfer to Lagos, and calibrated MC Dropout uncertainty over 8.69M validation pixels.',
};

const toc = [
  { id: 'tldr', label: 'Summary' },
  { id: 'claims', label: 'Claims' },
  { id: 'problem', label: 'Problem' },
  { id: 'contribution', label: 'Contribution' },
  { id: 'methods', label: 'Methods' },
  { id: 'related', label: 'Related work' },
  { id: 'results', label: 'Results' },
  { id: 'repro', label: 'Reproducibility' },
  { id: 'limitations', label: 'Limitations' },
  { id: 'next', label: 'What comes next' },
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
  <section
    id={id}
    className="border-t border-rule scroll-mt-24"
  >
    <div className="py-16 md:py-20">
      <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12">
        <div>
          <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">
            {title}
          </h2>
        </div>
        <div className="prose-research">{children}</div>
      </div>
    </div>
  </section>
);

export default function FlagshipPage() {
  return (
    <article>
      <FlagshipHero slug="channel-count-confound" variant="page" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid xl:grid-cols-[200px_1fr] gap-12">
          <aside className="xl:pt-16">
            <StickyToc items={toc} />
          </aside>

          <div className="max-w-4xl">
            <Section id="tldr" title="Summary">
              <p>
                A six-model benchmark (CNN, U-Net, ConvLSTM with
                MC&nbsp;Dropout, linear extrapolation, SLEUTH cellular
                automata, and persistence) for predicting urban built-up
                surface density across the Continental United States at
                250&nbsp;m resolution from 45 years of Global Human Settlement
                Layer observations. The repository contains the full
                experimental pipeline behind two independent holdouts (821-tile
                2015 spatial block, fully sealed 2020 temporal), four
                change-threshold sensitivities, channel-matched multi-horizon
                experiments, zero-shot transfer to Lagos, and MC&nbsp;Dropout
                calibration on 8.69&nbsp;million validation pixels.
              </p>
            </Section>

            <Section id="claims" title="Claims">
              <p className="mb-6 text-pretty">
                The four falsifiable claims this benchmark supports, each
                paired with the script that produces its evidence.
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
                        Bootstrap attribution:{' '}
                        <span className="text-ink tabular">94%</span> of the
                        CNN 5yr→10yr FoM decline is attributable to input
                        channel reduction, 95% CI{' '}
                        <span className="text-ink tabular">
                          [62%,&nbsp;100%]
                        </span>{' '}
                        (n_bootstrap = 2000).
                      </>
                    ),
                  },
                  {
                    n: 3,
                    claim: 'ConvLSTM is recency-anchored, not horizon-robust.',
                    evidence: (
                      <>
                        End-epoch removal degrades ConvLSTM FoM by{' '}
                        <span className="text-ink tabular">5.4×</span> more
                        than mid-sequence removal. This is consistent with a
                        recency-anchored representation, not a long-horizon
                        sequence advantage.
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
                        <span className="text-ink tabular">1.4–1.9×</span>{' '}
                        under-estimated. The score is useful for triage, not
                        yet for coverage.
                      </>
                    ),
                  },
                ]}
              />
            </Section>

            <Section id="problem" title="Problem">
              <p>
                Multi-horizon urban-growth papers consistently report a single
                pattern: CNN baselines weaken at longer forecast horizons, and
                ConvLSTMs (framed as sequence-modeling architectures) catch up
                or overtake them. The interpretation that follows is
                structural: recurrence captures something architectural that
                flat-stacking cannot.
              </p>
              <p>
                But the benchmark protocol changes with the horizon. Moving
                from a 5-year to a 10-year horizon does not only push the
                prediction further out. It also removes the most recent input
                epoch. The CNN baseline therefore sees a shorter encoder
                window at long horizons, while the ConvLSTM hidden state still
                summarizes the full history. The architectural claim and the
                protocol confound are not separated.
              </p>

              <figure className="my-10">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border border-rule bg-white p-5 rounded-2xl">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-subtle leading-none mb-3">
                      5-year horizon
                    </p>
                    <p className="font-serif text-base text-ink leading-snug mb-4">
                      1975 → 2010 input · target 2015
                    </p>
                    <p className="font-serif text-3xl text-accent tabular leading-none">
                      24{' '}
                      <span className="text-base text-muted">channels</span>
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-subtle mt-3 leading-relaxed">
                      8 epochs · 3 layers each
                    </p>
                  </div>
                  <div className="border border-rule bg-white p-5 rounded-2xl">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-subtle leading-none mb-3">
                      10-year horizon
                    </p>
                    <p className="font-serif text-base text-ink leading-snug mb-4">
                      1975 → 2005 input · target 2015
                    </p>
                    <p className="font-serif text-3xl text-accent tabular leading-none">
                      21{' '}
                      <span className="text-base text-muted">channels</span>
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-subtle mt-3 leading-relaxed">
                      7 epochs · 3 layers each
                    </p>
                  </div>
                </div>
                <figcaption className="mt-4 text-xs font-mono text-subtle leading-relaxed">
                  <span className="text-muted">Fig.&nbsp;2.</span> The horizon
                  changes, but so does the available input stack.
                  Channel-count drops from 24 to 21 between the 5-year and
                  10-year tasks. Standard benchmark protocols leave this
                  confound in place.
                </figcaption>
              </figure>

              <h3 className="font-serif text-base text-ink mt-10 mb-4">
                What I controlled
              </h3>
              <ul className="text-sm text-muted leading-relaxed space-y-2 list-none pl-0">
                <li className="flex gap-3">
                  <span className="font-mono text-success flex-shrink-0">✓</span>
                  <span>Fixed 2015 prediction target across all horizons</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-success flex-shrink-0">✓</span>
                  <span>
                    Matched input-channel count via the channel-control CNN
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-success flex-shrink-0">✓</span>
                  <span>
                    821-tile spatial holdout (
                    <code className="font-mono text-xs">
                      block_id mod 5 = 0
                    </code>
                    )
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-success flex-shrink-0">✓</span>
                  <span>
                    Sealed 2020 temporal holdout (data downloaded after all
                    model selection)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-success flex-shrink-0">✓</span>
                  <span>
                    Zero-shot CONUS&nbsp;→&nbsp;Lagos geographic transfer
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-success flex-shrink-0">✓</span>
                  <span>
                    MC&nbsp;Dropout calibration on 8.69&nbsp;M validation
                    pixels (20 forward passes)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-success flex-shrink-0">✓</span>
                  <span>
                    MSE vs FoM metric analysis (FoM primary, given 89% stable
                    background)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-success flex-shrink-0">✓</span>
                  <span>
                    Multi-seed reporting (mean&nbsp;&plusmn;&nbsp;std across
                    seeds 0 and 42)
                  </span>
                </li>
              </ul>
            </Section>

            <Section id="contribution" title="Contribution">
              <ol className="space-y-3 list-none pl-0">
                <li className="flex gap-3">
                  <span className="font-mono text-accent flex-shrink-0 tabular">[1]</span>
                  <span>
                    <strong className="text-ink">Channel-matched controls.</strong>{' '}
                    Hold the input channel count fixed while varying forecast
                    horizon. The apparent CNN vs ConvLSTM gap shrinks to less
                    than 0.015 FoM across horizons.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent flex-shrink-0 tabular">[2]</span>
                  <span>
                    <strong className="text-ink">Sealed temporal holdout.</strong>{' '}
                    GHSL&nbsp;2020 was downloaded only after all model selection
                    on the 2015 holdout had finished. Every model is evaluated
                    on an identical 1.57&nbsp;M-pixel domain.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent flex-shrink-0 tabular">[3]</span>
                  <span>
                    <strong className="text-ink">Calibrated uncertainty.</strong>{' '}
                    MC Dropout (20 forward passes) on 8.69&nbsp;M validation
                    pixels. Pearson r&nbsp;=&nbsp;0.9834, Spearman
                    &nbsp;&rho;&nbsp;=&nbsp;1.000 across 10 decile bins.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent flex-shrink-0 tabular">[4]</span>
                  <span>
                    <strong className="text-ink">
                      Zero-shot geographic transfer.
                    </strong>{' '}
                    The CONUS-trained model is evaluated on Lagos, Nigeria,
                    without fine-tuning. Architecture comparisons retain their
                    direction under distribution shift.
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
                Data comes from the European Commission JRC Global Human
                Settlement Layer R2023A products: GHS-BUILT-S (surface
                density), GHS-BUILT-V (volume), and GHS-POP (population), all
                resampled to 250&nbsp;m in EPSG:5070 and clipped to CONUS
                (12,717&nbsp;&times;&nbsp;23,996 pixels). Spatial validation
                uses 821 geographic blocks of ~320&nbsp;km&sup2; selected by{' '}
                <code className="font-mono text-sm bg-rule/30 px-1 py-0.5">
                  block_id mod 5 == 0
                </code>
                , eliminating spatial autocorrelation leakage from tile
                overlap.
              </p>
              <figure className="my-10 -mx-2 md:mx-0">
                <div className="relative w-full aspect-[16/9] bg-white border border-rule overflow-hidden">
                  <Image
                    src={asset('/paper_figures/fig_architecture.png')}
                    alt="ConvLSTM + MC Dropout architecture diagram showing two stacked ConvLSTM layers with hidden 64 and kernel 3x3, MC Dropout p=0.1, followed by a skip-connection decoder."
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                <figcaption className="mt-3 text-xs font-mono text-subtle leading-relaxed">
                  <span className="text-muted">Fig.&nbsp;3.</span> ConvLSTM +
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

              <div className="overflow-x-auto border border-rule rounded-2xl my-10 not-prose">
                <table className="w-full text-sm tabular border-collapse">
                  <thead>
                    <tr className="border-b border-rule bg-paper">
                      <th scope="col" className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-subtle text-left">
                        Reference
                      </th>
                      <th scope="col" className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-subtle text-left">
                        Contribution
                      </th>
                      <th scope="col" className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-subtle text-left">
                        How this work differs
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-rule">
                      <td className="px-4 py-3 text-ink font-medium align-top">
                        Pontius et&nbsp;al. 2008
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        Figure of Merit for evaluating land-change models;
                        argues MSE is misleading when most pixels are stable.
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        Adopts FoM as the primary metric and pairs it with a
                        per-tile Wilcoxon test and bootstrap CIs. Confirms
                        the MSE/FoM inversion in CONUS at 250&nbsp;m.
                      </td>
                    </tr>
                    <tr className="border-b border-rule">
                      <td className="px-4 py-3 text-ink font-medium align-top">
                        Clarke et&nbsp;al. 1997 (SLEUTH)
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        Self-modifying cellular-automaton baseline for urban
                        expansion modeling.
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        Included as one of the six benchmark models,
                        calibrated on 200 training tiles with TIGER/Line
                        primary roads. Establishes a non-neural baseline
                        floor under the same protocol.
                      </td>
                    </tr>
                    <tr className="border-b border-rule">
                      <td className="px-4 py-3 text-ink font-medium align-top">
                        Shi et&nbsp;al. 2015 (ConvLSTM)
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        Original ConvLSTM for spatiotemporal precipitation
                        nowcasting.
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        Treats ConvLSTM as a candidate architecture rather
                        than a default, and tests whether its recurrence
                        gives a measurable long-horizon advantage. After
                        channel-matched controls, it does not.
                      </td>
                    </tr>
                    <tr className="border-b border-rule">
                      <td className="px-4 py-3 text-ink font-medium align-top">
                        GHSL R2023A (JRC)
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        Global Human Settlement Layer built-up, volume, and
                        population products at 100&nbsp;m, 1975 to 2020.
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        Underlying data source for all six models.
                        Reprojected to EPSG:5070 and resampled to
                        250&nbsp;m.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-ink font-medium align-top">
                        Recent multi-horizon urban-growth literature
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        CNN vs ConvLSTM comparisons across 5, 10, 20 year
                        horizons typically report a long-horizon advantage
                        for recurrent architectures.
                      </td>
                      <td className="px-4 py-3 text-muted align-top">
                        Shows the comparison is confounded: protocols that
                        vary the horizon also vary the input-channel count.
                        Channel-matched controls collapse the gap to less
                        than 0.015 FoM across horizons.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-muted">
                The full reference list is in the SpatialDI main paper
                (forthcoming) and in the repository&apos;s{' '}
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
              <h3 className="font-serif text-base text-ink mb-4">
                Main results
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-10 not-prose">
                <MetricCard
                  value="94"
                  unit="%"
                  description="of CNN's 5yr→10yr FoM decline attributes to channel-count reduction, 95% CI [62%, 100%]."
                  tone="secondary"
                />
                <MetricCard
                  value="5.4"
                  unit="×"
                  description="larger ConvLSTM response to removing the most recent epoch vs mid-sequence. Recency-anchored, not horizon-robust."
                  tone="secondary"
                />
                <MetricCard
                  value="0.983"
                  description="Pearson r between predicted uncertainty σ̂ and actual error across 10 decile bins on 8.69M validation pixels."
                />
                <MetricCard
                  value="1.4–1.9"
                  unit="×"
                  description="uncertainty-magnitude underestimation. Useful for ranking, not yet for coverage without post-hoc calibration."
                />
              </div>

              <p>
                <strong className="text-ink">
                  2015 spatial block holdout.
                </strong>{' '}
                Pixel-level FoM on 1,542,747 evaluation pixels (
                <code className="font-mono text-sm">gt &gt; 0.01</code>, 25.1%
                growth), mean&nbsp;&plusmn;&nbsp;std across two seeds.
              </p>

              <ResultsTable
                caption="Tab. 1. 2015 spatial block holdout. CNN leads at every metric while using ~6.5× fewer parameters than the ConvLSTM."
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
                caption="Tab. 2. 2020 sealed temporal holdout. Persistence achieves the lowest MSE because 89% of evaluated pixels are stable; this inversion is why FoM is reported as the primary metric for sparse-change spatial tasks."
                headers={['Model', 'FoM (↑)', 'MSE (↓)']}
                rows={[
                  ['SimpleCNN', '0.252 ± 0.012', '4.90 × 10⁻⁴'],
                  ['U-Net', '0.229', '4.30 × 10⁻⁴'],
                  ['ConvLSTM + MC Dropout', '0.156', '4.84 × 10⁻⁴'],
                  ['SLEUTH', '0.121', 'n/a'],
                  ['Linear extrapolation', '0.053', '9.40 × 10⁻⁴'],
                  ['Persistence', '0.000', '2.40 × 10⁻⁴'],
                ]}
                highlightRow={0}
              />

              <figure className="my-12 -mx-2 md:mx-0">
                <div className="relative w-full aspect-[16/8] bg-white border border-rule overflow-hidden">
                  <Image
                    src={asset('/paper_figures/fig_multihorizon.png')}
                    alt="Multi-horizon FoM showing ConvLSTM, SimpleCNN, and the channel-matched CNN control across 5, 10, and 20 year horizons."
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                <figcaption className="mt-3 text-xs font-mono text-subtle leading-relaxed">
                  <span className="text-muted">Fig.&nbsp;4.</span> Multi-horizon
                  FoM with the channel-matched CNN control (open markers)
                  isolating the true horizon effect. The apparent ConvLSTM
                  catch-up at longer horizons collapses when input channel
                  count is held fixed.
                </figcaption>
              </figure>

              <p>
                <strong className="text-ink">
                  Statistical confirmation.
                </strong>{' '}
                Paired Wilcoxon signed-rank test on per-tile FoM across all
                821 validation tiles, with bootstrap 95% CIs (n&nbsp;=&nbsp;2000).
              </p>

              <ResultsTable
                caption="Tab. 3. Per-tile statistical confirmation. The CNN > ConvLSTM ordering holds with overwhelming significance and a tight CI."
                headers={['Test', 'Median Δ FoM', 'p-value', '95% CI']}
                rows={[
                  [
                    'CNN > ConvLSTM',
                    '+0.137',
                    '3.0 × 10⁻¹³⁶',
                    '[0.142, 0.152]',
                  ],
                  [
                    'U-Net > ConvLSTM',
                    '+0.118',
                    '5.9 × 10⁻¹³⁶',
                    '[0.126, 0.135]',
                  ],
                  ['CNN > U-Net', '+0.016', '2.3 × 10⁻⁶³', 'n/a'],
                ]}
              />

              <figure className="my-12 -mx-2 md:mx-0">
                <div className="relative w-full aspect-[16/9] bg-white border border-rule overflow-hidden">
                  <Image
                    src={asset('/paper_figures/fig_calibration.png')}
                    alt="MC Dropout calibration plot. Predicted standard deviation from 20 forward passes versus mean absolute error, binned into 10 equal-count deciles of 8.69M pixels each."
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                <figcaption className="mt-3 text-xs font-mono text-subtle leading-relaxed">
                  <span className="text-muted">Fig.&nbsp;5.</span>{' '}
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
                . Reported numbers are mean&nbsp;&plusmn;&nbsp;std across two
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
                    detail: 'Model and metric units',
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
                    status: 'no',
                    detail: 'Regenerable; not distributed',
                  },
                  {
                    label: 'Docker / smoke test',
                    status: 'no',
                    detail: 'planned',
                  },
                  {
                    label: 'Zenodo DOI',
                    status: 'no',
                    detail: 'reserved · publishing soon',
                  },
                ]}
              />
            </Section>

            <Section id="limitations" title="Limitations">
              <p>
                The Lagos transfer test is{' '}
                <strong className="text-ink">directional</strong> rather than a
                complete global-transfer study; one city does not generalise
                to the global South. Some attribution estimates have wide
                confidence intervals. The 94% channel-count attribution
                carries a 95% CI of [62%, 100%], which is directionally clear
                but not pinpoint. The next step is to
                test whether terrain, transport networks, and settlement
                structure explain transfer failure, rather than treating
                Lagos as a one-region check.
              </p>
              <p className="mt-6 text-sm text-muted">
                Smaller, complementary caveats: 250&nbsp;m resolution misses
                fine-grained parcel dynamics; no zoning, terrain, or
                economic covariates in the neural models; post-2015 CONUS
                growth slowdown (5&times; lower rate) is the dominant driver
                of the 2020-holdout FoM drop; MC&nbsp;Dropout magnitudes are
                1.4–1.9× under-estimated and need post-hoc or conformal
                calibration for coverage.
              </p>
            </Section>

            <Section id="next" title="What comes next">
              <ol className="space-y-3 list-none pl-0">
                <li className="flex gap-3">
                  <span className="font-mono text-accent flex-shrink-0 tabular">[1]</span>
                  <span>
                    Geographic transfer at scale. Beyond Lagos, characterize
                    when CONUS-trained spatiotemporal vision retains its
                    behavior elsewhere and when it does not.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent flex-shrink-0 tabular">[2]</span>
                  <span>
                    Conformal or post-hoc calibration of dropout-based
                    spatiotemporal uncertainty under temporal shift, so that
                    ranking quality becomes coverage quality.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent flex-shrink-0 tabular">[3]</span>
                  <span>
                    Sequence-effect probes. What temporal information CNN and
                    ConvLSTM models actually encode, preserve, or overweight,
                    beyond channel-count controls.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent flex-shrink-0 tabular">[4]</span>
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
                A peer-reviewed manuscript describing this benchmark appears at
                GeoAI&nbsp;2026 (oral) and in the SpatialDI&nbsp;2026
                proceedings. The{' '}
                <a
                  href={geoaiPaperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  GeoAI short paper is available on Zenodo
                </a>
                .
              </p>
            </Section>

            <section className="border-t border-rule">
              <div className="py-12 flex flex-wrap items-center justify-between gap-6">
                <Link
                  href="/research"
                  className="text-xs font-mono uppercase tracking-wider text-muted hover:text-accent"
                >
                  &larr; Research themes
                </Link>
                <Link
                  href="/contact"
                  className="text-xs font-mono uppercase tracking-wider text-muted hover:text-accent"
                >
                  Contact &rarr;
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
