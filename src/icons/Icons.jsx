const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const UI_ICONS = {
  wifi: (
    <g {...S}>
      <path d="M3.5 9.5a13 13 0 0 1 17 0" />
      <path d="M6.5 13a8.5 8.5 0 0 1 11 0" />
      <path d="M9.5 16.4a4.2 4.2 0 0 1 5 0" />
      <circle cx="12" cy="19.4" r="1.25" fill="currentColor" stroke="none" />
    </g>
  ),
  cell: (
    <g fill="currentColor" stroke="none">
      <rect x="3" y="15.5" width="3.4" height="4.5" rx="1" />
      <rect x="8.4" y="12.5" width="3.4" height="7.5" rx="1" />
      <rect x="13.8" y="9" width="3.4" height="11" rx="1" />
      <rect x="19.2" y="5.5" width="3.4" height="14.5" rx="1" opacity="0.35" />
    </g>
  ),
  battery: null, // rendered by StatusBar (dynamic level)
  flashlight: (
    <g {...S} fill="currentColor" strokeWidth="1.6">
      <path d="M9 3h6v3.2l-2 2.4V21h-2V8.6L9 6.2z" />
      <path d="M9 6.2h6" strokeWidth="1.2" />
    </g>
  ),
  timer: (
    <g {...S}>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 13.5V9.8" />
      <path d="M10 2.8h4" />
    </g>
  ),
  moon: (
    <path d="M20.2 14.2A8.6 8.6 0 1 1 9.8 3.8a7.2 7.2 0 0 0 10.4 10.4z" fill="currentColor" stroke="none" />
  ),
  airplane: (
    <path
      d="M10.6 9V4a1.4 1.4 0 0 1 2.8 0v5l7.1 4.2v1.9l-7.1-2.1v3.8l1.9 1.4v1.6L12 21.2l-3.3.6v-1.6l1.9-1.4v-3.8l-7.1 2.1v-1.9z"
      fill="currentColor"
      stroke="none"
    />
  ),
  bluetooth: (
    <path d="M6.5 7.7L17 16.3l-5 4.2V3.5l5 4.2L6.5 16.3" {...S} />
  ),
  sun: (
    <g {...S}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </g>
  ),
  volume: (
    <g>
      <path d="M4 9.2v5.6h3.6L13 19V5L7.6 9.2H4z" fill="currentColor" stroke="none" />
      <path d="M15.8 9.2a4.4 4.4 0 0 1 0 5.6M18.4 6.6a8 8 0 0 1 0 10.8" {...S} />
    </g>
  ),
  rotationLock: (
    <g {...S}>
      <path d="M19.4 13.2A7.5 7.5 0 1 1 17 6.4" />
      <path d="M17.6 3.2v3.4h-3.4" />
      <rect x="9.4" y="11.4" width="5.2" height="4.6" rx="1.1" fill="currentColor" stroke="none" />
      <path d="M10.6 11.4v-1.2a1.4 1.4 0 0 1 2.8 0v1.2" />
    </g>
  ),
  mirroring: (
    <g {...S}>
      <rect x="3" y="4.5" width="12.5" height="9.5" rx="2" />
      <rect x="8.5" y="10" width="12.5" height="9.5" rx="2" fill="var(--cc-tile, #2c2c2e)" />
      <rect x="8.5" y="10" width="12.5" height="9.5" rx="2" />
    </g>
  ),
  play: <path d="M8 5.4v13.2L19.2 12z" fill="currentColor" stroke="none" />,
  pause: (
    <g fill="currentColor" stroke="none">
      <rect x="6.6" y="5.2" width="3.8" height="13.6" rx="1.4" />
      <rect x="13.6" y="5.2" width="3.8" height="13.6" rx="1.4" />
    </g>
  ),
  backward: (
    <g fill="currentColor" stroke="none">
      <path d="M11.8 12L19.4 6.6v10.8z" />
      <path d="M4.2 12l7.6-5.4v10.8z" />
    </g>
  ),
  forward: (
    <g fill="currentColor" stroke="none">
      <path d="M12.2 12L4.6 6.6v10.8z" />
      <path d="M19.8 12l-7.6-5.4v10.8z" />
    </g>
  ),
  search: (
    <g {...S}>
      <circle cx="11" cy="11" r="6.3" />
      <path d="M15.6 15.6L20 20" />
    </g>
  ),
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" {...S} />,
  plus: <path d="M12 5.5v13M5.5 12h13" {...S} />,
  minus: <path d="M5.5 12h13" {...S} />,
  check: <path d="M4.5 12.5l5 5L19.5 6.5" {...S} />,
  chevronDown: <path d="M6 9.5l6 6 6-6" {...S} />,
  chevronUp: <path d="M6 14.5l6-6 6 6" {...S} />,
  chevronRight: <path d="M9.5 5.5l6 6.5-6 6.5" {...S} />,
  share: (
    <g {...S}>
      <path d="M12 3.2v11" />
      <path d="M8.2 6.6L12 3l3.8 3.6" />
      <path d="M8 10.2H6.6A1.8 1.8 0 0 0 4.8 12v7.2A1.8 1.8 0 0 0 6.6 21h10.8a1.8 1.8 0 0 0 1.8-1.8V12a1.8 1.8 0 0 0-1.8-1.8H16" />
    </g>
  ),
  mic: (
    <g {...S}>
      <rect x="9.3" y="2.8" width="5.4" height="10.4" rx="2.7" />
      <path d="M6.2 11.6a5.8 5.8 0 0 0 11.6 0" />
      <path d="M12 17.4v3M8.8 20.4h6.4" />
    </g>
  ),
  lowPower: (
    <path d="M13.2 2L5 13.4h5.1L10.8 22 19 10.6h-5.1z" fill="currentColor" stroke="none" />
  ),
  ellipsis: (
    <g fill="currentColor" stroke="none">
      <circle cx="5.5" cy="12" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="18.5" cy="12" r="1.7" />
    </g>
  ),
  stopwatch: (
    <g {...S}>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 13.5l3.4-3.4M10 2.8h4M18.5 6l1.4 1.4" />
    </g>
  ),
  cloud: <path d="M8.5 18.5h8a3.4 3.4 0 0 0 .5-6.8 5.2 5.2 0 0 0-10-1.2 3.7 3.7 0 0 0 1.5 8z" fill="currentColor" stroke="none" />,
  cloudsun: (
    <g>
      <circle cx="15.5" cy="7.5" r="3" fill="currentColor" stroke="none" />
      <path d="M7 19h8.6a3.2 3.2 0 0 0 .5-6.4 4.9 4.9 0 0 0-9.4-1.1A3.5 3.5 0 0 0 7 19z" fill="currentColor" stroke="none" />
    </g>
  ),
}

