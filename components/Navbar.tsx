'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/research', label: 'research' },
  { href: '/publications', label: 'publications' },
  { href: '/research-statement', label: 'statement' },
  { href: '/cv', label: 'cv' },
];

export default function Navbar() {
  const pathname = usePathname();
  const path = pathname.replace(/\/$/, '');
  const active = (href: string) => path === href || path.startsWith(href + '/');

  return (
    <nav className="max-w-3xl mx-auto px-5 pt-6 pb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <Link href="/" className="text-lg text-ink hover:no-underline">
        Rohan Bali
      </Link>
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={active(l.href) ? 'text-ink underline underline-offset-4' : 'text-muted hover:text-accent'}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
