import { useRef } from 'react'
import { UiIcon } from '../icons/Icons.jsx'
import useLongPress from '../hooks/useLongPress.js'

function fmt(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function VSlider({ value, onChange, icon, label }) {
  const ref = useRef(null)
  const apply = (e) => {
    const r = ref.current.getBoundingClientRect()
    const v = 1 - (e.clientY - r.top) / r.height
    onChange(Math.round(Math.min(1, Math.max(0, v)) * 100))
  }
  return (
    <div
      ref={ref}
      className="cc-slider"
      role="slider"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        apply(e)
      }}
      onPointerMove={(e) => {
        if (e.buttons > 0) apply(e)
      }}
    >
      <div className="cc-slider-fill" style={{ height: `${value}%` }} />
      <span className="cc-slider-icon"><UiIcon name={icon} size={20} /></span>
    </div>
  )
}

function RoundToggle({ active, color, icon, label, onClick, size = 52 }) {
  return (
    <button
      className={`cc-round${active ? ' active' : ''}`}
      style={active ? { background: color, color: '#fff' } : undefined}
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
    >
      <UiIcon name={icon} size={size === 52 ? 22 : 20} />
    </button>
  )
}

export default function ControlCenter({
  closing,
  toggles,
  onToggle,
  brightness,
  setBrightness,
  volume,
  setVolume,
  nowPlaying,
  onPlayPause,
  timer,
  onTimerTile,
  onClose,
}) {
  const timerPress = useLongPress(() => onTimerTile('cancel'), { delay: 600 })
  const { track, playing } = nowPlaying

  return (
    <div className={`cc-layer${closing ? ' closing' : ''}`}>
      <div className="cc-dim" onPointerDown={onClose} />
      <div className="cc-panel" onPointerDown={(e) => e.stopPropagation()}>
        <div className="cc-connectivity cc-tile">
          <RoundToggle
            active={toggles.airplane}
            color="#ff9f0a"
            icon="airplane"
            label="Airplane Mode"
            onClick={() => onToggle('airplane')}
          />
          <RoundToggle
            active={toggles.cellular}
            color="#30d158"
            icon="cell"
            label="Cellular Data"
            onClick={() => onToggle('cellular')}
          />
          <RoundToggle
            active={toggles.wifi}
            color="#0a84ff"
            icon="wifi"
            label="Wi-Fi"
            onClick={() => onToggle('wifi')}
          />
          <RoundToggle
            active={toggles.bluetooth}
            color="#0a84ff"
            icon="bluetooth"
            label="Bluetooth"
            onClick={() => onToggle('bluetooth')}
          />
        </div>

        <button
          className={`cc-tile cc-small${toggles.rotationLock ? ' active-red' : ''}`}
          onClick={() => onToggle('rotationLock')}
          aria-pressed={toggles.rotationLock}
          aria-label="Rotation Lock"
        >
          <UiIcon name="rotationLock" size={22} />
        </button>

        <button
          className={`cc-tile cc-small${toggles.focus ? ' active-purple' : ''}`}
          onClick={() => onToggle('focus')}
          aria-pressed={toggles.focus}
          aria-label="Focus Mode"
        >
          <UiIcon name="moon" size={20} />
        </button>

        <button className="cc-tile cc-mirroring" aria-label="Screen Mirroring (simulated)">
          <UiIcon name="mirroring" size={22} />
          <span>Screen Mirroring</span>
        </button>

        <VSlider value={brightness} onChange={setBrightness} icon="sun" label="Brightness" />
        <VSlider value={volume} onChange={setVolume} icon="volume" label="Volume" />

        <div className="cc-tile cc-nowplaying">
          <div className="cc-np-meta">
            <strong>{track.title}</strong>
            <span>{track.artist}</span>
          </div>
          <div className="cc-np-controls">
            <button onClick={onPlayPause} aria-label={playing ? 'Pause' : 'Play'}>
              <UiIcon name={playing ? 'pause' : 'play'} size={22} />
            </button>
          </div>
        </div>

        <button
          className={`cc-tile cc-small cc-flashlight${toggles.flashlight ? ' active-white' : ''}`}
          onClick={() => onToggle('flashlight')}
          aria-pressed={toggles.flashlight}
          aria-label="Flashlight"
        >
          <UiIcon name="flashlight" size={22} />
        </button>

        <button
          className={`cc-tile cc-small cc-timer${timer ? ' active-orange' : ''}`}
          onClick={() => onTimerTile('tap')}
          aria-label={timer ? `Timer ${fmt(timer.remaining)}` : 'Start Timer'}
          {...timerPress.handlers}
        >
          {timer ? <span className="cc-timer-readout">{fmt(timer.remaining)}</span> : <UiIcon name="timer" size={22} />}
        </button>

        <button className="cc-tile cc-small" onClick={() => onTimerTile('calculator')} aria-label="Calculator (simulated)">
          <UiIcon name="search" size={0} />
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <rect x="5.4" y="3.4" width="13.2" height="17.2" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <rect x="7.8" y="5.8" width="8.4" height="3.4" rx="1" fill="currentColor" />
            <circle cx="8.9" cy="12.6" r="1.1" fill="currentColor" />
            <circle cx="12" cy="12.6" r="1.1" fill="currentColor" />
            <circle cx="15.1" cy="12.6" r="1.1" fill="currentColor" />
            <circle cx="8.9" cy="16.4" r="1.1" fill="currentColor" />
            <circle cx="12" cy="16.4" r="1.1" fill="currentColor" />
            <circle cx="15.1" cy="16.4" r="1.1" fill="currentColor" />
          </svg>
        </button>

        <button className="cc-tile cc-small" onClick={() => onTimerTile('camera')} aria-label="Camera (simulated)">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M8.3 6.2l1.3-2h4.8l1.3 2h3.5A1.8 1.8 0 0 1 21 8v11a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 19V8a1.8 1.8 0 0 1 1.8-1.8z"
              fill="none" stroke="currentColor" strokeWidth="1.7"
            />
            <circle cx="12" cy="13.2" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
