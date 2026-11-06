import type { Metadata } from 'next';
import Link from 'next/link';
import projects from '@/data/projects.json';

export const metadata: Metadata = {
  title: 'Technical projects',
  description:
    'Course and technical projects behind my research: parallel and GPU computing on HPC systems, and geospatial visualization.',
};

export default function ArchivePage() {
  const engineering = projects.filter((p) => p.category === 'engineering');

  return (
    <div className="max-w-3xl mx-auto px-5 pt-8">
      <div>
        <header className="mb-8">
          <h1 className="text-[32px] leading-tight mb-4">
            Technical projects
          </h1>
          <p className="leading-relaxed">
            Course and technical projects behind the computing in my research:
            parallel and GPU computing on HPC systems, and geospatial
            visualization. Each one links to its code. For research, see the{' '}
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

        <ul className="space-y-6">
          {engineering.map((p) => (
            <li key={p.slug}>
              <h2 className="font-bold leading-snug">
                {p.github ? (
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h2>
              <p className="mt-1 leading-relaxed">{p.description}</p>
              <p className="mt-1 text-[15px] text-muted">
                {p.tech_stack.join(', ')}
                {p.github && (
                  <>
                    {' / '}
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      code
                    </a>
                  </>
                )}
                {'demo' in p && p.demo && (
                  <>
                    {' / '}
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                      live demo
                    </a>
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
