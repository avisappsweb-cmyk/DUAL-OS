import AppIconArt from '../icons/AppIconArt.jsx'
import { APPS } from '../data/apps.js'
import useLongPress from '../hooks/useLongPress.js'

export default function AppIcon({ appId, onOpen, onLongPress, editMode, onRemove, size = 60, label = true }) {
  const app = APPS[appId]
  const press = useLongPress((el) => onLongPress(el))

  if (!app) return null

  const handleClick = (e) => {
    if (press.didFire() || editMode) return
    onOpen(appId, e.currentTarget)
  }

  return (
    <div className="app-cell">
      <div
        className="app-icon-wrap"
        style={{ '--jiggle-delay': `${(appId.length * 37) % 200}ms` }}
        {...press.handlers}
        onClick={handleClick}
      >
        <AppIconArt app={app} size={size} />
        {editMode && (
          <button
            className="app-remove"
            aria-label={`Remove ${app.name}`}
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
          >
            <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <span className="app-label">{app.name}</span>
    </div>
  )
}
