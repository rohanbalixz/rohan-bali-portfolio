import type { Metadata } from 'next';
import Link from 'next/link';
import projects from '@/data/projects.json';

export const metadata: Metadata = {
  title: 'Archive. Engineering and systems projects',
  description:
    'Engineering and applied systems work outside the current research focus.',
};

export default function ArchivePage() {
  const engineering = projects.filter((p) => p.category === 'engineering');

  return (
    <div className="py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-16">
          <p className="overline mb-4">Archive</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-tighter leading-[1.1] mb-6 text-balance">
            Engineering &amp; systems projects.
          </h1>
          <p className="text-base text-muted leading-loose max-w-2xl">
            Applied systems, infrastructure, and product work from before my
            current research focus, kept here for completeness. For research,
            see the{' '}
            <Link href="/research" className="link-inline">
              research page
            </Link>{' '}
            and the{' '}
            <Link
              href="/research/channel-count-confound"
              className="link-inline"
            >
              channel-count study
            </Link>
            .
          </p>
        </header>

        <ul className="divide-y divide-rule">
          {engineering.map((p) => (
            <li key={p.slug} className="py-8">
              <div className="grid md:grid-cols-[1fr_2.5fr] gap-4 md:gap-10">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-subtle mb-2">
                    {p.tags.join(' · ')}
                  </p>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono uppercase tracking-wider text-accent hover:text-accent-hover"
                    >
                      Code &rarr;
                    </a>
                  )}
                </div>
                <div>
                  <h2 className="font-serif text-xl text-ink leading-snug mb-2">
                    {p.title}
                  </h2>
                  {p.tagline && (
                    <p className="text-sm text-ink leading-relaxed mb-2">
                      {p.tagline}
                    </p>
                  )}
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <p className="text-xs font-mono text-subtle">
                    {p.tech_stack.join(' · ')}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 pt-10 border-t border-rule">
          <Link href="/research" className="link-inline text-sm">
            &larr; Back to research
          </Link>
        </div>
      </div>
    </div>
  );
}
