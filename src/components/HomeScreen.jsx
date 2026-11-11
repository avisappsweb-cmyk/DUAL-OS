import { useRef, useState } from 'react'
import AppIcon from './AppIcon.jsx'
import FolderCell from './FolderCell.jsx'
import Widget from './Widget.jsx'
import Dock from './Dock.jsx'

export default function HomeScreen({
  pages,
  page,
  setPage,
  onOpenApp,
  onOpenFolder,
  onLongPressItem,
  onRemoveItem,
  editMode,
  onExitEdit,
  onEnterEdit,
  onOpenSearch,
  dockApps,
  onOpenDockApp,
}) {
  const viewportRef = useRef(null)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const gesture = useRef(null)
  const bgPress = useRef(null)

  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    gesture.current = { x: e.clientX, y: e.clientY, axis: null, searchOpened: false }
    if ((e.target === e.currentTarget || e.target.classList.contains('hs-grid')) && !editMode) {
      bgPress.current = setTimeout(onEnterEdit, 550)
    }
  }

  const cancelBgPress = () => {
    if (bgPress.current) {
      clearTimeout(bgPress.current)
      bgPress.current = null
    }
  }

  const onPointerMove = (e) => {
    const g = gesture.current
    if (!g) return
    const dx = e.clientX - g.x
    const dy = e.clientY - g.y
    if (Math.hypot(dx, dy) > 10) cancelBgPress()
    if (g.searchOpened) return
    if (!g.axis) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        g.axis = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v'
      }
    }
    if (g.axis === 'h') {
      if (!dragging) setDragging(true)
      let next = dx
      const atFirst = page === 0 && dx > 0
      const atLast = page === pages.length - 1 && dx < 0
      if (atFirst || atLast) next = dx * 0.35
      setDragX(next)
    } else if (g.axis === 'v' && dy > 52) {
      g.searchOpened = true
      onOpenSearch()
    }
  }

  const onPointerUp = (e) => {
    cancelBgPress()
    const g = gesture.current
    gesture.current = null
    if (g && g.axis === 'h') {
      const dx = e.clientX - g.x
      const w = viewportRef.current?.getBoundingClientRect().width || 393
      if (dx < -w * 0.22 && page < pages.length - 1) setPage(page + 1)
      else if (dx > w * 0.22 && page > 0) setPage(page - 1)
    }
    setDragging(false)
    setDragX(0)
  }

  return (
    <div className={`home-screen${editMode ? ' editing' : ''}`}>
      <div
        ref={viewportRef}
        className="hs-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="hs-track"
          style={{
            transform: `translateX(calc(${page * -100}% + ${dragX}px))`,
            transition: dragging ? 'none' : undefined,
          }}
        >
          {pages.map((pageData, pi) => (
            <section className="hs-page" key={pi}>
              <div className="hs-grid">
                {pageData.items.map((item, ii) => {
                  const key = `${item.type}-${item.id}`
                  if (item.type === 'widget') {
                    return (
                      <Widget
                        key={key}
                        id={item.id}
                        onOpen={onOpenApp}
                        editMode={editMode}
                        onRemove={() => onRemoveItem(pi, ii)}
                        onLongPress={(el) => onLongPressItem({ type: 'widget', id: item.id }, pi, ii, el)}
                      />
                    )
                  }
                  if (item.type === 'folder') {
                    return (
                      <FolderCell
                        key={key}
                        folderId={item.id}
                        onOpen={onOpenFolder}
                        editMode={editMode}
                        onRemove={() => onRemoveItem(pi, ii)}
                        onLongPress={(el) => onLongPressItem({ type: 'folder', id: item.id }, pi, ii, el)}
                      />
                    )
                  }
                  return (
                    <AppIcon
                      key={key}
                      appId={item.id}
                      onOpen={onOpenApp}
                      onLongPress={(el) => onLongPressItem({ type: 'app', id: item.id }, pi, ii, el)}
                      editMode={editMode}
                      onRemove={() => onRemoveItem(pi, ii)}
                    />
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="hs-bottom">
        {editMode ? (
          <button className="hs-done-pill" onClick={onExitEdit}>Done</button>
        ) : (
          <>
            <div className="hs-dots" role="tablist" aria-label="Home screen pages">
              {pages.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === page}
                  aria-label={`Page ${i + 1}`}
                  className={`hs-dot${i === page ? ' active' : ''}`}
                  onClick={() => setPage(i)}
                />
              ))}
            </div>
            <button className="hs-search-pill" onClick={onOpenSearch}>
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                <circle cx="11" cy="11" r="6.3" fill="none" stroke="currentColor" strokeWidth="2.2" />
                <path d="M15.6 15.6L20 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <span>Search</span>
            </button>
          </>
        )}
        <Dock apps={dockApps} onOpenApp={onOpenDockApp} editMode={editMode} />
      </div>
    </div>
  )
}
