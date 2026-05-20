# rohan-bali-portfolio

Source for [rohanbalixz.github.io/rohan-bali-portfolio](https://rohanbalixz.github.io/rohan-bali-portfolio/).

A research portfolio for geospatial AI and robust spatiotemporal vision: benchmark validity, geographic transfer, and uncertainty under shift.

## Stack

- Next.js 14 App Router (static export)
- Tailwind CSS (paper-cream palette, Source Serif 4 + Inter + IBM Plex Mono)
- TypeScript strict
- Deployed to GitHub Pages via Actions on every push to `main`

## Local development

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages.

First-time setup: in repo Settings → Pages → Source, select **GitHub Actions**.

## Repository layout

```
app/                  Next.js App Router pages
  page.tsx              Home
  about/                Short bio
  archive/              Engineering archive
  code/                 Code & reproducibility portal
  contact/              Supervisor-facing contact
  cv/                   Web CV (mirrors PDF)
  publications/         Paper cards
  research/             Research themes
    channel-count-confound/   Flagship project page
  research-statement/   Research statement
components/           Shared UI: FlagshipHero, MetricCard, ResultsTable, ClaimStack, ReproChecklist, PipelineDiagram, CopyableBibtex, ...
data/                 Content JSON: cv, papers, projects, social_links
lib/                  site.ts (basePath helper + siteMeta)
public/               Static assets: CV PDF, paper figures, profile, og.svg, icon.svg
```

## License

Content (writing, figures, CV) © Rohan Bali. Code released under MIT — see [LICENSE](LICENSE).
