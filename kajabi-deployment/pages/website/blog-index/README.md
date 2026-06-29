# Blog Index Page

**Status:** Template (placeholders present)

## Overview

`blog-index.html` is the Snooze blog landing page. It ships as a Kajabi Website Page custom-code block. Wrapper ID: `#blog-index-page`. Styling comes from the global theme (`kajabi-deployment/global/css/snooze-unified-theme.css`); this page has no inline `<style>` block.

Originally labelled "Blog Index Page, Version 1.0", dated December 2025.

## Structure

- Hero (`.blog-hero`)
- Category navigation (`.blog-categories`) linking to `/blog/category/*`
- Featured post (`.blog-featured`) - single placeholder card
- Posts grid (`.blog-posts`) - one placeholder `<article class="post-card">` template
- CTA (`.blog-cta`) - "Join Snooze"

## Build notes (relocated from in-file comments)

- The posts grid holds ONE `<article class="post-card">` as a template. Blog post cards are intended to be generated dynamically from the migrated posts. Repeat the template card for all 36 blog posts when populating.
- The featured-post block is a single static placeholder; populate it separately from the grid.

## Placeholders to replace before deploy

- Featured: `[FEATURED_IMAGE_URL]`, `[FEATURED_POST_TITLE]`, `[featured-slug]`, `[Featured Post Title]`, `[Featured post excerpt...]`, `[Date]`
- Post card template: `[POST_IMAGE_URL]`, `[POST_TITLE]`, `[CATEGORY]`, `[POST_SLUG]`, `[POST_EXCERPT]`, `[DATE]`

The placeholder scanner will BLOCK deployment until these are replaced; that is expected while this page is a template.

## Maintenance Log

### June 29, 2026: Service-model copy sweep + comment strip

- **Copy rewrite (CTA section):** "live coaching" rewritten to "live sessions" in the "Want More Support?" block. Live sessions with the Snooze Specialists are a real membership benefit; "live coaching" as an included benefit is not.
- **Comments stripped:** all HTML comments removed from `blog-index.html` per the Kajabi deployable-code convention. The header/version metadata and the dynamic-generation build notes those comments carried are captured above.
