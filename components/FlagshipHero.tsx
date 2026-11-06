import { asset, geoaiPaperUrl } from '@/lib/site';

const REPO = 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction';

export default function FlagshipHero(_: { slug: string; variant?: 'home' | 'page' }) {
  return (
    <header className="pt-6 pb-2">
      <h1 className="text-[32px] leading-tight text-center">The channel-count study</h1>
      <p className="mt-2 text-center">
        <strong>Rohan Bali</strong>
      </p>
      <p className="mt-1 text-center text-muted">
        <em>GeoAI 2026</em> <strong className="text-highlight">(oral)</strong> and{' '}
        <em>SpatialDI 2026</em> (Springer LNCS, to appear)
      </p>
      <p className="mt-2 text-center">
        <a href={geoaiPaperUrl} target="_blank" rel="noopener noreferrer">
          GeoAI paper
        </a>
        {' / '}
        <span className="text-subtle">SpatialDI paper (to appear)</span>
        {' / '}
        <a href={REPO} target="_blank" rel="noopener noreferrer">
          code, benchmark &amp; weights
        </a>
        {' / '}
        <a href="#citation">bibtex</a>
      </p>

      <figure className="mt-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/paper_figures/fig_title_maps.png')}
          alt="Representative validation tile from the 821-tile 2015 spatial holdout. From left: GHSL ground truth, ConvLSTM prediction, MC Dropout uncertainty over 20 stochastic forward passes."
          className="w-full h-auto bg-white border border-rule"
        />
        <figcaption className="mt-2 text-sm text-muted leading-normal">
          Fig. 1. Representative validation tile from the 821-tile 2015
          spatial holdout, from the SpatialDI paper. From left: GHSL ground
          truth, ConvLSTM prediction, and MC Dropout uncertainty over 20
          stochastic forward passes.
        </figcaption>
      </figure>

      <p className="mt-6 leading-relaxed">
        One benchmark of multi-horizon urban-growth prediction over 5,698
        tiles of the continental US, written up as two papers: a short paper
        at GeoAI&nbsp;2026 and a full-length paper at SpatialDI&nbsp;2026. The
        CNN seems to lose skill at longer horizons while the ConvLSTM gains
        it. Match the number of input channels and almost all of the CNN’s
        decline goes away, and the CNN leads at every horizon.
      </p>

      <section id="papers" className="mt-8 scroll-mt-8">
        <h2 className="section-title">The two papers</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>
              Channel Count, Not Horizon Length, Drives Architectural
              Divergence in Multi-Horizon Urban Growth Prediction.
            </strong>{' '}
            <em>GeoAI 2026, Ghent</em>, oral, published. Short paper (6 pages,
            1 figure, 2 tables): the confound and its decomposition, the
            recency probe on the ConvLSTM, and the main benchmark with a
            zero-shot test on Lagos.{' '}
            <a href={geoaiPaperUrl} target="_blank" rel="noopener noreferrer">
              paper
            </a>
          </li>
          <li>
            <strong>
              The Channel-Count Confound: A Continental Audit of Multi-horizon
              Urban Growth Prediction.
            </strong>{' '}
            <em>SpatialDI 2026, Springer LNCS</em>, to appear. Full paper (13
            figures, 4 tables): extends the GeoAI paper with related work, the
            full data and protocol, input and architecture ablations, the MC
            Dropout uncertainty analysis, and limitations.
          </li>
        </ol>
        <p className="mt-3">
          Both papers share one{' '}
          <a href={REPO} target="_blank" rel="noopener noreferrer">
            repository
          </a>{' '}
          with the code, benchmark and trained weights.
        </p>
      </section>
    </header>
  );
}
