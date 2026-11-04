import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const base = 'https://rohanbalixz.github.io/rohan-bali-portfolio';

const routes = [
  '',
  '/research',
  '/research/channel-count-confound',
  '/research/confident-but-unidentifiable',
  '/publications',
  '/research-statement',
  '/cv',
  '/code',
  '/contact',
  '/archive',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${base}${r}/`,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : r.startsWith('/research') || r === '/publications' ? 0.8 : 0.5,
  }));
}
