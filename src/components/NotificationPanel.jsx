import { useRef, useState } from 'react'
import AppIconArt from '../icons/AppIconArt.jsx'
import { APPS } from '../data/apps.js'

function NotificationCard({ n, onDismiss, onOpen }) {
  const [dx, setDx] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const drag = useRef(null)
  const app = APPS[n.appId]

  const dismiss = () => {
    setLeaving(true)
    setTimeout(onDismiss, 220)
  }

  return (
    <div
      className={`nc-card${leaving ? ' leaving' : ''}`}
      style={{
        transform: `translateX(${dx}px)`,
        opacity: Math.max(0.25, 1 - Math.abs(dx) / 180),
        transition: drag.current ? 'none' : 'transform .3s cubic-bezier(0.32,0.72,0,1), opacity .3s',
      }}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, id: e.pointerId }
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (drag.current && e.pointerId === drag.current.id) {
          setDx(Math.min(0, e.clientX - drag.current.x))
        }
      }}
      onPointerUp={(e) => {
        if (!drag.current || e.pointerId !== drag.current.id) return
        const moved = e.clientX - drag.current.x
        drag.current = null
        if (moved < -70) dismiss()
        else setDx(0)
      }}
      onPointerCancel={() => {
        drag.current = null
        setDx(0)
      }}
    >
      <AppIconArt app={app} size={38} />
      <div className="nc-card-body" onClick={() => onOpen(n.appId)}>
        <div className="nc-card-head">
          <span className="nc-card-app">{n.app}</span>
          <span className="nc-card-time">{n.time}</span>
        </div>
        <strong>{n.title}</strong>
        <p>{n.body}</p>
      </div>
      <button className="nc-card-x" aria-label="Dismiss notification" onClick={dismiss}>
        <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

export default function NotificationPanel({ closing, notifications, dateStr, onDismiss, onClearAll, onOpenApp, onClose }) {
  return (
    <div className={`nc-layer${closing ? ' closing' : ''}`}>
      <div className="nc-dim" onPointerDown={onClose} />
      <div className="nc-panel" onPointerDown={(e) => e.stopPropagation()}>
        <div className="nc-header">
          <div>
            <span className="nc-date-small">{dateStr}</span>
            <h1>Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <button className="nc-clear" onClick={onClearAll}>Clear All</button>
          )}
        </div>
        <div className="nc-stack">
          {notifications.length === 0 && (
            <div className="nc-empty">No Notifications</div>
          )}
          {notifications.map((n) => (
            <NotificationCard key={n.id} n={n} onDismiss={() => onDismiss(n.id)} onOpen={onOpenApp} />
          ))}
        </div>
      </div>
    </div>
  )
}
