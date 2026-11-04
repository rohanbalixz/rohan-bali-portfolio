import type { Metadata } from 'next';
import Link from 'next/link';
import { asset, geoaiPaperUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Research statement',
  description:
    'When can a model of the Earth be trusted where it was not trained? Three sole-authored studies on benchmark confounds, the identifiability of cross-region explanations, and what cross-region transfer depends on, and a PhD agenda that turns them into checks a model passes before it is used somewhere new.',
};

const REPO_MH = 'https://github.com/rohanbalixz/Multi-Horizon-Urban-Growth-Prediction';
const REPO_TGIS =
  'https://github.com/rohanbalixz/Confident-but-Unidentifiable-Positivity-Limits-on-Cross-Region-Attribution-in-Geospatial-Models';
const REPO_XR = 'https://github.com/rohanbalixz/Cross-Region-Source-Invariance-in-Earth-Observation';

const studies = [
  {
    label: 'Benchmark scores',
    finding: 'Input channels, not horizon length, explain 94% of the CNN’s drop',
    venue: 'GeoAI 2026 oral · Springer LNCS',
  },
  {
    label: 'Explanations of failure',
    finding: 'Only 5.8% of Andes tiles sit in the source support; confident explanations get the sign wrong',
    venue: 'Transactions in GIS, accepted pending revisions',
  },
  {
    label: 'What transfer depends on',
    finding: 'The training region barely matters; a no-training baseline beats the trained CNN',
    venue: 'Ongoing, not yet reviewed',
  },
];

const work = [
  {
    title: 'Channel count, not horizon length, drives architectural divergence in multi-horizon urban growth prediction',
    venue: 'GeoAI 2026, Ghent · Oral',
    status: 'Published',
    links: [
      { label: 'Paper', href: geoaiPaperUrl, external: true },
      { label: 'Code', href: REPO_MH, external: true },
    ],
  },
  {
    title: 'The channel-count confound: A continental audit of multi-horizon urban growth prediction',
    venue: 'SpatialDI 2026 · Springer LNCS',
    status: 'Accepted, to appear',
    links: [
      { label: 'Project page', href: '/research/channel-count-confound' },
      { label: 'Code & weights', href: REPO_MH, external: true },
    ],
  },
  {
    title: 'Confident but unidentifiable: Positivity limits on cross-region attribution in geospatial models',
    venue: 'Transactions in GIS',
    status: 'Accepted pending revisions',
    links: [
      { label: 'Project page', href: '/research/confident-but-unidentifiable' },
      { label: 'Code', href: REPO_TGIS, external: true },
    ],
  },
  {
    title: 'Cross-region source-invariance in Earth observation',
    venue: 'Ongoing',
    status: 'Not yet peer-reviewed',
    links: [
      { label: 'Summary', href: '/research#ongoing' },
      { label: 'Code', href: REPO_XR, external: true },
    ],
  },
];

const ext = { target: '_blank', rel: 'noopener noreferrer', className: 'link-inline' } as const;

function StudyHeading({ id, title, meta }: { id: string; title: string; meta: string }) {
  return (
    <header id={id} className="mt-16 mb-6 scroll-mt-24">
      <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">{title}</h2>
      <p className="mt-2 text-sm text-muted italic">{meta}</p>
    </header>
  );
}

