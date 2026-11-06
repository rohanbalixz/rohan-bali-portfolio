'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { asset } from '@/lib/site';
import { bibtexById } from '@/lib/citations';
import CopyableBibtex from '@/components/CopyableBibtex';
import { Linkify } from '@/lib/people';

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
  kind?: string;
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

// "Paper (Zenodo)" -> "paper (Zenodo)": lowercase link words, as on most academic pages
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

function A({ l, children }: { l: PaperLink; children: React.ReactNode }) {
  if (!l.href) return <span className="text-subtle">{children}</span>;
  return l.external ? (
    <a href={l.href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={l.href}>{children}</Link>
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

  // The title links to the project page when there is one, else to the paper.
  const titleLink =
    paper.links.find((l) => l.label === 'Project page') ?? paper.links.find((l) => l.href);

  const extra: { key: string; node: React.ReactNode }[] = [];
  if (!compact && paper.abstract)
    extra.push({
      key: 'abstract',
      node: (
        <button type="button" onClick={() => toggle('abstract')} aria-expanded={open === 'abstract'} className="text-accent hover:underline">
          abstract
        </button>
      ),
    });
  if (!compact && bibtex)
    extra.push({
      key: 'bibtex',
      node: (
        <button type="button" onClick={() => toggle('bibtex')} aria-expanded={open === 'bibtex'} className="text-accent hover:underline">
          bibtex
        </button>
      ),
    });

  const linkItems = [
    ...paper.links.map((l) => ({ key: l.label, node: <A l={l}>{lower(l.label)}</A> })),
    ...extra,
  ];

  return (
    <article className="grid sm:grid-cols-[160px_1fr] gap-x-6 gap-y-3">
      {paper.teaser ? (
        <div className="w-[200px] sm:w-[160px] h-[150px] sm:h-[120px] bg-white border border-rule flex items-center justify-center overflow-hidden">
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

      <div className="min-w-0 text-[15px] leading-normal">
        <h3 className="text-[15.5px] font-bold leading-snug">
          {titleLink ? <A l={titleLink}>{paper.title}</A> : paper.title}
        </h3>
        <p className="mt-0.5">
          <strong>{paper.authors}</strong>
        </p>
        <p className="mt-0.5">
          <em>{compact ? paper.venue : <Linkify text={paper.venueFull} />}</em>
          {!(compact && paper.venue.includes(paper.year)) && <>, {paper.year}</>}
          {paper.honor && (
            <>
              {' '}
              <strong className="text-highlight">({lower(paper.honor)})</strong>
            </>
          )}
          {paper.state && paper.state !== 'Published' && <span className="text-muted">, {lower(paper.state)}</span>}
        </p>
        {!compact && paper.format && <p className="text-muted">{paper.format}</p>}
        <p className="mt-0.5">
          {linkItems.map((it, i) => (
            <Fragment key={it.key}>
              {i > 0 && ' / '}
              {it.node}
            </Fragment>
          ))}
        </p>
        <p className="mt-2.5 text-pretty">{paper.summary}</p>

        {!compact && paper.contents && paper.contents.length > 0 && (
          <div className="mt-2.5">
            {paper.contentsLabel && <p className="font-bold">{paper.contentsLabel}:</p>}
            <ul className="mt-1 space-y-1 list-disc pl-5">
              {paper.contents.map((c, i) => (
                <li key={i} className="text-pretty">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {open === 'abstract' && paper.abstract && (
          <div className="mt-3 border-l-2 border-rule pl-4">
            <p className="text-pretty">{paper.abstract}</p>
            {paper.abstractNote && <p className="mt-2 text-xs text-subtle">{paper.abstractNote}</p>}
          </div>
        )}
        {open === 'bibtex' && bibtex && (
          <div className="mt-3">
            <CopyableBibtex bibtex={bibtex} />
          </div>
        )}
      </div>
    </article>
  );
}
