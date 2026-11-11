import { useCallback, useEffect, useRef, useState } from 'react'
import { INITIAL_PAGES, DOCK, NOTIFICATIONS, ISLAND_PING, PLAYLIST } from './data/apps.js'
import PhoneFrame from './components/PhoneFrame.jsx'
import Wallpaper from './components/Wallpaper.jsx'
import StatusBar from './components/StatusBar.jsx'
import DynamicIsland from './components/DynamicIsland.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import FolderView from './components/FolderView.jsx'
import ContextMenu from './components/ContextMenu.jsx'
import ControlCenter from './components/ControlCenter.jsx'
import NotificationPanel from './components/NotificationPanel.jsx'
import SearchPanel from './components/SearchPanel.jsx'
import AppWindow from './components/AppWindow.jsx'

const STAGE_W = 393
const STAGE_H = 852

function TopZones({ onNotifications, onControl }) {
  const attach = (fire) => ({
    onPointerDown: (e) => {
      e.currentTarget._g = { y: e.clientY, fired: false }
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    onPointerMove: (e) => {
      const g = e.currentTarget._g
      if (g && !g.fired && e.clientY - g.y > 16) {
        g.fired = true
        fire()
      }
    },
  })

  return (
    <>
      <div className="top-zone top-zone-left" {...attach(onNotifications)} aria-hidden="true" />
      <div className="top-zone top-zone-right" {...attach(onControl)} aria-hidden="true" />
    </>
  )
}

export default function App() {
  const screenRef = useRef(null)

  const [pages, setPages] = useState(INITIAL_PAGES)
  const [page, setPage] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [overlay, setOverlay] = useState(null) // 'control' | 'notifications' | 'search'
  const [overlayClosing, setOverlayClosing] = useState(false)
  const [activeApp, setActiveApp] = useState(null)
  const [appClosing, setAppClosing] = useState(false)
  const [activeFolder, setActiveFolder] = useState(null)
  const [menu, setMenu] = useState(null)

  const [theme, setTheme] = useState('dark')
  const [reduceMotion, setReduceMotion] = useState(false)
  const [brightness, setBrightness] = useState(72)
  const [volume, setVolume] = useState(45)
  const [toggles, setToggles] = useState({
    airplane: false, cellular: true, wifi: true, bluetooth: true,
    flashlight: false, focus: false, rotationLock: false, lowPower: false,
  })

  const [trackIndex, setTrackIndex] = useState(0)
  const [nowPlaying, setNowPlaying] = useState({ playing: false, elapsed: 47 })
  const [timer, setTimer] = useState(null)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [islandPing, setIslandPing] = useState(null)
  const [islandExpanded, setIslandExpanded] = useState(false)
  const [now, setNow] = useState(() => new Date())

  const track = PLAYLIST[trackIndex]

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!nowPlaying.playing) return
    const id = setInterval(() => {
      setNowPlaying((np) => {
        if (!np.playing) return np
        const next = np.elapsed + 1
        if (next >= track.duration) {
          setTrackIndex((i) => (i + 1) % PLAYLIST.length)
          return { ...np, elapsed: 0 }
        }
        return { ...np, elapsed: next }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [nowPlaying.playing, track.duration])

  useEffect(() => {
    if (!timer?.running) return
    const id = setInterval(() => {
      setTimer((t) => {
        if (!t || !t.running) return t
        const remaining = t.remaining - 1
        if (remaining <= 0) return null
        return { ...t, remaining }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [timer?.running])

  useEffect(() => {
    const t = setTimeout(() => {
      setIslandPing(ISLAND_PING)
      setIslandExpanded(true)
    }, 8000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!islandPing) return
    const t = setTimeout(() => {
      setIslandPing(null)
      setIslandExpanded(false)
    }, 6000)
    return () => clearTimeout(t)
  }, [islandPing])

  const captureRect = useCallback((el) => {
    if (!el || !screenRef.current) return null
    const s = screenRef.current.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const k = s.width / STAGE_W || 1
    return {
      left: (r.left - s.left) / k,
      top: (r.top - s.top) / k,
      width: r.width / k,
      height: r.height / k,
      stage: { width: STAGE_W, height: STAGE_H },
    }
  }, [])

  const closeOverlay = useCallback(() => {
    setOverlayClosing(true)
    setTimeout(() => {
      setOverlay(null)
      setOverlayClosing(false)
    }, 260)
  }, [])

  const openApp = useCallback((appId, el) => {
    setMenu(null)
    setOverlay(null)
    setOverlayClosing(false)
    setIslandExpanded(false)
    setOpenFolder(null)
    setActiveApp({ appId, rect: captureRect(el) })
  }, [captureRect])

  const closeApp = useCallback(() => {
    setAppClosing(true)
    setTimeout(() => {
      setActiveApp(null)
      setAppClosing(false)
    }, 320)
  }, [])

  const openFolder = useCallback((folderId, el) => {
    setActiveFolder({ folderId, rect: captureRect(el) || { left: 150, top: 200, width: 60, height: 60, stage: { width: STAGE_W, height: STAGE_H } } })
  }, [captureRect])

  const removeItem = useCallback((pi, ii) => {
    setPages((p) => p.map((pg, idx) => (idx === pi ? { ...pg, items: pg.items.filter((_, j) => j !== ii) } : pg)))
  }, [])

  const onLongPressItem = useCallback((item, pi, ii, el) => {
    setMenu({ item, pi, ii, rect: captureRect(el) })
  }, [captureRect])

  const onToggle = useCallback((key) => {
    setToggles((t) => ({ ...t, [key]: !t[key] }))
  }, [])

  const onTimerTile = useCallback((action) => {
    if (action === 'cancel') {
      setTimer(null)
      return
    }
    if (action === 'calculator' || action === 'camera') {
      openApp(action === 'calculator' ? 'calculator' : 'camera')
      return
    }
    setTimer((t) => {
      if (!t) return { remaining: 300, total: 300, running: true }
      return { ...t, running: !t.running }
    })
  }, [openApp])

  const onPlayPause = useCallback(() => {
    setNowPlaying((np) => ({ ...np, playing: !np.playing }))
  }, [])

  const onPrev = useCallback(() => {
    setTrackIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length)
    setNowPlaying((np) => ({ ...np, elapsed: 0 }))
  }, [])

  const onNext = useCallback(() => {
    setTrackIndex((i) => (i + 1) % PLAYLIST.length)
    setNowPlaying((np) => ({ ...np, elapsed: 0 }))
  }, [])

  const onHomeIndicator = useCallback(() => {
    if (menu) return setMenu(null)
    if (overlay) return closeOverlay()
    if (activeApp) return closeApp()
    if (activeFolder) return setActiveFolder(null)
    if (editMode) return setEditMode(false)
    if (islandExpanded) return setIslandExpanded(false)
  }, [menu, overlay, activeApp, activeFolder, editMode, islandExpanded, closeOverlay, closeApp])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (menu) setMenu(null)
      else if (overlay) closeOverlay()
      else if (activeApp) closeApp()
      else if (activeFolder) setActiveFolder(null)
      else if (editMode) setEditMode(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu, overlay, activeApp, activeFolder, editMode, closeOverlay, closeApp])

  const timeStr = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const islandActivity = islandPing
    ? { type: 'notification', ...islandPing }
    : timer
      ? { type: 'timer', ...timer }
      : nowPlaying.playing
        ? { type: 'music' }
        : null

  return (
    <PhoneFrame theme={theme} reduceMotion={reduceMotion}>
      <div className="screen" ref={screenRef}>
        <Wallpaper page={page} brightness={brightness} />

        <HomeScreen
          pages={pages}
          page={page}
          setPage={setPage}
          onOpenApp={openApp}
          onOpenFolder={openFolder}
          onLongPressItem={onLongPressItem}
          onRemoveItem={removeItem}
          editMode={editMode}
          onExitEdit={() => setEditMode(false)}
          onEnterEdit={() => setEditMode(true)}
          onOpenSearch={() => !overlay && setOverlay('search')}
          dockApps={DOCK}
          onOpenDockApp={openApp}
        />

        <TopZones
          onNotifications={() => !overlay && setOverlay('notifications')}
          onControl={() => !overlay && setOverlay('control')}
        />

        <StatusBar time={timeStr} toggles={toggles} islandExpanded={islandExpanded} />

        <DynamicIsland
          expanded={islandExpanded}
          onToggle={() => setIslandExpanded((v) => !v)}
          activity={islandActivity}
          nowPlaying={{ ...nowPlaying, track }}
          onPlayPause={onPlayPause}
          onPrev={onPrev}
          onNext={onNext}
          onTimerToggle={() => setTimer((t) => (t ? { ...t, running: !t.running } : null))}
          onTimerCancel={() => setTimer(null)}
          onOpenApp={(appId) => openApp(appId)}
          time={timeStr}
          dateStr={dateStr}
        />

        {activeFolder && (
          <FolderView
            folderId={activeFolder.folderId}
            rect={activeFolder.rect}
            onClose={() => setOpenFolder(null)}
            onOpenApp={(appId, el) => openApp(appId, el)}
          />
        )}

        {activeApp && (
          <AppWindow
            key={openApp.appId}
            appId={activeApp.appId}
            rect={activeApp.rect}
            closing={appClosing}
            onClose={closeApp}
            music={{
              nowPlaying: { ...nowPlaying, track },
              onPlayPause,
              onPrev,
              onNext,
              volume,
              setVolume,
            }}
            settings={{ theme, setTheme, reduceMotion, setReduceMotion }}
          />
        )}

        {overlay === 'control' && (
          <ControlCenter
            closing={overlayClosing}
            toggles={toggles}
            onToggle={onToggle}
            brightness={brightness}
            setBrightness={setBrightness}
            volume={volume}
            setVolume={setVolume}
            nowPlaying={{ ...nowPlaying, track }}
            onPlayPause={onPlayPause}
            timer={timer}
            onTimerTile={onTimerTile}
            onClose={closeOverlay}
          />
        )}

        {overlay === 'notifications' && (
          <NotificationPanel
            closing={overlayClosing}
            notifications={notifications}
            dateStr={dateStr}
            onDismiss={(id) => setNotifications((n) => n.filter((x) => x.id !== id))}
            onClearAll={() => setNotifications([])}
            onOpenApp={(appId) => openApp(appId)}
            onClose={closeOverlay}
          />
        )}

        {overlay === 'search' && (
          <SearchPanel
            closing={overlayClosing}
            onOpenApp={openApp}
            onClose={closeOverlay}
          />
        )}

        {menu && (
          <ContextMenu
            target={menu.item}
            rect={menu.rect}
            onClose={() => setMenu(null)}
            onEditHome={() => {
              setMenu(null)
              setEditMode(true)
            }}
            onRemove={() => removeItem(menu.pi, menu.ii)}
          />
        )}

        <div className="home-indicator" onPointerDown={onHomeIndicator} role="button" aria-label="Home" />
      </div>
    </PhoneFrame>
  )
}
