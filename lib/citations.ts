// BibTeX for the papers, kept in one place so every page cites them the same way.

export const geoaiBibtex = `@inproceedings{bali_channel_count_2026_geoai,
  author    = {Bali, Rohan},
  title     = {Channel Count, Not Horizon Length, Drives Architectural Divergence in Multi-Horizon Urban Growth Prediction},
  booktitle = {Proceedings of the 1st International Conference on Geospatial Artificial Intelligence (GeoAI 2026)},
  editor    = {Huang, Haosheng and Van de Weghe, Nico},
  address   = {Ghent, Belgium},
  year      = {2026},
  doi       = {10.5281/zenodo.20278403},
  note      = {Oral presentation}
}`;

export const spatialdiBibtex = `@inproceedings{bali_channel_count_2026_spatialdi,
  author    = {Bali, Rohan},
  title     = {The Channel-Count Confound: A Continental Audit of Multi-horizon Urban Growth Prediction},
  booktitle = {Spatial Data and Intelligence: 7th International Conference, SpatialDI 2026},
  address   = {Changsha, China},
  series    = {Lecture Notes in Computer Science},
  publisher = {Springer},
  year      = {2026},
  note      = {To appear}
}`;

export const tgisBibtex = `@article{bali_confident_2026_tgis,
  author  = {Bali, Rohan},
  title   = {Confident but Unidentifiable: Positivity Limits on Cross-Region Attribution in Geospatial Models},
  journal = {Transactions in GIS},
  year    = {2026},
  note    = {Major revision}
}`;

export const channelCountBibtex = `${geoaiBibtex}\n\n${spatialdiBibtex}`;

export const bibtexById: Record<string, string> = {
  'channel-count-confound-geoai': geoaiBibtex,
  'channel-count-confound-spatialdi': spatialdiBibtex,
  'confident-but-unidentifiable': tgisBibtex,
};
