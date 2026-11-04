export const basePath =
  process.env.NODE_ENV === 'production' ? '/rohan-bali-portfolio' : '';

export const asset = (path: string) =>
  `${basePath}${path.startsWith('/') ? path : `/${path}`}`;

// GeoAI 2026 paper, hosted on Zenodo (public record).
export const geoaiPaperUrl = 'https://zenodo.org/records/20278403';

export const siteMeta = {
  name: 'Rohan Bali',
  role: 'Reliable machine learning for Earth observation.',
  email: 'rohanbaliwork@gmail.com',
  affiliation: 'Independent researcher · M.S. Data Science, UMass Dartmouth (2026)',
  lastUpdated: 'November 2026',
};
