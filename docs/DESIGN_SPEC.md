# DUAL OS — iPhone Mode · Visual Design Specification

Prototype version 0.1. All measurements are in logical points on a 393 × 852 stage
(same logical size as iPhone 14 Pro / 15 Pro). Native implementation maps 1 pt → 1 dp.

## 1. Screen & layout grid

| Token | Value |
|---|---|
| Stage size | 393 × 852 pt |
| Corner radius (screen) | 47 pt |
| Status bar height | 54 pt |
| Grid columns | 4 |
| Grid row unit | 44 pt, vertical gap 12 pt |
| Grid side padding | 26 pt |
| Horizontal column gap | 22 pt |
| App icon size | 60 × 60 pt, corner radius 22.4 % (≈ 13.5 pt) |
| App label | 11 pt / medium, 6 pt below icon |
| Widget small | 2 × 2 columns (≈ 159 × 156 pt), radius 24 pt |
| Widget medium | 4 × 2 columns (full width, 156 pt tall), radius 24 pt |
| Dock | full width − 28 pt margins, 92 pt tall, radius 34 pt |
| Home indicator | 140 × 5 pt, 8 pt from bottom |

## 2. Typography

Single family: SF Pro (iOS). Native Android handoff: use Roboto with SF-like weights,
or bundle a licensed SF alternative. All sizes below are pt.

| Use | Size / weight | Notes |
|---|---|---|
| Status bar time | 15 / 600 | tabular numerals |
| App label | 11 / 500 | white, shadow 0 1 4 rgba(0,0,0,.55) |
| Widget city | 16 / 600 | |
| Widget temperature | 44 / 300 | tight tracking −2 % |
| Widget hour labels | 11 / 600 | 65 % opacity |
| Folder title | 26 / 700 | |
| Island clock | 36 / 700 | tabular numerals |
| Island track title | 16 / 600 | |
| Island secondary | 13 / 400 | 60 % opacity |
| CC tile labels | 13 / 500 | |
| App large title (Settings/Photos) | 30 / 700 | −2 % tracking |
| Weather hero temp | 88 / 200 | |

## 3. Colour system

Two complete appearances (dark default, light). Define both as theme token sets;
never hard-code colours in components.

### Dark theme (default)

| Token | Value |
|---|---|
| text | #FFFFFF |
| text-dim | rgba(235,235,245,0.62) |
| glass-bg (panels, dock, search pill) | rgba(30,30,36,0.55) |
| glass-bg-strong (context menus, notification cards) | rgba(44,44,50,0.78) |
| glass-border | rgba(255,255,255,0.10) |
| widget-bg | rgba(22,22,26,0.62) |
| accent | #0A84FF |
| page dot | rgba(255,255,255,0.32) / active 0.95 |

### Light theme

| Token | Value |
|---|---|
| text | #000000 |
| glass-bg | rgba(255,255,255,0.58) |
| glass-bg-strong | rgba(250,250,252,0.82) |
| glass-border | rgba(255,255,255,0.50) |
| widget-bg | rgba(255,255,255,0.72) |
| accent | #007AFF |

### Semantic / control colours

| Use | Value |
|---|---|
| Wi-Fi / Bluetooth active | #0A84FF |
| Cellular active | #30D158 |
| Airplane mode active | #FF9F0A |
| Focus active | #5E5CE6 |
| Timer accent | #FF9F0A |
| Flashlight active | #F2F2F7 tile, dark icon |
| Destructive | #FF453A |
| Music accent | #FA233B |
| Battery low-power | #FFD60A |

## 4. Liquid Glass recipe

Every glass surface uses the same four layers (order matters):

1. **Fill** — theme `glass-bg` (translucent, desaturated).
2. **Backdrop blur** — 22–36 px + `saturate(1.6–1.8)`. Blur radii: search pill 22, dock 28,
   widgets 26, CC tiles 30, context menu 30, folder backdrop 36. Do not exceed 36.
3. **Hairline border** — 1 px `glass-border`.
4. **Top highlight** — inner shadow `inset 0 1px 0 rgba(255,255,255,0.12)` (dark) /
   `0.65` (light) to simulate the light-catching edge.

App icons add a drop shadow `0 4 12 rgba(0,0,0,0.28)` plus the same top highlight.

## 5. Wallpaper

Original DUAL OS art (no licensed assets): three soft radial aurora fields
(plum top-right, deep blue left, magenta bottom) over a near-black vertical gradient,
plus 5 % fractal-noise grain to prevent banding. Light variant uses peach/sky/rose on
porcelain. Wallpaper dims with the brightness slider (0.55–1.0 multiplier) and shifts
10 px per page for parallax.

## 6. Iconography

- All app icons and system glyphs are inline SVG (24 × 24 viewBox) — zero bitmap assets.
- App icons: vertical 165° gradient fills (two stops per app, defined in `src/data/apps.js`).
- UI glyphs: 1.8 px rounded strokes, `currentColor`, so they inherit theme colour.
- Icon corner shape: 22.4 % border radius (iOS squircle approximation). Native handoff
  should use a true superellipse path (see handoff doc §6).

## 7. Motion language

| Property | Value |
|---|---|
| Spring curve (expansive motion: island, panels, page snap, app zoom) | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Standard ease (fades, small transforms) | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Icon press | scale 0.88, 180 ms |
| Page snap | 450 ms spring |
| Island expand/collapse | 500 ms spring, content crossfade 300 ms |
| App open/close zoom | 380 ms spring, content fade 220 ms delayed 100 ms |
| Panel entrances | 400–450 ms spring |
| Jiggle | 320 ms alternate loop, ± 1.6° rotation, per-icon phase offset |
| Reduce Motion setting | clamps all durations to 150 ms |
