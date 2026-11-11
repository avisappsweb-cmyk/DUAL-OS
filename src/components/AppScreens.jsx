import { useState } from 'react'
import AppIconArt from '../icons/AppIconArt.jsx'
import { WEATHER } from '../data/apps.js'
import { UiIcon } from '../icons/Icons.jsx'

function fmt(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function WeatherApp() {
  return (
    <div className="app-weather">
      <div className="aw-hero">
        <span className="aw-city">{WEATHER.city}</span>
        <span className="aw-temp">{WEATHER.temp}°</span>
        <span className="aw-cond">{WEATHER.condition}</span>
        <span className="aw-hilo">H:{WEATHER.high}°  L:{WEATHER.low}°</span>
      </div>
      <div className="aw-card">
        <span className="aw-card-label">Hourly Forecast</span>
        <div className="aw-hours">
          {WEATHER.hourly.map((h) => (
            <div className="aw-hour" key={h.label}>
              <span>{h.label}</span>
              <UiIcon name={h.icon} size={22} />
              <strong>{h.temp}°</strong>
            </div>
          ))}
        </div>
      </div>
      <p className="aw-note">Simulated weather data — native implementation uses a weather API.</p>
    </div>
  )
}

export function MusicApp({ nowPlaying, onPlayPause, onPrev, onNext, volume, setVolume }) {
  const { track, playing, elapsed } = nowPlaying
  return (
    <div className="app-music">
      <div className="am-art" style={{ background: 'linear-gradient(150deg,#fc6379,#fa233b)' }}>
        <UiIcon name="music" size={64} />
      </div>
      <div className="am-meta">
        <strong>{track.title}</strong>
        <span>{track.artist} — {track.album}</span>
      </div>
      <div className="am-progress">
        <div className="am-progress-fill" style={{ width: `${(elapsed / track.duration) * 100}%` }} />
      </div>
      <div className="am-times">
        <span>{fmt(elapsed)}</span>
        <span>-{fmt(track.duration - elapsed)}</span>
      </div>
      <div className="am-controls">
        <button onClick={onPrev} aria-label="Previous track"><UiIcon name="backward" size={30} /></button>
        <button className="am-main" onClick={onPlayPause} aria-label={playing ? 'Pause' : 'Play'}>
          <UiIcon name={playing ? 'pause' : 'play'} size={34} />
        </button>
        <button onClick={onNext} aria-label="Next track"><UiIcon name="forward" size={30} /></button>
      </div>
      <div className="am-volume">
        <UiIcon name="volume" size={14} />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
        />
      </div>
    </div>
  )
}

export function SettingsApp({ theme, setTheme, reduceMotion, setReduceMotion }) {
  return (
    <div className="app-settings">
      <h1>Settings</h1>
      <div className="as-group">
        <span className="as-group-label">APPEARANCE</span>
        <div className="as-row">
          <span>Mode</span>
          <div className="as-segmented" role="radiogroup" aria-label="Appearance">
            {['light', 'dark'].map((t) => (
              <button
                key={t}
                role="radio"
                aria-checked={theme === t}
                className={theme === t ? 'on' : ''}
                onClick={() => setTheme(t)}
              >
                {t === 'light' ? 'Light' : 'Dark'}
              </button>
            ))}
          </div>
        </div>
        <div className="as-row">
          <span>Reduce Motion</span>
          <button
            className={`as-switch${reduceMotion ? ' on' : ''}`}
            role="switch"
            aria-checked={reduceMotion}
            onClick={() => setReduceMotion(!reduceMotion)}
          >
            <span className="as-knob" />
          </button>
        </div>
      </div>
      <div className="as-group">
        <span className="as-group-label">ABOUT</span>
        <div className="as-row as-row-tall">
          <span>DUAL OS · iPhone Mode</span>
          <span className="as-value">Prototype 0.1</span>
        </div>
        <p className="as-note">
          Settings shown here control the prototype only. Native Android system
          settings are implemented by the DUAL OS Android build.
        </p>
      </div>
    </div>
  )
}

const PHOTO_TILES = [
  ['#fa233b', '#ff9f0a'], ['#0a84ff', '#5e5ce6'], ['#30d158', '#0eb5a6'],
  ['#ff2d55', '#bf5af2'], ['#ffd60a', '#ff9f0a'], ['#64d2ff', '#0a84ff'],
  ['#5e5ce6', '#1c1c3a'], ['#ff9f0a', '#ff375f'], ['#0eb5a6', '#30d158'],
  ['#bf5af2', '#5e5ce6'], ['#ff6482', '#ffd60a'], ['#141e30', '#4b79a1'],
]

export function PhotosApp() {
  return (
    <div className="app-photos">
      <h1>Photos</h1>
      <div className="ap-grid">
        {PHOTO_TILES.map(([a, b], i) => (
          <div key={i} className="ap-tile" style={{ background: `linear-gradient(150deg, ${a}, ${b})` }} />
        ))}
      </div>
      <p className="aw-note">Placeholder library — no photos are stored in the prototype.</p>
    </div>
  )
}

export function PlaceholderApp({ app }) {
  return (
    <div className="app-placeholder">
      <AppIconArt app={app} size={84} />
      <h2>{app.name}</h2>
      <p>This app is represented in the prototype shell. Its functionality is implemented natively by the DUAL OS Android build.</p>
    </div>
  )
}
