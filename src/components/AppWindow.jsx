import { useEffect, useState } from 'react'
import { APPS } from '../data/apps.js'
import AppIconArt from '../icons/AppIconArt.jsx'
import { WeatherApp, MusicApp, SettingsApp, PhotosApp, PlaceholderApp } from './AppScreens.jsx'

export default function AppWindow({ appId, rect, closing, onClose, music, settings }) {
  const [phase, setPhase] = useState('opening')

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('open')))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const app = APPS[appId]
  if (!app) return null

  const r = rect || { left: 133.5, top: 11, width: 126, height: 37 }
  const sx = r.width / 393
  const sy = r.height / 852
  const tx = r.left + r.width / 2 - 196.5
  const ty = r.top + r.height / 2 - 426
  const shrunk = phase === 'opening' || closing

  let content = <PlaceholderApp app={app} />
  if (appId === 'weather') content = <WeatherApp />
  if (appId === 'music') content = <MusicApp nowPlaying={music.nowPlaying} onPlayPause={music.onPlayPause} onPrev={music.onPrev} onNext={music.onNext} volume={music.volume} setVolume={music.setVolume} />
  if (appId === 'settings') content = <SettingsApp theme={settings.theme} setTheme={settings.setTheme} reduceMotion={settings.reduceMotion} setReduceMotion={settings.setReduceMotion} />
  if (appId === 'photos') content = <PhotosApp />

  return (
    <div
      className={`app-window${shrunk ? ' shrunk' : ''}`}
      style={{
        transform: shrunk
          ? `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`
          : 'translate(0px, 0px) scale(1, 1)',
      }}
      role="dialog"
      aria-label={app.name}
    >
      <div className="app-window-content">{content}</div>
    </div>
  )
}
