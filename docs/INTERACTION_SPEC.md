# DUAL OS — iPhone Mode · Interaction & Behaviour Specification

Every interactive element in the prototype and its defined behaviour. Nothing visible is inert.

## 1. Home screen

| Gesture / target | Behaviour |
|---|---|
| Horizontal drag anywhere on the grid | Pages track the finger 1:1; past the first/last page the track rubber-bands at 0.35×. On release, page snaps if drag ≥ 22 % of width, else springs back. 450 ms spring. |
| Tap page dot | Jumps directly to that page (dots are real buttons with `role="tab"`). |
| Drag down (≥ 52 pt, vertical-dominant) from the middle of the grid | Opens the Search panel. Fires once per gesture. |
| Long-press (550 ms) on empty grid area | Enters edit (jiggle) mode. |
| Tap Search pill | Opens the Search panel. |
| Tap app icon (home, folder, dock, search) | Opens the app with a zoom morph from the tapped icon's exact rect (see §6). |
| Long-press app icon / folder / widget (450 ms, cancels on 10 px move) | Opens context menu anchored to the item. |
| Long-press dock icon | Also opens the app (dock has no context menu in v0.1). |

## 2. Edit (jiggle) mode

- Enter: long-press empty area, or "Edit Home Screen" in any context menu.
- All icons, folders and widgets jiggle with per-item phase offsets; labels stay static.
- Every item grows a minus badge; tapping it removes the item from the page layout
  (in-memory state; layout persists for the session).
- Page dots and Search pill hide; a blue **Done** pill appears. Done exits edit mode.
- Home-indicator tap or Escape also exits.
- Out of scope for the prototype (native-only): cross-page drag-reorder, widget gallery.

## 3. Folders

- Closed folder: 60 pt glass tile with a 3 × 3 preview of contained icons.
- Tap: full-screen open — backdrop blurs (36 px) and fades in while the folder panel
  scales from the folder tile's centre (`transform-origin` computed from the tapped rect),
  340 ms spring. Folder name renders above a 3-column icon grid with labels.
- Tap an app inside: folder closes instantly and the app zooms open from the tapped icon.
- Tap blurred backdrop: close — panel scales back to the origin and fades, 260 ms.

## 4. Widgets

| Widget | Size | Interaction |
|---|---|---|
| Weather (medium) | 4 × 2 | Tap opens the Weather app. Live hourly forecast row. |
| Clock (small) | 2 × 2 | Analog face ticks in real time (second hand). Tap opens Clock. |
| Calendar (small) | 2 × 2 | Real date + next event. Tap opens Calendar. |

All widgets support long-press → context menu and minus-badge removal in edit mode.

## 5. Dynamic Island

Priority of compact states: incoming notification → timer → music → empty.

| State | Compact appearance | Expanded appearance |
|---|---|---|
| Empty | 126 × 37 black pill | 373 × 168 card: large live clock, date, DUAL OS wordmark |
| Music | 20 pt artwork chip + 4-bar animated equaliser | 373 × 196: artwork, title/artist, progress bar with elapsed/remaining, prev / play-pause / next |
| Timer | Orange timer glyph + mono countdown | 373 × 156: conic progress ring, large countdown, Pause-Resume and Stop pills |
| Notification | App icon chip + equaliser | 373 × 132: 38 pt app icon, sender + message preview, blue "Open" |

Behaviours:

- Tap pill: toggles compact ⇄ expanded (500 ms spring; content crossfades 300 ms).
- Timer tile in Control Center: tap starts a 5:00 countdown (tap again pauses/resumes);
  long-press cancels. Timer drives the island live activity automatically.
- Play in the Music app (or CC now-playing) drives the music activity; pausing returns
  the island to empty compact.
- A simulated Messages notification arrives 8 s after launch, auto-expands the island,
  and auto-collapses after 6 s. Tapping it opens Messages.
- The camera lens dot sits left of the pill as part of the device chrome (decorative).

## 6. App open/close zoom

- On tap, the source icon's rect is captured (stage coordinates, scale-corrected).
- The app window renders full-screen, transformed to `translate(cx−196.5, cy−426)
  scale(iconW/393, iconH/852)` with 160 px radius (≈ 13 pt visual at icon scale), then
  animates to identity over 380 ms spring while content fades in (220 ms, 100 ms delay).
- Close reverses the same transform (home indicator, Escape, or in-app back).
- Apps with real screens: Weather, Music (wired to island + CC), Settings (theme +
  reduce-motion toggles actually change the system), Photos (placeholder grid).
  All other apps show an honest "simulated in prototype" placeholder screen.

## 7. Control Center

- Open: drag down ≥ 16 pt in the **top-right 38 %** of the screen. Panel scales up from
  the top-right corner (420 ms spring) over a blurred dim.
- Close: tap the dimmed backdrop.
- Connectivity module (2 × 2): airplane / cellular / Wi-Fi / Bluetooth round toggles —
  each flips state and tints (orange / green / blue / blue). Status bar reflects
  airplane, cellular and Wi-Fi immediately.
- Rotation lock: toggles red accent. Focus: toggles purple fill.
- Screen mirroring: labelled tile, simulated (no-op by design, labelled as such).
- Brightness slider: vertical, drag anywhere; live value drives wallpaper dimming.
- Volume slider: vertical drag; value is shared with the Music app's volume slider.
- Now playing (2 × 2): track metadata + play/pause, wired to the shared player state.
- Flashlight: toggles white tile state. Timer: see §5. Calculator / Camera tiles open
  their prototype app windows.

## 8. Notification Center

- Open: drag down ≥ 16 pt in the **top-left 38 %** of the screen. Panel slides down
  (450 ms spring) over a blurred dim.
- Cards: app icon, app name + relative time, title, 2-line body.
- Swipe a card left ≥ 70 pt: dismisses (flies out, 220 ms). Hover reveals an X button.
- Tap a card: opens the source app.
- Clear All empties the stack; empty state reads "No Notifications".

## 9. Search panel

- Open: Search pill or drag-down gesture. Slides up with a heavy blur backdrop.
- Field autofocuses; typing filters the full app registry live.
- Empty query shows "Siri Suggestions" (8 apps). No results shows an explicit empty state.
- Tap result: opens the app. Cancel button or backdrop tap closes.

## 10. Global

| Control | Behaviour |
|---|---|
| Home indicator tap | Closes the topmost layer, in order: context menu → overlay → app → folder → edit mode → expanded island. |
| Escape key | Same priority chain (desktop convenience). |
| Status bar | Passive display; time is live. Reflects airplane/cellular/Wi-Fi/low-power states. |
