'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Paper' },
  { href: '/code', label: 'Code' },
  { href: '/cv', label: 'CV' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full bg-paper/95 backdrop-blur-md border-b border-rule z-50">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3"
            aria-label="Rohan Bali"
          >
            <span
              className="relative inline-flex items-center justify-center w-7 h-7 font-serif text-base text-ink leading-none"
              aria-hidden="true"
            >
              R
              <span className="absolute bottom-0.5 left-1 right-1 h-px bg-accent" />
            </span>
            <span className="font-serif text-base text-ink tracking-tight">
              Rohan Bali
            </span>
          </div>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-accent'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-muted hover:text-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-1 border-t border-rule pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm py-2.5 transition-colors ${
                  isActive(link.href)
                    ? 'text-accent'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
