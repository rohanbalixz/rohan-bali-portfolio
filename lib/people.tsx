// Faculty pages, so every mention of an advisor or supervisor links the same way.

import { Fragment } from 'react';

export const people: Record<string, string> = {
  'Donghui Yan': 'https://www.umassd.edu/directory/dyan/',
  'Dana Fine': 'https://scholar.google.com/citations?user=43ocYkEAAAAJ&hl=en',
  'Vijaypal Singh Dhaka': 'https://jaipur.manipal.edu/fosta/faculty-details.php?url=133/',
};

// Titles stay outside the link, so "Dr. Donghui Yan" links only "Donghui Yan".
const pattern = new RegExp(
  `(${Object.keys(people)
    .sort((a, b) => b.length - a.length)
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})`,
  'g',
);

export function Linkify({ text }: { text: string }) {
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        people[part] ? (
          <a
            key={i}
            href={people[part]}
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline"
          >
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
