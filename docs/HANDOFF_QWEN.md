# DUAL OS — iPhone Mode · Handoff Document for Qwen Code (Native Android)

Audience: the engineer/agent implementing iPhone Mode natively on Android.
Source of truth: this prototype at prototype version 0.1 (React 18 + Vite, plain CSS).
Companion docs: `docs/DESIGN_SPEC.md`, `docs/INTERACTION_SPEC.md`.

## 0. What this prototype is — and is not

- It is a **design-accurate, interactive UI prototype** running in a browser.
- It is **not** an Android app. No APK exists. Networking, sensors, telephony,
  notifications and media playback are simulated in UI state only.
- Every simulated surface is labelled as such in the UI (e.g. placeholder app screens,
  the "simulated weather data" footnote, the screen-mirroring tile).

## 1. Recommended native architecture

- **Language/UI:** Kotlin + Jetpack Compose (min SDK 26; blur requires API 31+ with
  `RenderEffect` — provide a fallback: opaque frosted colours on API < 31).
- **Module:** a `feature/iphonemode` module inside the DUAL OS app, launched into its own
  full-screen activity with a locked portrait orientation and its own task, so the user
  experiences an environment switch, not a theme.
- **State:** a single `IphoneModeViewModel` exposing `HomeUiState`
  (`pages: List<HomeItem>`, `page: Int`, `editMode`, `overlay: Overlay?`,
  `island: IslandState`, `theme`, `brightness`, `volume`, `toggles`, `player`, `timer`).
  The prototype's `App.jsx` is the reference for this state machine — copy its shape.
- **Layout:** fixed 393 × 852 dp design grid; use `BoxWithConstraints` and scale content
  for other densities rather than reflowing the grid.

## 2. Component map (prototype → native)

| Prototype component (src/components/) | Native equivalent |
|---|---|
| `PhoneFrame.jsx` | Not needed — the device is the phone. Remove bezel/lens decorations. |
| `Wallpaper.jsx` | `WallpaperView` — layered `Brush.radialGradient` + noise shader; parallax via `translateX(page * -10.dp)`; dim via `brightness()` modifier driven by the brightness state. |
| `StatusBar.jsx` | Custom composable, 54 dp tall. Time via a ticking `StateFlow`. Battery/cell/wifi are drawn (Canvas), not read from the real system — iPhone Mode presents its own indicators. |
| `DynamicIsland.jsx` | See §4. |
| `HomeScreen.jsx` | `HorizontalPager` (2 pages, no overscan) + custom drag `Modifier.pointerInput` for the rubber-band (0.35×) at edges. |
| `AppGrid` (inside HomeScreen) | Compose grid layout: 4 columns, 44 dp row unit, 12 dp row gap, 22 dp column gap, 26 dp side padding. |
| `AppIcon.jsx` | `AppIcon` composable + long-press via `combinedClickable`. Squircle via graphicsLayer clip path (§6). |
| `FolderCell.jsx` / `FolderView.jsx` | Closed tile = glass box with 3×3 preview. Open state = full-screen overlay with `Modifier.blur(36.dp)` backdrop (API 31+) and scale-from-origin enter transition. |
| `Widget.jsx` | Three widget composables: Weather (data from a repository), Clock (ticking analog Canvas), Calendar (real date + next event). |
| `Dock.jsx` | Glass container (28 dp blur, 34 dp radius) with 4 icon slots. |
| `ControlCenter.jsx` | See §5. |
| `NotificationPanel.jsx` | Overlay fed by a notification listener; cards support swipe-to-dismiss (`AnchoredDraggable`). |
| `SearchPanel.jsx` | Overlay with `FocusRequester` autofocus; filters the installed-apps registry. |
| `AppWindow.jsx` | App-open zoom: shared-element style transition — capture source icon bounds (`onGloballyPositioned`), animate a full-screen container from `translate+scale` to identity (380 ms, spring curve §3), content fade 220 ms delayed 100 ms. |
| `ContextMenu.jsx` | Popup anchored to the icon rect, glass styling, 210 dp wide. |

## 3. Motion specification (copy exactly)

| Motion | Spec |
|---|---|
| Spring curve | `cubic-bezier(0.32, 0.72, 0, 1)` ≈ Compose `spring(dampingRatio = 0.85f, stiffness = 380f)`; verify against the prototype by eye. |
| Page snap | 450 ms |
| Island expand/collapse | 500 ms size spring + 300 ms content crossfade |
| App zoom | 380 ms, content fade 220 ms @ 100 ms delay |
| Folder open | 340 ms scale 0.15 → 1 from tile origin; backdrop blur+fade 300 ms; close 260 ms |
| Icon press | scale 0.88, 180 ms |
| Jiggle | ±1.6° rotation, 320 ms alternate loop, per-item phase offset |
| CC entrance | scale 0.5 → 1 from top-right origin, 420 ms |
| Notifications entrance | translateY −100 % → 0, 450 ms |
| Search entrance | translateY 60 → 0 + fade, 400 ms |
| Reduce Motion | user setting clamps every duration to 150 ms |

