import { APPS } from '../data/apps.js'
import AppIconArt from '../icons/AppIconArt.jsx'
import useLongPress from '../hooks/useLongPress.js'

export default function Dock({ apps, onOpenApp, editMode }) {
  return (
    <div className={`dock${editMode ? ' dock-editing' : ''}`}>
      {apps.map((id) => (
        <DockIcon key={id} appId={id} onOpen={onOpenApp} />
      ))}
    </div>
  )
}

function DockIcon({ appId, onOpen }) {
  const app = APPS[appId]
  const press = useLongPress((el) => onOpen(appId, el))
  if (!app) return null
  return (
    <button
      className="dock-icon"
      aria-label={app.name}
      {...press.handlers}
      onClick={(e) => {
        if (!press.didFire()) onOpen(appId, e.currentTarget)
      }}
    >
      <AppIconArt app={app} size={60} />
    </button>
  )
}
