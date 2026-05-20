'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  label: string;
}

interface StickyTocProps {
  items: TocItem[];
}

export default function StickyToc({ items }: StickyTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 },
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On-page contents"
      className="sticky top-24 hidden xl:block"
    >
      <p className="overline mb-4">Contents</p>
      <ul className="space-y-2.5 border-l border-rule pl-4">
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`block text-xs leading-snug transition-colors ${
                  active
                    ? 'text-accent font-medium'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
