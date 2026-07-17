import type { Metadata } from 'next';
import Link from 'next/link';
import { asset } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Research statement',
  description:
    'My research statement. I work on how Earth-observation models are evaluated: benchmark confounds, cross-region transfer, whether an explanation of a failure is even identifiable, and whether uncertainty estimates hold up once the data shifts.',
};

export default function ResearchStatementPage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-14">
          <p className="overline mb-4">Research statement</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-[-0.025em] leading-[1.1] mb-6 text-balance">
            When a deep model looks better, is it learning something better, or
            did the benchmark quietly make the comparison unfair?
          </h1>
          <p className="text-sm font-mono uppercase tracking-wider text-subtle">
            Rohan Bali. M.S. Data Science, UMass Dartmouth. 2026.
          </p>
        </header>

        <article className="prose-research max-w-prose">
          <p>
            The question in the title is the one I keep coming back to. A model
            posts a better score, and the field reads that as the model having
            learned something the last one missed. Often it has not. The gain
            came from how the data was arranged for the test, and a different
            arrangement would have handed the win to something else. My work is
            about finding those cases and saying, with evidence, how much of a
            reported result is the model and how much is the setup.
          </p>

          <p>
            I work on spatiotemporal vision for Earth observation: models that
            read decades of satellite data and predict how land changes. They
            are tested across time and across regions, which is exactly where
            evaluation quietly bends. The input pipeline can shift when the
            forecast horizon changes. One accuracy measure can rank a model
            first while another ranks it last. A model that works over one
            continent can come apart over the next. I care about these seams
            because this is where our beliefs about a model are formed, and
            where a wrong belief is easiest to publish.
          </p>

          <p>
            My first sole-authored study,{' '}
            <Link
              href="/research/channel-count-confound"
              className="link-inline"
            >
              The Channel-Count Confound
            </Link>
            , took apart a result that recurs across the multi-horizon
            urban-growth literature: recurrent models appear to overtake plain
            CNNs at longer horizons. I built a controlled benchmark over 5,698
            tiles of the continental United States at 250 m, with a spatial
            holdout, a 2020 temporal holdout downloaded only after model
            selection was finished, and a cold transfer to Lagos. Moving from a
            five-year to a ten-year forecast does more than push the target
            further out. It also drops the most recent input epoch, which cuts
            the encoder from 24 channels to 21. Once I hold the channel count fixed,
            most of the apparent CNN decline goes with it. A bootstrap
            attributes 94 percent of the drop to the lost channel, and the gap
            between the CNN and the recurrent model collapses to under 0.015
            FoM. The headline was never about recurrence. It was about what the
            protocol fed each model.
          </p>

          <p>
            That pushed me toward a larger question about geography. When a
            model transfers poorly to a new region, is that the model&apos;s
            fault or the region&apos;s? In a follow-on study I trained one model
            per region and evaluated every model on every region, across twenty
            regions. Holding the input fixed, the training source barely counts.
            The test region sets the score, training on a region&apos;s own data
            buys almost nothing, and the difficulty ordering is nearly identical
            across six architectures, fine-tuned foundation models included. A
            one-line rule that extends each region&apos;s recent past beats every
            trained model. Change the input instead of the model and transfer
            moves along a clean spectrum, from harmonized products that carry
            over to raw sensor reflectance that does not. The deciding factor was
            the data, not the architecture, and the same pattern held on an
            outside benchmark.
          </p>

          <p>
            Both studies kept hitting the same wall, so I went at it directly.
            When a geospatial model fails in a new region, people explain the
            failure by pointing at a covariate: the terrain is rougher, the
            settlement is denser. My most recent work, currently{' '}
            <Link href="/publications" className="link-inline">
              under review at Transactions in GIS
            </Link>
            , asks whether that explanation can be recovered from the data at
            all before anyone trusts it. Written as a transportability problem,
            the answer is often no. I derive a support diagnostic and a
            partial-identification bound whose controlling constant can be
            estimated from the source region alone, together with a threshold
            past which not even the sign of an attribution is identified. On
            transfer from the United States to 44 cities across four world
            regions, overlap with the training data falls as low as 6 percent,
            and a confident, well-fit explanation predicts the wrong direction
            of the gap in every architecture that degrades. The explanation is
            not just noisy. It points the opposite way, and the geometry of the
            data says it has to.
          </p>

          <p>
            A third thread runs under all of this: whether a model&apos;s stated
            confidence still means anything once the distribution moves. In the
            channel-count benchmark, MC Dropout uncertainty ranked tile-level
            error almost perfectly, a Pearson r of 0.983 across ten deciles,
            while underestimating the actual magnitude by 1.4 to 1.9 times. That
            gap is the whole point. A score good enough to decide which
            predictions to check by hand is not good enough to promise coverage,
            and treating one as the other is how a calibration claim breaks in
            deployment.
          </p>

          <p>
            What ties these together is a stance about evaluation. I try to
            report what the evidence supports and nothing past it. The holdouts
            are sealed before the data is seen, the inputs are matched so two
            models get the same information, the statistics are checked tile by
            tile, and the limitations sit beside the results rather than at the
            end. Every number I publish can be regenerated from the code I
            release. This is not caution for its own sake. In this field the
            reader usually cannot rerun the experiment, so the honesty of the
            protocol is most of what a result is worth.
          </p>

          <p>
            For a PhD I want to turn these one-off audits into methods other
            people can use: diagnostics that flag input-design confounds before
            a comparison is trusted, tests that mark where a model stops
            transferring across time or geography, and identifiability checks
            that say when the explanation of a failure can be recovered and when
            it cannot. None of this should stay inside urban-growth modeling.
            The same failures turn up wherever models are evaluated under shift
            with metrics that were never stress-tested. What I am after is a way
            of doing spatiotemporal machine learning where the evaluation is
            treated as an experiment in its own right, not a formality that
            follows the model.
          </p>

          <p>
            I would like to do that work with people who treat evaluation as a
            research problem, and who care whether a claim about a model would
            survive someone else reproducing it.
          </p>
        </article>

        <section className="mt-16 pt-10 border-t border-rule">
          <p className="overline mb-6">Read further</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link
              href="/research/channel-count-confound"
              className="btn-primary"
            >
              Channel-count project page
            </Link>
            <Link
              href="/#research"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Research
            </Link>
            <Link
              href="/code"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Code &amp; data
            </Link>
            <a
              href={asset('/RohanBali_CV.pdf')}
              download
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              CV (PDF)
            </a>
            <Link
              href="/#contact"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              Contact
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
