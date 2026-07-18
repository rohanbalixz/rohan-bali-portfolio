import type { Metadata } from 'next';
import { asset, siteMeta } from '@/lib/site';
import cvData from '@/data/cv.json';

export const metadata: Metadata = {
  title: 'CV',
  description:
    'Research CV. Publications, research projects, education, professional experience, and service.',
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="border-t border-rule pt-12 mt-12">
    <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12">
      <div>
        <h2 className="font-serif text-2xl text-ink tracking-tight leading-snug">
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </div>
  </section>
);

const NumberedList = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5">
    {items.map((h, hi) => (
      <li
        key={hi}
        className="text-xs text-muted leading-relaxed flex gap-3"
      >
        <span className="font-mono text-accent flex-shrink-0 tabular">
          [{hi + 1}]
        </span>
        <span>{h}</span>
      </li>
    ))}
  </ul>
);

export default function CVPage() {
  return (
    <div className="py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-4 max-w-3xl">
          <p className="overline mb-4">Curriculum vitae</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-tighter leading-[1.1] mb-4">
            Rohan Bali
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-subtle mb-6">
            Boston, MA · {siteMeta.lastUpdated}
          </p>
          <p className="text-base text-ink leading-relaxed mb-8 max-w-2xl">
            {cvData.summary}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-base">
            <a
              href={asset('/RohanBali_CV.pdf')}
              className="btn-primary"
              download
            >
              Download PDF
            </a>
            <a
              href={`mailto:${siteMeta.email}`}
              className="link-inline"
            >
              {siteMeta.email}
            </a>
          </div>
        </header>

        <Section title="Research interests">
          <p className="text-base text-ink leading-loose max-w-prose">
            {cvData.research_interests}
          </p>
        </Section>

        <Section title="Publications">
          <ul className="space-y-6">
            {cvData.publications.map((pub: any, i: number) => (
              <li key={i}>
                <p className="font-serif text-base text-ink leading-snug mb-1">
                  {pub.title}
                </p>
                <p className="text-sm text-muted mb-1">{pub.authors}</p>
                <p className="text-sm text-subtle italic mb-1">
                  {pub.venue} ({pub.year})
                </p>
                {pub.note && (
                  <p className="text-xs text-muted leading-relaxed">
                    {pub.note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="In preparation">
          <ul className="space-y-6">
            {cvData.in_preparation.map((pub: any, i: number) => (
              <li key={i}>
                <p className="font-serif text-base text-ink leading-snug mb-1">
                  {pub.title}
                </p>
                <p className="text-sm text-muted mb-2">{pub.authors}</p>
                {pub.note && (
                  <p className="text-xs text-muted leading-relaxed">
                    {pub.note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Research projects">
          <ul className="space-y-8">
            {cvData.research_projects.map((p: any, i: number) => (
              <li key={i}>
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <h3 className="font-serif text-base text-ink leading-snug">
                    {p.title}
                  </h3>
                  <span className="text-xs font-mono text-subtle">
                    {p.duration}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  {p.description}
                </p>
                {p.highlights && <NumberedList items={p.highlights} />}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          <ul className="space-y-6">
            {cvData.education.map((edu: any, i: number) => (
              <li key={i}>
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <h3 className="font-serif text-base text-ink leading-snug">
                    {edu.degree}
                  </h3>
                  <span className="text-xs font-mono text-subtle">
                    {edu.duration}
                  </span>
                </div>
                <p className="text-sm text-muted mb-1">
                  {edu.institution} · {edu.location}
                </p>
                {edu.department && (
                  <p className="text-sm text-muted leading-relaxed">
                    {edu.department}
                  </p>
                )}
                {edu.gpa && (
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    <span className="text-ink">GPA:</span> {edu.gpa}
                  </p>
                )}
                {edu.advisor && (
                  <p className="text-sm text-muted leading-relaxed mt-2">
                    <span className="text-ink">Advisor:</span>{' '}
                    {edu.advisor_url ? (
                      <a
                        href={edu.advisor_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-inline"
                      >
                        {edu.advisor}
                      </a>
                    ) : (
                      edu.advisor
                    )}
                  </p>
                )}
                {edu.thesis && (
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    <span className="text-ink">Thesis:</span> {edu.thesis}
                  </p>
                )}
                {edu.focus && (
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    <span className="text-ink">Focus:</span> {edu.focus}
                  </p>
                )}
                {edu.project && (
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    <span className="text-ink">Final-year project:</span>{' '}
                    {edu.project}
                  </p>
                )}
                {edu.coursework && (
                  <p className="text-xs font-mono text-subtle mt-2 leading-relaxed">
                    {edu.coursework.join(' · ')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Honors & awards">
          <ul className="space-y-3">
            {cvData.honors_awards.map((h: any, i: number) => (
              <li
                key={i}
                className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1"
              >
                <span className="text-sm text-ink">{h.title}</span>
                <span className="text-xs font-mono text-subtle">{h.year}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Professional experience">
          <ul className="space-y-8">
            {cvData.professional_experience.map((p: any, i: number) => (
              <li key={i}>
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <h3 className="font-serif text-base text-ink leading-snug">
                    {p.company}
                    <span className="text-muted font-normal">
                      , {p.location}
                    </span>
                  </h3>
                  <span className="text-xs font-mono text-subtle">
                    {p.duration}
                  </span>
                </div>
                <p className="text-sm text-muted italic mb-2">{p.role}</p>
                <p className="text-sm text-muted leading-relaxed">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Selected engineering">
          <ul className="space-y-6">
            {cvData.engineering_projects.map((p: any, i: number) => (
              <li key={i}>
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <h3 className="font-serif text-base text-ink leading-snug">
                    {p.title}
                  </h3>
                  <span className="text-xs font-mono text-subtle">
                    {p.duration}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-2">
                  {p.description}
                </p>
                {p.highlights && <NumberedList items={p.highlights} />}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Service & volunteering">
          <ul className="space-y-6">
            {cvData.service.map((s: any, i: number) => (
              <li key={i}>
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <h3 className="font-serif text-base text-ink leading-snug">
                    {s.role}
                  </h3>
                  <span className="text-xs font-mono text-subtle">
                    {s.duration}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {s.description}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <dl className="space-y-5">
            <div>
              <dt className="overline mb-2">Research</dt>
              <dd className="text-sm text-ink leading-relaxed">
                {cvData.skills.research.join(' · ')}
              </dd>
            </div>
            <div>
              <dt className="overline mb-2">ML</dt>
              <dd className="text-sm text-ink leading-relaxed">
                {cvData.skills.ml.join(' · ')}
              </dd>
            </div>
            <div>
              <dt className="overline mb-2">Geospatial data</dt>
              <dd className="text-sm text-ink leading-relaxed">
                {cvData.skills.data.join(' · ')}
              </dd>
            </div>
            <div>
              <dt className="overline mb-2">Systems</dt>
              <dd className="text-sm text-ink leading-relaxed">
                {cvData.skills.systems.join(' · ')}
              </dd>
            </div>
          </dl>
        </Section>

        <div className="mt-20 pt-10 border-t border-rule text-center">
          <p className="text-sm text-muted mb-4">
            Complete CV with full project details:
          </p>
          <a
            href={asset('/RohanBali_CV.pdf')}
            download
            className="btn-primary"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
