# Siddharthan Muthukumaran — Data & Business Analyst Portfolio

Next.js 14 (App Router) + Tailwind CSS portfolio, content-driven from JSON so
new projects/experience can be added without touching layout code.

## Getting started

```bash
npm install
npm run dev
```

## Editing content (no code required)

- `data/profile.json` — name, headline, summary, email, phone, resume link.
- `data/experience.json` — split into `work`, `education`, `certifications`, `awards`.
- `data/skills.json` — skills grouped by category.
- `data/projects.json` — case studies. See `data/project-template.md` for a
  field-by-field guide and copy-paste template for adding a new one.

Every `media` field (dashboard embed, documents, code, video, downloads) is
optional — leave it `null`/`[]` until you have a real link or file. The
"Project Artifacts" section on a case study page only appears if at least
one real item exists, so there's never a dead link on the page.

## Easiest way to edit without git

1. Go to your GitHub repo in a browser.
2. Open the file you want to change (e.g. `data/projects.json`).
3. Click the pencil ("Edit this file") icon in the top right.
4. Make your change, scroll down, and click "Commit changes" (commit
   directly to `main`).
5. Railway is connected to this repo and will automatically rebuild and
   redeploy within a minute or two of the commit.

## Local development

```bash
npm run build
npm run start
```
