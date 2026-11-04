'use client';

import Link from 'next/link';
import { useState } from 'react';
import { asset } from '@/lib/site';
import { bibtexById } from '@/lib/citations';
import CopyableBibtex from '@/components/CopyableBibtex';

export interface PaperLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  year: string;
  venue: string;
  venueFull: string;
  honor?: string;
  state?: string;
  format?: string;
  summary: string;
  contentsLabel?: string;
  contents?: string[];
  abstract?: string;
  abstractNote?: string;
  teaser?: string;
  teaserAlt?: string;
  links: PaperLink[];
}

const linkClass =
  'text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent';

function PaperLinks({ links }: { links: PaperLink[] }) {
  return (
    <>
      {links.map((l) =>
        !l.href ? (
          <span key={l.label} className="text-subtle italic" aria-disabled="true">
            {l.label}
          </span>
        ) : l.external ? (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {l.label}
          </a>
        ) : (
          <Link key={l.label} href={l.href} className={linkClass}>
            {l.label}
          </Link>
        ),
      )}
    </>
  );
}

export default function PaperCard({
  paper,
  compact = false,
}: {
  paper: Paper;
  compact?: boolean;
}) {
  const [open, setOpen] = useState<'abstract' | 'bibtex' | null>(null);
  const bibtex = bibtexById[paper.id];
  const toggle = (k: 'abstract' | 'bibtex') => setOpen(open === k ? null : k);

  return (
    <article className="grid sm:grid-cols-[176px_1fr] gap-4 sm:gap-6">
      {paper.teaser ? (
        <div className="w-full max-w-[280px] sm:max-w-none aspect-[4/3] bg-white border border-rule flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(paper.teaser)}
            alt={paper.teaserAlt ?? ''}
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}

      <div className="min-w-0">
        <h3 className="font-serif text-lg text-ink leading-snug text-pretty">
          {paper.title}
        </h3>
        <p className="mt-1 text-sm text-ink">
          <span className="font-medium">{paper.authors}</span>
        </p>
        <p className="mt-0.5 text-sm text-muted leading-relaxed">
          <em>{compact ? `${paper.venue}` : paper.venueFull}</em>
          {paper.honor && (
            <>
              {' · '}
              <span className="text-accent font-medium">{paper.honor}</span>
            </>
          )}
          {paper.state && <> · {paper.state}</>}
          {compact && !paper.state && <> · {paper.year}</>}
        </p>
        {paper.format && (
          <p className="mt-0.5 text-xs text-subtle">{paper.format}</p>
        )}
        <p className="mt-2 text-sm text-ink leading-relaxed text-pretty">
          {paper.summary}
        </p>
        {!compact && paper.contents && paper.contents.length > 0 && (
          <div className="mt-3">
            {paper.contentsLabel && (
              <p className="text-xs font-medium uppercase tracking-widest text-muted mb-2">
                {paper.contentsLabel}
              </p>
            )}
            <ul className="space-y-1.5 list-disc pl-5 marker:text-rule">
              {paper.contents.map((c, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed text-pretty">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-2 text-sm flex flex-wrap gap-x-4 gap-y-1">
          <PaperLinks links={paper.links} />
          {!compact && paper.abstract && (
            <button
              type="button"
              onClick={() => toggle('abstract')}
              aria-expanded={open === 'abstract'}
              className={linkClass}
            >
              Abstract
            </button>
          )}
          {!compact && bibtex && (
            <button
              type="button"
              onClick={() => toggle('bibtex')}
              aria-expanded={open === 'bibtex'}
              className={linkClass}
            >
              BibTeX
            </button>
          )}
        </p>

        {open === 'abstract' && paper.abstract && (
          <div className="mt-4 border-l-2 border-rule pl-4">
            <p className="text-sm text-ink leading-relaxed text-pretty">
              {paper.abstract}
            </p>
            {paper.abstractNote && (
              <p className="mt-2 text-xs text-subtle">{paper.abstractNote}</p>
            )}
          </div>
        )}
        {open === 'bibtex' && bibtex && (
          <div className="mt-4">
            <CopyableBibtex bibtex={bibtex} />
          </div>
        )}
      </div>
    </article>
  );
}
