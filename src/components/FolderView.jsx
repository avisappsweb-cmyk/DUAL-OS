import { useState } from 'react'
import AppIcon from './AppIcon.jsx'
import { FOLDERS } from '../data/apps.js'

export default function FolderView({ folderId, rect, onClose, onOpenApp }) {
  const folder = FOLDERS[folderId]
  const [closing, setClosing] = useState(false)

  if (!folder) return null

  const requestClose = () => {
    if (closing) return
    setClosing(true)
    setTimeout(onClose, 280)
  }

  const stage = rect.stage
  const originX = ((rect.left + rect.width / 2) / stage.width) * 100
  const originY = ((rect.top + rect.height / 2) / stage.height) * 100

  return (
    <div className={`folder-view${closing ? ' closing' : ''}`} onPointerDown={requestClose}>
      <div className="folder-backdrop" />
      <div
        className="folder-panel"
        style={{ transformOrigin: `${originX}% ${originY}%` }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <h2 className="folder-title">{folder.name}</h2>
        <div className="folder-grid">
          {folder.apps.map((id) => (
            <AppIcon key={id} appId={id} size={58} onOpen={(appId, el) => onOpenApp(appId, el)} />
          ))}
        </div>
      </div>
    </div>
  )
}
