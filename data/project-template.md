# How to Add a New Case Study

This portfolio reads every project from `data/projects.json`. To add a new
case study, copy the block below into the `"projects"` array in that file,
fill in your own content, and save. No component code needs to change.

Field-by-field guide:

- `slug` — unique, URL-safe id (lowercase, hyphens). Becomes the page at
  `/projects/<slug>`.
- `title` — case study title shown on the card and detail page.
- `tagline` — one-line hook shown on the project card.
- `org` — company/client/institution the work was done for or with.
- `role` — your role on the project.
- `year` — year or year range, shown as text (e.g. "2024" or "2023-2024").
- `tags` — array of strings used by the filter bar. Reuse existing tags
  ("SQL & Python", "Dashboards", "Business Requirements / BRDs",
  "Financial Models") where they fit, or introduce a new one — the filter
  bar picks up new tags automatically.
- `featured` — `true` to show in the main grid on first load.
- `thumbnail` — path to an image/svg in `/public`, shown on the card.

- `businessProblem.context` — 1-3 sentences on the situation before you
  got involved.
- `businessProblem.goals` — array of short goal statements.
- `businessProblem.painPoints` — array of short pain-point statements.

- `approach.methodology` — a short paragraph on what you actually did.
- `approach.tools` — array of tool names (shown as badges).
- `approach.dataSources` — array of data source names.

- `insights` — array of specific, numbers-where-possible takeaways.
- `visualizations` — array of `{ type, title, description }` objects
  describing charts/dashboards referenced in the write-up. Leave as `[]`
  if you don't have a specific chart to call out.

- `recommendations` — array of action-oriented recommendation strings.
- `roi` — one sentence quantifying business impact. Use a real number if
  you have one; otherwise describe the impact directionally and honestly.
  Never put a number here you can't back up.

- `media.dashboardEmbed` — `null`, or `{ provider, title, url }` once you
  have a REAL, working link. `provider` is `"tableau"` or `"powerbi"`.
  Leave `null` until you actually have a link — a broken/placeholder link
  is worse than no link.
- `media.documents` — array of `{ title, type, url }` for BRDs, exec
  decks, process maps you actually have as files. Put the file under
  `public/case-studies/<slug>/` and point `url` at it.
- `media.codeSnippets` — array of `{ language, title, githubUrl, code }`
  using your real code and a real repo link. Leave `[]` if you don't want
  to publish code for this project.
- `media.video` — `null`, or `{ provider, title, url }` once you have a
  real recording. `provider` is `"youtube"` or `"loom"`.
- `media.downloads` — array of `{ label, fileUrl, fileType }` for real
  files a visitor can download. Put the actual file under
  `public/case-studies/<slug>/`.

IMPORTANT: leave any `media` field empty (`null` or `[]`) until you have a
real, working link or file. The site hides each media block automatically
when it's empty, and hides the whole "Project Artifacts" section if every
block is empty — so there's never a dead link on the page.

## Template block

```json
{
  "slug": "your-project-slug",
  "title": "Your Project Title",
  "tagline": "One-line hook describing the project.",
  "org": "Company / Client / Institution",
  "role": "Your Role",
  "year": "2026",
  "tags": ["SQL & Python", "Dashboards"],
  "featured": true,
  "thumbnail": "/projects/your-thumb.svg",
  "businessProblem": {
    "context": "What was going on before you got involved.",
    "goals": ["Goal one", "Goal two"],
    "painPoints": ["Pain point one", "Pain point two"]
  },
  "approach": {
    "methodology": "What you actually did, in plain English.",
    "tools": ["Tool one", "Tool two"],
    "dataSources": ["Data source one", "Data source two"]
  },
  "insights": ["Insight one", "Insight two"],
  "visualizations": [],
  "recommendations": ["Recommendation one", "Recommendation two"],
  "roi": "One sentence on business impact.",
  "media": {
    "dashboardEmbed": null,
    "documents": [],
    "codeSnippets": [],
    "video": null,
    "downloads": []
  }
}
```
