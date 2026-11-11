import { AppGlyph } from './Icons.jsx'

function CalendarFace({ size }) {
  const now = new Date()
  const weekday = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
  return (
    <div className="cal-face" style={{ fontSize: size * 0.19 }}>
      <span className="cal-face-dow">{weekday}</span>
      <span className="cal-face-day" style={{ fontSize: size * 0.5 }}>{now.getDate()}</span>
    </div>
  )
}

function PhotosFlower({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="12"
          cy="6.4"
          rx="2.5"
          ry="4.6"
          fill={`hsl(${i * 45} 85% 58%)`}
          opacity="0.82"
          transform={`rotate(${i * 45} 12 12)`}
        />
      ))}
    </svg>
  )
}

export default function AppIconArt({ app, size = 60 }) {
  return (
    <div
      className="app-icon-art"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.224,
        background: `linear-gradient(165deg, ${app.bg[0]}, ${app.bg[1]})`,
      }}
    >
      {app.id === 'calendar' ? (
        <CalendarFace size={size} />
      ) : app.id === 'photos' ? (
        <PhotosFlower size={size * 0.62} />
      ) : (
        <AppGlyph name={app.glyph} size={size * 0.56} />
      )}
    </div>
  )
}
