import { useEffect, useRef } from 'react'
import AppIconArt from '../icons/AppIconArt.jsx'
import { APPS } from '../data/apps.js'

export default function ContextMenu({ target, rect, onClose, onEditHome, onRemove }) {
  const ref = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!target) return null
  const isApp = target.type === 'app'
  const app = isApp ? APPS[target.id] : null
  const title = app ? app.name : target.type === 'folder' ? 'Folder' : 'Widget'

  const menuW = 210
  const below = rect.bottom + rect.height * 0 < 620
  const left = Math.min(Math.max(rect.left + rect.width / 2 - menuW / 2, 10), 393 - menuW - 10)
  const top = below ? rect.bottom + 8 : rect.top - rect.height - 116

  return (
    <div className="ctx-layer" onPointerDown={onClose}>
      <div
        ref={ref}
        className="ctx-menu"
        style={{ left, top }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="ctx-header">
          {app && <AppIconArt app={app} size={26} />}
          <span>{title}</span>
        </div>
        <button className="ctx-item" onClick={() => { onEditHome(); }}>
          <span>Edit Home Screen</span>
        </button>
        <button className="ctx-item ctx-item-danger" onClick={() => { onRemove(); onClose(); }}>
          <span>Remove {isApp ? 'App' : 'Item'}</span>
        </button>
      </div>
    </div>
  )
}