export const APP_GLYPHS = {
  phone: (
    <path
      d="M6.4 10.6a14.6 14.6 0 0 0 6.9 6.9l2.3-2.3a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.4.57a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A17.9 17.9 0 0 1 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.3.57 3.4a1 1 0 0 1-.25 1z"
      fill="#fff"
      stroke="none"
    />
  ),
  safari: (
    <g>
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="#1f7cf1" strokeWidth="1.6" />
      <path d="M15.9 8.1l-2.6 5.2-5.2 2.6 2.6-5.2z" fill="#ff3b30" />
      <path d="M15.9 8.1l-2.6 5.2-2.6-2.6z" fill="#d8dde6" />
    </g>
  ),
  messages: (
    <path
      d="M12 3.2c5.3 0 9.6 3.5 9.6 7.8s-4.3 7.8-9.6 7.8c-1 0-1.9-.1-2.8-.3L4.6 20.6l1-3.3c-2-1.4-3.2-3.5-3.2-6.3 0-4.3 4.3-7.8 9.6-7.8z"
      fill="#fff"
      stroke="none"
    />
  ),
  music: (
    <g stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none">
      <path d="M9.4 17.6V6.6l9.2-2v10.6" />
      <circle cx="7" cy="17.7" r="2.5" fill="#fff" stroke="none" />
      <circle cx="16.2" cy="15.3" r="2.5" fill="#fff" stroke="none" />
    </g>
  ),
  photos: null, // rendered specially
  camera: (
    <g fill="#fff" stroke="none">
      <path d="M8.3 6.2l1.3-2h4.8l1.3 2h3.5A1.8 1.8 0 0 1 21 8v11a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 19V8a1.8 1.8 0 0 1 1.8-1.8z" />
      <circle cx="12" cy="13.4" r="4" fill="#5b5b60" />
      <circle cx="12" cy="13.4" r="2.4" fill="#fff" opacity="0.35" />
    </g>
  ),
  weather: (
    <g fill="#fff" stroke="none">
      <circle cx="9.4" cy="9" r="3.6" />
      <path d="M9.4 18.8h8.4a3.3 3.3 0 0 0 .5-6.6 5 5 0 0 0-9.6-1.2 3.5 3.5 0 0 0 .7 7.8z" />
    </g>
  ),
  clock: (
    <g>
      <circle cx="12" cy="12" r="9.2" fill="#fff" stroke="none" />
      <path d="M12 12V6.4M12 12l3.8 2.6" stroke="#000" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="12" r="1" fill="#ff9f0a" />
    </g>
  ),
  calendar: null, // rendered specially
  notes: (
    <g stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none">
      <path d="M8 8.6h8M8 12.4h8M8 16.2h4.6" />
    </g>
  ),
  settings: (
    <g fill="#8a8d94" stroke="none">
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="11" y="2.2" width="2" height="4.4" rx="1" transform={`rotate(${i * 45} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="5.4" />
      <circle cx="12" cy="12" r="2.6" fill="#dfe0e5" />
    </g>
  ),
  appstore: (
    <g stroke="#fff" strokeWidth="1.9" strokeLinecap="round" fill="none">
      <path d="M7.2 16.8L12 7.6l4.8 9.2" />
      <path d="M8.8 13.6h6.4" />
      <path d="M5.6 16.8h1.6M16.8 16.8h1.6" />
    </g>
  ),
  maps: (
    <g>
      <path
        d="M12 21.4s-6.8-5.5-6.8-10.4a6.8 6.8 0 1 1 13.6 0c0 4.9-6.8 10.4-6.8 10.4z"
        fill="#fff"
        stroke="none"
      />
      <circle cx="12" cy="10.6" r="2.4" fill="#4fc0f2" />
    </g>
  ),
  health: (
    <path
      d="M12 20.2s-7.2-4.7-7.2-9.8A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.2 3c0 5.1-7.2 9.8-7.2 9.8z"
      fill="#ff2d55"
      stroke="none"
    />
  ),
  wallet: (
    <g stroke="none">
      <rect x="4" y="4.6" width="16" height="5" rx="1.8" fill="#ff453a" opacity="0.92" />
      <rect x="4" y="7.6" width="16" height="5" rx="1.8" fill="#ffd60a" opacity="0.92" />
      <rect x="4" y="10.6" width="16" height="8.8" rx="2" fill="#f4f4f6" />
    </g>
  ),
  calculator: (
    <g fill="#fff" stroke="none">
      <rect x="5.4" y="3.4" width="13.2" height="17.2" rx="2.4" fill="none" stroke="#fff" strokeWidth="1.7" />
      <rect x="7.8" y="5.8" width="8.4" height="3.4" rx="1" />
      <circle cx="8.9" cy="12.4" r="1.15" />
      <circle cx="12" cy="12.4" r="1.15" />
      <circle cx="15.1" cy="12.4" r="1.15" />
      <circle cx="8.9" cy="16.2" r="1.15" />
      <circle cx="12" cy="16.2" r="1.15" />
      <circle cx="15.1" cy="16.2" r="1.15" />
    </g>
  ),
  files: (
    <path
      d="M3 7a2 2 0 0 1 2-2h4.2l2 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      fill="#fff"
      stroke="none"
    />
  ),
  podcasts: (
    <g fill="#fff" stroke="none">
      <circle cx="12" cy="8.2" r="2.5" />
      <path d="M12 12c-1.7 0-2.8 1-2.6 2.4l.7 4.6c.1.9.9 1.5 1.9 1.5s1.8-.6 1.9-1.5l.7-4.6C14.8 13 13.7 12 12 12z" />
      <path d="M6.4 12.6a6.4 6.4 0 1 1 11.2 0" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
    </g>
  ),
  fitness: (
    <g fill="none" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="8.4" stroke="#fa114f" />
      <circle cx="12" cy="12" r="5.8" stroke="#a8f605" />
      <circle cx="12" cy="12" r="3.2" stroke="#00e5ff" />
    </g>
  ),
  mail: (
    <g>
      <rect x="3" y="5.4" width="18" height="13.2" rx="2.4" fill="#fff" stroke="none" />
      <path d="M4.4 7.2L12 13l7.6-5.8" fill="none" stroke="#0a6cf5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  reminders: (
    <g>
      <circle cx="6" cy="7.4" r="1.5" fill="#ff3b30" />
      <circle cx="6" cy="12" r="1.5" fill="#ff9f0a" />
      <circle cx="6" cy="16.6" r="1.5" fill="#30d158" />
      <path d="M10 7.4h8M10 12h8M10 16.6h5.4" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  ),
  stocks: (
    <g fill="none" stroke="#30d158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16.6l4.4-5 3.2 3 5-6.6 3.4 3.4" />
    </g>
  ),
  homeapp: (
    <g stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M4 11.4L12 4.2l8 7.2" />
      <path d="M6.2 10v9.4h11.6V10" />
      <path d="M10 19.4v-5h4v5" fill="#fff" stroke="none" />
    </g>
  ),
  books: (
    <g>
      <path
        d="M12 6.2C10 4.8 7.5 4.2 5 4.2v13.6c2.5 0 5 .6 7 2 2-1.4 4.5-2 7-2V4.2c-2.5 0-5 .6-7 2z"
        fill="#fff"
        stroke="none"
      />
      <path d="M12 6.2v13.6" stroke="#ff8c00" strokeWidth="1.4" fill="none" />
    </g>
  ),
}

export function UiIcon({ name, size = 22, className, style }) {
  const glyph = UI_ICONS[name]
  if (!glyph) return null
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
      {glyph}
    </svg>
  )
}

export function AppGlyph({ name, size = 32, className, style }) {
  const glyph = APP_GLYPHS[name]
  if (!glyph) return null
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
      {glyph}
    </svg>
  )
}
