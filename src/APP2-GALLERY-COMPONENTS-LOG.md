# APP 2 — Gallery Components Log

**Session:** feature/kayla/gallery-components  
**Branch:** feature/kayla/layout-hero-v2  
**Date:** 2026-03-24  
**Status:** ✅ Complete — 0 build errors, 0 TypeScript errors  

---

## Deliverables

### Components Created

| File | Description |
|------|-------------|
| `src/components/Gallery/CurrentGallery.tsx` | Grid of recent family moments, paginated |
| `src/components/Gallery/CurrentGallery.module.scss` | Warm cream section, 3-col responsive grid |
| `src/components/Gallery/GrowthGallery.tsx` | Sofia & Liam filtered photo gallery |
| `src/components/Gallery/GrowthGallery.module.scss` | Filters panel, warm-white bg, sage eyebrow |
| `src/components/Gallery/GalleryModal.tsx` | Fullscreen viewer with nav, like, comments |
| `src/components/Gallery/GalleryModal.module.scss` | Dark overlay, two-pane layout |
| `src/components/Gallery/GalleryImage.tsx` | Reusable card: skeleton loader, hover zoom, tags |
| `src/components/Gallery/GalleryImage.module.scss` | Soft shadows, image border, heart animation |

### Supporting Infrastructure

| File | Description |
|------|-------------|
| `src/api/mockData.ts` | 13 current + 25 growth images (Picsum), full API layer |
| `src/stores/galleryStore.ts` | Zustand: likes (count + toggle) + comments state |
| `src/stores/uiStore.ts` | Zustand: gallery filters (child, dateRange, tags) |
| `src/hooks/useCurrentGallery.ts` | React Query: paginated current images |
| `src/hooks/useGrowthGallery.ts` | React Query: filtered growth images |
| `src/hooks/useGalleryFilters.ts` | Filter state convenience hook |
| `src/hooks/useLikeImage.ts` | Optimistic like toggle mutation |

---

## Feature Checklist

### CurrentGallery ✅
- [x] Grid of 13 recent family moments (Picsum free photos)
- [x] Each card: caption, date, like count, comment count
- [x] Click-to-expand modal
- [x] Like button (toggle, optimistic Zustand update)
- [x] Comments: add with optional display name (default "Anonymous")
- [x] Skeleton loader while fetching
- [x] Pagination (page selector, total count)
- [x] Responsive: 1 → 2 → 3 columns

### GrowthGallery ✅
- [x] 25 photos: Sofia (11), Liam (9), Both (5) — 2018–2025
- [x] Filter by child: All / Sofia / Liam / Both
- [x] Filter by year range: 2018–2025 (dropdown selectors)
- [x] Filter by tag: birthday, milestone, school, sports, dance, holiday, travel, siblings, swimming, reading
- [x] Sort: Newest / Oldest
- [x] Child badge overlay on each card (color-coded: Sofia = terracotta, Liam = sage, Both = gold)
- [x] Clear filters button (shown when active)
- [x] Result count live feedback
- [x] Empty state when no results

### GalleryModal ✅
- [x] Full-screen image viewer (contain fit, dark background)
- [x] Prev/next navigation arrows
- [x] Keyboard: ← → arrows + ESC to close
- [x] Backdrop click to close
- [x] Image counter (e.g. "3 / 9")
- [x] Caption, date, tags displayed
- [x] Like button with count
- [x] Comments list (scrollable, 220px max height)
- [x] Add comment form: name (optional) + text + submit
- [x] Displays "Anonymous" when no name provided
- [x] Body scroll lock when modal open
- [x] Smooth open/close animations (fadeIn/slideUp → fadeOut)

### GalleryImage ✅
- [x] Reusable card component
- [x] Skeleton shimmer loader
- [x] Error placeholder if image fails
- [x] Lazy loading (`loading="lazy"`)
- [x] Hover: translateY(-5px) + scale(1.05) zoom
- [x] Soft shadows (box-shadow), image border
- [x] Tag row (bottom-left overlay, max 2 tags shown)
- [x] Child badge (top-left, color coded)
- [x] Accessible: aria-label, aria-pressed, keyboard Enter support

---

## Design System

**Aesthetic:** Warm, cozy — consistent with variables.scss design tokens  
**Colors used:**
- `$color-cream` / `$color-warm-white` — section backgrounds
- `$color-terracotta` — primary CTA, Sofia badge, like active
- `$color-sage-dark` — Liam badge, GrowthGallery eyebrow
- `$color-gold` — Both badge
- `$color-beige` — card borders, filter panel borders

**Typography:**
- Section headings: `$font-serif` (Playfair Display)
- Body/UI: `$font-sans` (Inter)

**Animations:**
- Skeleton shimmer (200ms → 200ms cycle)
- Heart pop on like (scale 1 → 1.4 → 1, 280ms)
- Modal: fadeIn + slideUp open; fadeOut close
- Card hover: translateY(-5px) + image scale(1.05)

---

## Architecture

```
Components:
  GalleryImage → useLikeImage + useGalleryStore (comments count)
  CurrentGallery → useCurrentGallery + GalleryImage + GalleryModal
  GrowthGallery → useGrowthGallery + useGalleryFilters + GalleryImage + GalleryModal
  GalleryModal → useLikeImage + useGalleryStore + addComment API

Data flow:
  React Query (useCurrentGallery/useGrowthGallery)
    → fetches from mockData.ts (300ms simulated delay)
    → seeds Zustand galleryStore (likes, images)
  User interactions:
    Like: useLikeImage → optimistic Zustand update → mock API
    Comment: addComment API call → storeAddComment (Zustand)
  Filters (GrowthGallery):
    useGalleryFilters → uiStore (child, dateRange, tags)
    → fed to useGrowthGallery queryKey → API refetch
```

---

## Build Output

```
ready   built in 0.30 s
Total:   304.9 kB   99.4 kB
Errors: 0
Warnings: 0
```

---

## Integration Notes

- Gallery components are self-contained and route-mounted:
  - `/gallery/current` → `<CurrentGallery />`
  - `/gallery/growth` → `<GrowthGallery />`
- The `QueryClientProvider` is at `src/index.tsx`
- Both gallery routes are accessible from the Home page via CTA buttons
