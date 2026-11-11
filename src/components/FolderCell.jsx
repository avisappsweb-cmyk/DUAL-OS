import AppIconArt from '../icons/AppIconArt.jsx'
import { APPS, FOLDERS } from '../data/apps.js'
import useLongPress from '../hooks/useLongPress.js'

export default function FolderCell({ folderId, onOpen, editMode, onRemove, onLongPress }) {
  const folder = FOLDERS[folderId]
  const press = useLongPress((el) => onLongPress(el))
  if (!folder) return null

  const preview = folder.apps.slice(0, 9)

  return (
    <div className="app-cell">
      <div className="app-icon-wrap" {...press.handlers} onClick={(e) => !editMode && onOpen(folderId, e.currentTarget)}>
        <div className="folder-tile">
          <div className="folder-tile-grid">
            {preview.map((id) => (
              <AppIconArt key={id} app={APPS[id]} size={19} />
            ))}
          </div>
        </div>
        {editMode && (
          <button
            className="app-remove"
            aria-label={`Remove ${folder.name}`}
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
      <span className="app-label">{folder.name}</span>
    </div>
  )
}
