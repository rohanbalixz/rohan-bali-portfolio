import Link from 'next/link';
import { siteMeta } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="max-w-3xl mx-auto px-5 mt-20 mb-10 pt-4 border-t border-rule text-xs text-subtle flex flex-wrap justify-between gap-x-6 gap-y-1">
      <p>
        © {new Date().getFullYear()} Rohan Bali. Last updated {siteMeta.lastUpdated}.
      </p>
      <p>
        <Link href="/code">code &amp; data</Link>
        {' · '}
        <Link href="/archive">technical projects</Link>
        {' · '}
        <Link href="/contact">contact</Link>
      </p>
    </footer>
  );
}
