import type { Metadata } from 'next';
import { asset, siteMeta } from '@/lib/site';
import cvData from '@/data/cv.json';

export const metadata: Metadata = {
  title: 'CV',
  description:
    'Research CV. Education, publications, research and professional experience, presentations, and skills.',
};

type CvLink = { label: string; href: string };

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

const EntryHeader = ({
  title,
  duration,
}: {
  title: string;
  duration?: string;
}) => (
  <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
    <h3 className="font-serif text-base text-ink leading-snug">{title}</h3>
    {duration && (
      <span className="text-xs font-mono text-subtle">{duration}</span>
    )}
  </div>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-rule">
    {items.map((b, i) => (
      <li key={i} className="text-sm text-muted leading-relaxed">
        {b}
      </li>
    ))}
  </ul>
);

const Links = ({ links }: { links?: CvLink[] }) =>
  links && links.length > 0 ? (
    <p className="mt-1.5 text-sm flex flex-wrap gap-x-4 gap-y-1">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline"
        >
          {l.label}
        </a>
      ))}
    </p>
  ) : null;

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
            <a href={`mailto:${siteMeta.email}`} className="link-inline">
              {siteMeta.email}
            </a>
          </div>
        </header>

        <Section title="Research interests">
          <p className="text-base text-ink leading-loose max-w-prose">
            {cvData.research_interests}
          </p>
        </Section>

        <Section title="Education">
          <ul className="space-y-8">
            {cvData.education.map((edu: any, i: number) => (
              <li key={i}>
                <EntryHeader title={edu.institution} duration={edu.duration} />
                <p className="text-sm text-muted italic mb-1">
                  {edu.degree} · {edu.location}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    <span className="text-ink">GPA:</span> {edu.gpa}
                  </p>
                )}
                {edu.thesis && (
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    <span className="text-ink">Thesis:</span>{' '}
                    <em>{edu.thesis}</em>
                  </p>
                )}
                {edu.advisor && (
                  <p className="text-sm text-muted leading-relaxed mt-1">
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
                {edu.project && (
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    <span className="text-ink">Minor project:</span>{' '}
                    <em>{edu.project}</em>
                    {edu.supervisor && <> (Supervisor: {edu.supervisor})</>}
                  </p>
                )}
                {edu.coursework && (
                  <p className="text-sm text-muted leading-relaxed mt-1">
                    <span className="text-ink">Selected coursework:</span>{' '}
                    {edu.coursework.join('; ')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Publications">
          <p className="text-sm text-muted italic mb-5">
            All sole-authored, with public code and data.
          </p>
          <ol className="space-y-6">
            {cvData.publications.map((pub: any, i: number) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-sm text-accent tabular shrink-0 pt-0.5">
                  [{i + 1}]
                </span>
                <div>
                  <p className="text-sm text-muted leading-relaxed">
                    <span className="text-ink">{pub.authors}</span>{' '}
                    ({pub.year}).{' '}
                    <span className="font-serif text-base text-ink">
                      {pub.title}
                    </span>{' '}
                    <em>{pub.venue}</em>{' '}
                    <span className="text-ink">{pub.status}</span>
                  </p>
                  {pub.note && (
                    <p className="mt-1 text-sm text-muted leading-relaxed">
                      {pub.note}
                    </p>
                  )}
                  <Links links={pub.links} />
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Research experience">
          <ul className="space-y-8">
            {cvData.research_experience.map((r: any, i: number) => (
              <li key={i}>
                <EntryHeader title={r.role} duration={r.duration} />
                {r.detail && (
                  <p className="text-sm text-muted italic">{r.detail}</p>
                )}
                <Bullets items={r.bullets} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Professional experience">
          <ul className="space-y-8">
            {cvData.professional_experience.map((p: any, i: number) => (
              <li key={i}>
                <EntryHeader title={p.role} duration={p.duration} />
                {p.detail && (
                  <p className="text-sm text-muted italic">{p.detail}</p>
                )}
                <Bullets items={p.bullets} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Presentations">
          <ul className="space-y-4">
            {cvData.presentations.map((t: any, i: number) => (
              <li
                key={i}
                className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1"
              >
                <span className="text-sm text-muted leading-relaxed flex-1 min-w-0">
                  <span className="text-ink">Bali, R.</span> {t.title}{' '}
                  <em>{t.detail}</em>
                </span>
                <span className="text-xs font-mono text-subtle">{t.date}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Honors">
          <ul className="space-y-4">
            {cvData.honors.map((h: any, i: number) => (
              <li key={i}>
                <EntryHeader title={h.title} duration={h.year} />
                {h.description && (
                  <p className="text-sm text-muted leading-relaxed">
                    {h.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <dl className="space-y-5">
            {cvData.skills.map((s: any) => (
              <div key={s.label}>
                <dt className="overline mb-2">{s.label}</dt>
                <dd className="text-sm text-ink leading-relaxed">{s.text}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="References">
          <ul className="space-y-2">
            {cvData.references.map((r: any) => (
              <li key={r.name} className="text-sm text-muted leading-relaxed">
                <span className="text-ink">{r.name}</span>, {r.title}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-20 pt-10 border-t border-rule text-center">
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
