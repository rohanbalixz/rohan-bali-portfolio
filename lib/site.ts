export const basePath =
  process.env.NODE_ENV === 'production' ? '/rohan-bali-portfolio' : '';

export const asset = (path: string) =>
  `${basePath}${path.startsWith('/') ? path : `/${path}`}`;

// GeoAI 2026 short paper, hosted on Zenodo (public record).
export const geoaiPaperUrl = 'https://zenodo.org/records/20278403';

export const siteMeta = {
  name: 'Rohan Bali',
  role: 'Geospatial AI. Robust Spatiotemporal Vision. Evaluation under Shift.',
  tagline:
    "I work on robust spatiotemporal vision for Earth observation.",
  email: 'rbali@umassd.edu',
  affiliation: 'M.S. Data Science, University of Massachusetts Dartmouth',
  lastUpdated: 'May 2026',
};
