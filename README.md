# DUAL OS — iPhone Mode · Interactive Prototype

A premium iPhone-inspired home screen for **DUAL OS** — an Android product that provides
a separate, deeply integrated iPhone-style phone experience. This repository contains the
interactive design prototype (React 18 + Vite, plain CSS, zero runtime dependencies
beyond React) plus the specification documents for the native Android build.

> This is a **design prototype**, not an Android app. System-level behaviours
> (Wi-Fi, torch, notifications, media) are simulated in UI state and labelled as such.

## Run it

```bash
npm install
npm run dev        # open the printed localhost URL
npm run build      # production build to dist/
node scripts/smoke.mjs   # SSR render smoke test
```

## What's implemented

- **Home screen** — 2 swipeable pages, 4-column icon grid, labels, page dots, Search pill,
  glass dock, aurora wallpaper with parallax and brightness dimming.
- **Dynamic Island** — compact/expanded states for clock, music, timer and incoming
  notification, with spring expansion and content crossfades. Fully interactive.
- **Control Center** — drag down from the top-right: connectivity toggles (reflected in
  the status bar), brightness (dims the wallpaper), volume (shared with Music), focus,
  rotation lock, now-playing, flashlight, timer (drives the island), calculator, camera.
- **Notification Center** — drag down from the top-left; swipe-to-dismiss cards,
  Clear All, tap-to-open.
- **Search** — drag down on the grid or tap the pill; live app filtering.
- **Folders** — glass tiles with 3×3 previews; open/close with blur + scale-from-origin.
- **Widgets** — live Weather (medium), ticking analog Clock, Calendar.
- **Edit mode** — long-press empty space or use a context menu: jiggle mode, remove
  items, Done pill.
- **App windows** — zoom-morph open/close from the exact tapped icon; Weather, Music,
  Settings (real theme + reduce-motion switches), Photos, and honest placeholder screens
  for the rest.
- **Light & dark appearances** — full token sets; switch in Settings → Appearance.

## Layout

```
src/
  App.jsx                  state machine (island activity, overlays, zoom rects)
  components/              one file per UI component
  data/apps.js             app registry, page layout, folders, demo content
  hooks/useLongPress.js    shared long-press gesture
  icons/                   inline SVG icon system (no bitmap assets)
  styles/                  base.css · home.css · island.css · overlays.css · apps.css
docs/
  DESIGN_SPEC.md           measurements, colour, type, glass recipe, motion
  INTERACTION_SPEC.md      every gesture and control behaviour
  HANDOFF_QWEN.md          native Android (Kotlin/Compose) implementation guide
```
