# Siddharthan Muthukumaran — Data & Business Analyst Portfolio

Next.js 14 (App Router) + Tailwind CSS portfolio, content-driven from JSON so
new projects/experience/photos can be added without touching layout code.

Repo: https://github.com/siddharthanms/https-railway.com-oauth-success
Live site: https://portfolio-production-fd4e.up.railway.app

Every push to `main` auto-deploys on Railway, usually within 1-2 minutes.
(Occasionally the auto-deploy webhook doesn't fire — if the live site hasn't
updated after ~5 minutes, a manual redeploy from the Railway dashboard fixes it.)

## 1. Editing existing text (bio line, a stat, a project description)

1. Go to the repo on github.com.
2. Open the file you want to change (e.g. `data/projects.json`).
3. Click the pencil ("Edit this file") icon in the top right.
4. Make your change directly in the browser.
5. Scroll down, add a short commit message, and click "Commit changes"
   (commit directly to `main`).

## 2. Uploading a new file (photo, PDF, chart) into an EXISTING folder

1. Navigate into that exact folder in the repo, e.g.
   `public/case-studies/hydro-risk/`.
2. Click "Add file" → "Upload files".
3. Drag your file into the drop zone (or use "choose your files").
4. Scroll down, add a commit message, click "Commit changes".
5. Then reference the new file's path from `data/projects.json` (see
   section 4 below) so it actually shows up on the site.

## 3. Uploading into a folder that doesn't exist yet

GitHub's normal upload page only lets you drop files into the folder
you're currently browsing. To create a brand-new folder (e.g. starting a
new case study's asset folder), type the target path straight into your
browser's address bar:

```
https://github.com/siddharthanms/https-railway.com-oauth-success/upload/main/public/case-studies/YOUR-NEW-FOLDER-NAME
```

Upload your files there and commit — GitHub creates the folder
automatically. This is the same trick used to add the Hydro-Risk
report, presentation, notebook, and chart images.

## 4. Where content lives

- `data/profile.json` — name, headline, summary, email, phone, resume link.
- `data/experience.json` — split into `work`, `education`, `certifications`, `awards`.
- `data/skills.json` — skills grouped by category.
- `data/projects.json` — every case study. See `data/project-template.md`
  for a field-by-field guide and copy-paste template for adding a new one.
- `public/case-studies/<slug>/` — real files for that project (PDFs, decks,
  notebooks, chart images). Each project's folder name should match its
  `slug` in `projects.json`.

Inside a project entry in `projects.json`:

- `thumbnail` — path to the image shown on the homepage card, e.g.
  `/case-studies/hydro-risk/charts/price-vs-storage-scatter.png`. Use a real
  chart or screenshot, not a generic placeholder — otherwise the card shows
  blank.
- `visualizations` — array of `{ "type": "image", "title": "...",
  "description": "...", "image": "/case-studies/<slug>/charts/xxx.png" }`
  objects. These render as image cards on the case study page.
- `media.documents` — real documents to preview/link, e.g. the full report PDF.
- `media.downloads` — real files to offer as downloads (pptx, ipynb, pbix, etc).
- `media.codeSnippets` — real code pulled from your actual notebook/report,
  never invented.

Every `media` field is optional — leave it `null`/`[]` until a real file or
link exists. The "Project Artifacts" section only appears on a case study
page if at least one real item exists, so there's never a dead link.

## 5. Adding a whole new project card

This means adding a new object to the `projects` array in
`data/projects.json`. It's plain text, but one misplaced comma or bracket
breaks the entire site's build, so this is the one edit worth having
Claude do directly — send over the project files/details and it'll write
the entry and push it.

If you want to try it yourself: open `data/projects.json` in the GitHub
editor, copy an entire existing project's `{ ... }` block, paste it as a
new item in the array (remember the comma between array items), and edit
the fields inside. Use `data/project-template.md` as the field reference.

## Local development

```bash
npm install
npm run dev
npm run build
npm run start
```
