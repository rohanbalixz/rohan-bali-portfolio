export const basePath =
  process.env.NODE_ENV === 'production' ? '/rohan-bali-portfolio' : '';

export const asset = (path: string) =>
  `${basePath}${path.startsWith('/') ? path : `/${path}`}`;

// GeoAI 2026 short paper, hosted on Zenodo (public record).
export const geoaiPaperUrl = 'https://zenodo.org/records/20278403';

export const siteMeta = {
  name: 'Rohan Bali',
  role: 'Evaluation methodology and out-of-distribution generalization for Earth-observation vision.',
  tagline:
    'I work on evaluation methodology and out-of-distribution generalization for Earth-observation vision.',
  email: 'rbali@umassd.edu',
  affiliation: 'M.S. Data Science, University of Massachusetts Dartmouth',
  lastUpdated: 'June 2026',
};
