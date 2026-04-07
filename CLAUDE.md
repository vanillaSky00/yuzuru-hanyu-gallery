# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static gallery website for Yuzuru Hanyu's figure skating performances, built with Astro + React. Content lives in Markdown; the renderer transforms it into a Pinterest-style masonry gallery with hover preview popovers and editorial detail pages.

## Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server
npm run build        # build to dist/

# Export to output/ (for grading):
rm -rf output/*
cp -r dist/* output/
cp output/index.html output/output.html
```

If `src/` or `package.json` are missing, scaffold the project before installing (see README.md §3.5 Bootstrap Check).

## Architecture

**Content pipeline:**
- `content.md` — site manifest and editorial brief; lists all entries under `## Gallery Entries`
- `entries/*.md` — one file per performance; frontmatter drives all rendering (title, slug, year, cover, images[], intro, size, order, tags, previewVideo, previewPoster, coverPosition, layout_hint)
- `assets/images/` and `assets/previews/` — raw assets (never modify during builds)
- `astro.config.mjs` sets `publicDir: 'assets'` so `assets/images/foo.jpg` becomes `/images/foo.jpg` at runtime; the `pub()` helper in both page files handles this path conversion

**Rendering layer:**
- `src/layouts/Layout.astro` — global HTML shell; all CSS design tokens and layout styles live here as a `<style is:global>` block (no separate CSS files)
- `src/pages/index.astro` — loads all entries via `Astro.glob`, sorts by `order`, renders `<GalleryCard>` components with `client:visible`
- `src/pages/[slug]/index.astro` — static paths from entry slugs; implements the editorial detail page layout (Title Block → Lead Media capped at 70% → Article Body → Nav Widget); splits compiled HTML at `<h2>` boundaries and interleaves body images alternating left/right using a grid composition
- `src/components/GalleryCard.jsx` — React island; manages hover popover (200ms open / 180ms close delay), popover side positioning (left vs right based on card position), video autoplay/pause on hover, mute state persisted in `sessionStorage` under key `hanyu_muted`

**Key design constraints (from README MODULE L):**
- After lead media, the next rendered block must always be text — never another image
- No two full-width (>70%) media blocks consecutively
- Images from `images[]` must be distributed throughout the article body, not collected at the end
- Detail page section order is fixed: Title Block → Lead Media → Article Body → Navigation Widget
- Hover popover media fallback order: `previewVideo` → `previewPoster` → `cover`

**Card size → aspect ratio mapping** (in GalleryCard.jsx):
- `tall` → `3/4`, `medium` → `4/5`, `wide` → `5/4`

**Gallery grid** uses CSS `columns: 3` (masonry via column-count, not CSS Grid or JS), collapsing to 2 at 900px and 1 at 560px. Popover is hidden on mobile (≤560px).