## 4. Dynamic Island (native notes)

- Compact: 126 × 37 dp pill, 11 dp from top, centred; radius 20 dp. Expanded: 373 dp wide
  (10 dp side margins), radius 42 dp; heights per state: clock 168, music 196, timer 156,
  notification 132.
- Animate **size and radius together** with the spring; crossfade content (never translate it).
- State machine (priority order): `notification > timer > music > empty`.
  The prototype's `App.jsx` derives this in `islandActivity` — replicate.
- Native hooks: music state from `MediaSessionManager`/your player; timer from
  `AlarmManager`/`CountDownTimer`; notifications from `NotificationListenerService`
  (requires user grant) — until granted, show only DUAL OS-internal notifications.
- The pill must remain interactive: tap toggles expand; expanded music controls and
  timer pills are real buttons; notification body opens the source app.

## 5. Control Center (native notes)

- Entry: vertical drag ≥ 16 dp in the top-right 38 % of the screen. Implement as a
  transparent 56 dp-tall touch zone overlaying the status bar (left zone → notifications,
  right zone → CC).
- Grid: 4 columns, 78 dp row unit, 14 dp gap, 20 dp side padding, top padding 66 dp.
  Modules: connectivity 2×2 · rotation-lock 1×1 · focus 1×1 · mirroring 2×1 ·
  brightness 1×2 · volume 1×2 · now-playing 2×2 · four 1×1 shortcuts.
- Sliders: vertical drag-to-set with pointer capture; fill from bottom; brightness should
  write to the real `Settings.System.SCREEN_BRIGHTNESS` (with `WRITE_SETTINGS` grant) —
  a genuine native capability, not a simulation.
- Focus mode: map to Android Zen Mode (`NotificationManager.setInterruptionFilter`).
- Flashlight: `CameraManager.setTorchMode` — real hardware control.
- Screen mirroring tile: keep visually, mark as unavailable in v1 (do not fake it).

## 6. Assets & icon requirements

- **No bitmaps are required.** All art in the prototype is vector/CSS:
  - App icons: per-app two-stop gradient + 24-unit glyph path. Port `src/icons/Icons.jsx`
    (`APP_GLYPHS`) to `ImageVector`/PathData. Keep colours in one registry
    (`src/data/apps.js` is the model).
  - Corner shape: prototype uses 22.4 % radius; for a true iOS squircle use the standard
    superellipse path (n = 5) scaled to 60 dp — provide as a `Path` used with `clip`.
  - Wallpaper: recreate as gradient layers + optional noise shader; ship light/dark variants.
  - Camera lens dot: skip on real hardware.
- If product later wants real brand icons, they must be licensed; the prototype set is
  original artwork and safe to ship.

## 7. Things that REQUIRE native Android APIs (not possible in frontend)

1. Real Wi-Fi/cellular/bluetooth state and toggles (`WifiManager`, `ConnectivityManager`,
   `BluetoothAdapter`) — prototype state is local UI state.
2. Airplane mode (`Settings.Global.AIRPLANE_MODE_ON` — needs write permission).
3. Flashlight torch, brightness, volume (`AudioManager`), Do-Not-Disturb/Focus.
4. Battery level (`BatteryManager`) — prototype hard-codes 78 %.
5. Live notifications outside DUAL OS (`NotificationListenerService`).
6. Media session integration for the island's music activity.
7. Launching real installed apps via `PackageManager`/`launchIntentForPackage`
   — the prototype's app grid is a fixed registry.
8. Wallpaper service integration if iPhone Mode should replace the system wallpaper.
9. Blur on API < 31 (no `RenderEffect`) — use the documented frosted fallback.

## 8. Honest-simulation rules (carry into native build)

- Never present a control as functional unless it performs its real action.
- Any not-yet-native surface must be labelled (as the prototype does) or hidden.
- The prototype's "simulated" labels: placeholder app screens, weather data note,
  screen-mirroring tile, notification content.

## 9. Open items deferred to the Manus technical architecture

Per assignment instruction, the following decisions are intentionally deferred and must
not be made unilaterally in the native build: process/VM isolation strategy for the
"separate phone" feeling, profile/data separation, launcher integration depth,
gesture-navigation conflict handling with the host Android system, and persistence
format for home-screen layout. The prototype keeps layout in memory only.
