import Link from 'next/link';

export interface PaperLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface PaperCardProps {
  title: string;
  authors: string;
  venues: { label: string; tone?: 'accent' | 'secondary' }[];
  year: string;
  abstract: string;
  links: PaperLink[];
  status?: string;
  featured?: boolean;
}

export default function PaperCard({
  title,
  authors,
  venues,
  year,
  abstract,
  links,
  status,
  featured = false,
}: PaperCardProps) {
  return (
    <article
      className={`py-8 ${featured ? 'border-t-2 border-ink' : 'border-t border-rule'}`}
    >
      <div className="grid md:grid-cols-[1fr_3fr] gap-4 md:gap-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-subtle mb-2">
            {year}
          </p>
          <div className="flex flex-wrap gap-2">
            {venues.map((v, i) => (
              <span
                key={i}
                className={`badge ${v.tone === 'accent' ? 'badge-accent' : v.tone === 'secondary' ? 'badge-secondary' : ''}`}
              >
                {v.label}
              </span>
            ))}
          </div>
          {status && (
            <p className="mt-3 text-xs font-mono text-subtle">{status}</p>
          )}
        </div>

        <div>
          <h3
            className={`font-serif text-ink leading-snug mb-2 ${
              featured ? 'text-2xl' : 'text-xl'
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-muted mb-4">{authors}</p>
          <p className="text-sm text-ink leading-relaxed mb-5 text-pretty">
            {abstract}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((link, i) => {
              if (!link.href) {
                return (
                  <span
                    key={i}
                    className="text-subtle italic cursor-default"
                    aria-disabled="true"
                  >
                    {link.label}
                  </span>
                );
              }
              return link.external ? (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={i}
                  href={link.href}
                  className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
