import { useMemo, useState } from 'react'
import AppIcon from './AppIcon.jsx'
import { APPS } from '../data/apps.js'

const SUGGESTED = ['weather', 'music', 'settings', 'photos', 'notes', 'maps', 'clock', 'podcasts']

export default function SearchPanel({ closing, onOpenApp, onClose }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    return Object.values(APPS).filter((a) => a.name.toLowerCase().includes(q))
  }, [query])

  return (
    <div className={`sp-layer${closing ? ' closing' : ''}`}>
      <div className="sp-dim" onPointerDown={onClose} />
      <div className="sp-panel" onPointerDown={(e) => e.stopPropagation()}>
        <div className="sp-field-row">
          <div className="sp-field">
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <circle cx="11" cy="11" r="6.3" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M15.6 15.6L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              autoFocus
              type="text"
              placeholder="Apps, actions and settings"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
          </div>
          <button className="sp-cancel" onClick={onClose}>Cancel</button>
        </div>

        <div className="sp-body">
          {results === null ? (
            <>
              <h3 className="sp-section-title">Siri Suggestions</h3>
              <div className="sp-grid">
                {SUGGESTED.map((id) => (
                  <AppIcon key={id} appId={id} onOpen={onOpenApp} />
                ))}
              </div>
            </>
          ) : results.length > 0 ? (
            <div className="sp-grid">
              {results.map((a) => (
                <AppIcon key={a.id} appId={a.id} onOpen={onOpenApp} />
              ))}
            </div>
          ) : (
            <div className="sp-empty">No results for “{query}”</div>
          )}
        </div>
      </div>
    </div>
  )
}
