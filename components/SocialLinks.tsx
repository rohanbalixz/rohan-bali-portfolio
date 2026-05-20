import socialLinks from '@/data/social_links.json';

interface SocialLinksProps {
  variant?: 'icons' | 'labels';
}

const links = [
  { key: 'github' as const, label: 'GitHub', href: socialLinks.github },
  { key: 'linkedin' as const, label: 'LinkedIn', href: socialLinks.linkedin },
  { key: 'twitter' as const, label: 'X / Twitter', href: socialLinks.twitter },
  { key: 'medium' as const, label: 'Medium', href: socialLinks.medium },
];

export default function SocialLinks({ variant = 'labels' }: SocialLinksProps) {
  if (variant === 'labels') {
    return (
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.key}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {links.map((l) => (
        <li key={l.key}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet underline decoration-rule underline-offset-4 hover:decoration-accent"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