export default function ResearchStatementPage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12">
          <p className="overline mb-4">Research statement</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-[-0.025em] leading-[1.1] mb-6 text-balance">
            When can a model of the Earth be trusted where it was not trained?
          </h1>
          <p className="text-sm font-mono uppercase tracking-wider text-subtle">
            Rohan Bali · Independent researcher · November 2026
          </p>
        </header>

        <article className="prose-research max-w-prose">
          <p>
            Machine-learning models of the Earth are trained where labeled data
            is plentiful and then used almost everywhere else. A model fit on
            the United States ends up drawing maps of Lima or Lagos. My research
            asks when such a model can be trusted in a place or time it was not
            trained on. I work at the intersection of GIScience and machine
            learning, on the evaluation, identifiability and uncertainty of
            Earth-observation models under geographic shift.
          </p>
          <p>
            Across three sole-authored studies I have found the same pattern:
            the evidence the field uses to trust these models often does not
            measure what it claims to. A comparison credits the architecture for
            what the input pipeline did. An explanation fits the source region
            well and points the wrong way in the target. An uncertainty estimate
            ranks errors correctly and understates their size. Each study tests
            one kind of evidence, and the agenda at the end turns those tests
            into checks a model should pass before it is used somewhere new.
          </p>
        </article>

        {/* Program diagram */}
        <figure className="my-12" aria-labelledby="program-caption">
          <div className="border border-accent/40 bg-paper px-5 py-4 text-center">
            <p className="font-serif text-base text-ink leading-snug">
              When can an Earth-observation model be trusted where it was not trained?
            </p>
          </div>
          <div className="hidden sm:grid grid-cols-3" aria-hidden="true">
            {studies.map((s) => (
              <div key={s.label} className="flex justify-center">
                <span className="block w-px h-6 bg-rule" />
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mt-3 sm:mt-0">
            {studies.map((s) => (
              <div key={s.label} className="border border-rule bg-paper p-4">
                <p className="text-sm font-medium text-ink mb-1">{s.label}</p>
                <p className="text-sm text-muted leading-snug mb-3">{s.finding}</p>
                <p className="text-xs text-subtle">{s.venue}</p>
              </div>
            ))}
          </div>
          <div className="hidden sm:grid grid-cols-3" aria-hidden="true">
            {studies.map((s) => (
              <div key={s.label} className="flex justify-center">
                <span className="block w-px h-6 bg-rule" />
              </div>
            ))}
          </div>
          <div className="border border-rule bg-paper p-4 mt-3 sm:mt-0">
            <p className="text-sm font-medium text-ink mb-1">
              PhD agenda: evidence checks before deployment
            </p>
            <p className="text-sm text-muted leading-snug">
              Years 1–2: diagnostics for input design, source–target overlap and
              the size of uncertainty. Years 3–5: maps of where predictions and
              explanations can be trusted, in regions underrepresented in
              training data.
            </p>
          </div>
          <figcaption id="program-caption" className="mt-3 text-xs font-mono text-subtle">
            One question, three studies, one agenda.
          </figcaption>
        </figure>

        <article className="prose-research max-w-prose">
          <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug mt-4 mb-6">
            How I came to this question
          </h2>
          <p>
            My first machine-learning project, in 2020, modeled road-accident
            hotspots from Indian government data. The first model reported high
            accuracy and missed most of the hotspots. Hotspots were rare, so
            predicting &ldquo;safe&rdquo; almost everywhere scored well. I
            reworked the features, balanced the classes and changed what I
            measured before comparing models again. It was the first time I saw
            a good number hide a failure, and I have checked what my numbers
            actually measure ever since.
          </p>
          <p>
            In 2023, during the Himachal Pradesh floods, I worked with The
            Parivartan Foundation, using satellite and government data to locate
            about 20 communities that had been cut off, so relief could reach
            them. That work made the geographic side of the problem concrete.
            The places that most need Earth-observation models are often the
            ones least represented in the data those models learn from.
          </p>

          <StudyHeading
            id="benchmarks"
            title="Benchmarks that credit the wrong cause"
            meta="M.S. thesis, University of Massachusetts Dartmouth, advised by Dr. Donghui Yan"
          />
          <p>
            Urban-growth benchmarks agree on a pattern. As the forecast horizon
            grows, CNNs get worse and ConvLSTMs get better, and the gap is
            credited to recurrence. While building my thesis benchmark I noticed
            that, in the standard GHSL setup, extending the horizon also drops
            the most recent input epoch, which cuts the input from 24 channels
            to 21. I hypothesized that this input change, not the horizon, drove
            the CNN&apos;s decline.
          </p>
          <p>
            To separate the two, I built a benchmark of 5,698 tiles of the
            contiguous United States at 250&nbsp;m on Google Earth Engine, held
            the prediction target fixed, and removed epochs from the oldest end
            so that channel count and horizon no longer moved together. I also
            sealed a 2020 holdout, downloading that year only after all model
            selection was finished, and ran the models zero-shot on 20 tiles of
            Lagos. The channel reduction accounts for 94% of the CNN&apos;s drop
            in Figure of Merit from the 5-year to the 10-year horizon
            (delta-method 95% CI 62–100%). The ConvLSTM&apos;s gain is real but
            positional: removing its most recent epoch moves its score 5.4 times
            as much as removing the four oldest combined. With channels matched,
            the CNN leads at every horizon, on the spatial holdout and on the
            sealed 2020 holdout.
          </p>
          <p>
            Two more results came out of the same benchmark. The metric decides
            the winner: a model that simply repeats the last observation wins on
            mean squared error, because most pixels never change, while scoring
            zero on Figure of Merit, which ignores pixels that correctly stay
            unchanged. And across 8.69 million pixels, MC Dropout uncertainty
            ranked errors well (r&nbsp;=&nbsp;0.983) but understated their size
            by 1.4 to 1.9 times.
          </p>
          <p>
            The lesson I took from it: a benchmark comparison is only as valid
            as the variables it holds fixed. The short paper was published at
            GeoAI 2026 as an oral presentation, and the extended version is
            accepted in Springer&apos;s Lecture Notes in Computer Science
            (SpatialDI 2026). The{' '}
            <a href={REPO_MH} {...ext}>
              code, benchmark and trained weights
            </a>{' '}
            are public.
          </p>

          <StudyHeading
            id="explanations"
            title="Explanations the data cannot support"
            meta="Sole-authored · Transactions in GIS, accepted pending revisions"
          />
          <p>
            When a model trained in one region fails in another, explainable-AI
            methods are used to say why: the terrain is rougher, or the
            settlement pattern is different. I asked a prior question. Can the
            data identify such an explanation at all? I framed it as a
            transportability problem. An attribution can be read from source
            data only where the target&apos;s conditions also occur in the
            source, which is the positivity condition, and only if the link
            between those conditions and performance carries over between
            regions.
          </p>
          <p>
            I derived a positivity diagnostic and a partial-identification
            bound, with a threshold computable from source data alone beyond
            which not even the sign of an attribution is identified. I applied
            it to land-cover models transferred from the contiguous United
            States to 44 cities in four world regions, describing every tile by
            12 terrain, transport and settlement covariates. Only 5.8% of Andes
            tiles fell inside the source support, against 77% of held-out US
            tiles. A covariate explanation that fit held-out US data well
            predicted the wrong sign of the transfer gap for all three
            architectures that degraded, in all four regions, using the mean
            prediction over ten random seeds.
          </p>
          <p>
            This changed how I think about explanation. An honest account of a
            model&apos;s failure has to report whether it is identifiable, not
            only what it attributes. The diagnostic needs only source data and
            target covariates, so it can be run before an explanation is
            trusted. The paper is accepted pending revisions at{' '}
            <em>Transactions in GIS</em>, and its{' '}
            <Link href="/research/confident-but-unidentifiable" className="link-inline">
              analysis
            </Link>{' '}
            reproduces from the repository with one command.
          </p>

          <StudyHeading
            id="ongoing"
            title="Ongoing: what transfer actually depends on"
            meta="Code and results public · not yet peer-reviewed"
          />
          <p>
            If explanations of transfer failure are often unidentifiable, what
            does decide transfer? I trained a model in each of 20 world regions
            and tested every model on every region. The training region barely
            mattered: the home-field advantage was −0.001 Figure of Merit, and a
            region&apos;s difficulty tracked how fast it was changing
            (Spearman&nbsp;ρ&nbsp;=&nbsp;0.97). A parameter-free baseline that
            extends each region&apos;s recent past beat the trained CNN (0.56
            against 0.34), and neither GroupDRO nor pooling the training regions
            helped. What did matter was the input. Globally harmonised products
            transferred almost completely, while raw Landsat history kept only
            about 55% of its in-region performance. When I reanalysed the
            published PANGAEA benchmark, the dataset, not the model, again
            accounted for most of the variation in scores.
          </p>
          <p>
            The question I am still working through is whether part of this is
            circular. When the inputs are themselves outputs of global models,
            they may transfer well by construction. This work is not yet
            peer-reviewed; the{' '}
            <a href={REPO_XR} {...ext}>
              code and data
            </a>{' '}
            are public.
          </p>

          <h2 id="agenda" className="font-serif text-2xl text-ink tracking-tight leading-snug mt-16 mb-6 scroll-mt-24">
            Research agenda
          </h2>
          <p>
            The gap these studies point to is that GeoAI has no standard way to
            show, before deployment, that a model&apos;s evidence holds in a new
            place. Benchmarks rarely hold input design fixed, explanations
            rarely report how much of the target the source data covers, and
            uncertainty is judged by how well it ranks errors rather than
            whether it sizes them. I propose to build those checks into how
            Earth-observation models are evaluated and used, in two phases.
          </p>
          <p>
            <strong className="font-medium">Years 1–2: diagnostics.</strong> I
            intend to turn the channel-matched audit and the positivity
            diagnostic into general tools: evaluation protocols that control
            input design, report source–target overlap and keep sealed temporal
            holdouts. Two questions sit inside this. First, do pretrained
            geospatial foundation models widen the source support, or only move
            the gap into an embedding space that nobody checks? Second, can
            conformal or post-hoc calibration correct the size of uncertainty
            under geographic shift, not only its ranking, when MC Dropout
            currently understates error by up to nearly two times?
          </p>
          <p>
            <strong className="font-medium">Years 3–5: deployment.</strong> I
            propose to test these tools on flood mapping, land cover and urban
            growth in regions underrepresented in training data, and to produce
            maps that mark where a model&apos;s predictions and explanations can
            be trusted and where they cannot. The same diagnostic can also say
            where new labels would help most: target areas that fall outside
            the source support are where a small labeling effort would make an
            explanation identifiable. That turns an audit into a plan for
            collecting data.
          </p>

          <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug mt-16 mb-6">
            How I work
          </h2>
          <p>
            I have taken each of these studies from question to published code
            on my own: building the data pipelines, designing the controls,
            deriving the bounds and writing the papers. Every number in them can
            be regenerated from code and result files I release. I want to keep
            doing this inside a group, where the work is tested by people who
            see the problem from other sides, whether GIScience, statistics or
            Earth-system science.
          </p>
          <p>
            I am applying to PhD programs starting in Fall 2027, in geography
            and GIScience, Earth-system science and computer science.
          </p>
        </article>

        {/* Selected work */}
        <section className="mt-16 pt-10 border-t border-rule" aria-labelledby="selected-work">
          <h2 id="selected-work" className="font-serif text-2xl text-ink tracking-tight mb-2">
            Selected work
          </h2>
          <p className="text-sm text-muted italic mb-8">
            All sole-authored, with public code and data.
          </p>
          <ol className="divide-y divide-rule border-y border-rule">
            {work.map((w) => (
              <li key={w.title} className="py-5 grid sm:grid-cols-[1fr_auto] gap-x-6 gap-y-2">
                <div>
                  <p className="font-serif text-base text-ink leading-snug text-pretty">{w.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    <em>{w.venue}</em> · {w.status}
                  </p>
                </div>
                <p className="text-sm flex flex-wrap sm:flex-col sm:items-end gap-x-4 gap-y-1">
                  {w.links.map((l) =>
                    l.external ? (
                      <a key={l.label} href={l.href} {...ext}>
                        {l.label}
                      </a>
                    ) : (
                      <Link key={l.label} href={l.href} className="link-inline">
                        {l.label}
                      </Link>
                    ),
                  )}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <p className="overline mb-4">Read further</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href="/research" className="link-inline">
              Research threads
            </Link>
            <Link href="/publications" className="link-inline">
              Publications
            </Link>
            <Link href="/code" className="link-inline">
              Code &amp; data
            </Link>
            <a href={asset('/RohanBali_CV.pdf')} download className="link-inline">
              CV (PDF)
            </a>
            <Link href="/#contact" className="link-inline">
              Contact
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
