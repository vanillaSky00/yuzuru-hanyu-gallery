# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static gallery website for Yuzuru Hanyu's figure skating performances, built with Astro + React. Content lives in Markdown; the renderer transforms it into a character profile page with a bento gallery grid, Netflix-style hover popovers, and editorial detail pages.

## Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server (http://localhost:4321)
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
- `astro.config.mjs` sets `publicDir: 'assets'` so `assets/images/foo.jpg` becomes `/images/foo.jpg` at runtime; the `pub()` helper in page files handles this path conversion

**Two layouts — keep them separate:**
- `src/layouts/ProfileLayout.astro` — used by the index page only; contains the sidebar/topnav CSS, bento grid CSS, grain overlay, Fraunces + DM Mono fonts, and the sidebar collapse JS
- `src/layouts/Layout.astro` — used by detail pages only; contains the editorial article CSS (detail-wrap, lead-media, article-body, nav-widget)

**Pages:**
- `src/pages/index.astro` — loads all entries via `Astro.glob`, sorts by `order`, renders the sidebar profile panel and bento grid using `GalleryCard` with `client:visible` and `fill={true}`
- `src/pages/[slug]/index.astro` — static paths from entry slugs; implements the editorial detail page layout (Title Block → Lead Media capped at 70% → Article Body → Nav Widget); splits compiled HTML at `<h2>` boundaries and interleaves body images alternating left/right

**`src/components/GalleryCard.jsx`** — React island shared by both layouts:
- Hover popover: opens after 200ms, closes after 180ms
- Popover side (left vs right): measures actual pixel space (`window.innerWidth - rect.right`) against popover width (460px / 360px at <1100px) — flips to left when right side would overflow
- Video: autoplays unmuted on hover; if browser blocks unmuted autoplay, falls back to muted silently without persisting to sessionStorage
- Mute state: global across all card instances via `window` custom event `hanyu-mute-change`; also persisted to `sessionStorage` key `hanyu_muted`. Default is unmuted (`false`)
- `fill` prop: when `true`, uses `height: 100%` instead of `aspectRatio` — required for bento grid cells

**Bento grid (index page):**
- CSS Grid with `grid-template-columns: repeat(12, 1fr)` and `grid-auto-rows: 80px`
- 10 cards mapped by `data-pos` (0–9, driven by entry `order` sort); each card's column/row span and border-radius defined in `ProfileLayout.astro` under `.bcard[data-pos="N"]`
- Each `.bcard` is a wrapper div handling grid placement only; `GalleryCard` fills it with `margin-bottom: 0 !important` to prevent bleed into adjacent rows
- To resize a single card: edit its `grid-column` and `grid-row` in `ProfileLayout.astro`; to resize all cards uniformly, change `grid-auto-rows`
- Popover hidden on mobile (≤560px); grid collapses to 2-column at ≤640px

**Sidebar → topnav collapse:**
- JS scroll listener in `ProfileLayout.astro` (threshold: 80px); adds `.collapsed` to `#sidebar` and `nav-collapsed` to `body`
- CSS transitions handle width/height/padding/flex-direction changes; collapsed state shows `sb-nav-links`, hides bio/stats/socials

**Key design constraints (from README MODULE L):**
- After lead media on detail pages, the next rendered block must always be text — never another image
- No two full-width (>70%) media blocks consecutively
- Images from `images[]` must be distributed throughout the article body, not collected at the end
- Detail page section order is fixed: Title Block → Lead Media → Article Body → Navigation Widget
- Hover popover media fallback order: `previewVideo` → `previewPoster` → `cover`
