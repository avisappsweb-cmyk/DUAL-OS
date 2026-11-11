import { useEffect, useState } from 'react'
import { WEATHER } from '../data/apps.js'
import { UiIcon } from '../icons/Icons.jsx'
import useLongPress from '../hooks/useLongPress.js'

function WeatherWidget({ onOpen, editMode, onRemove, onLongPress }) {
  const press = useLongPress((el) => onLongPress(el))
  return (
    <div
      className="widget widget-medium"
      {...press.handlers}
      onClick={(e) => !editMode && onOpen('weather', e.currentTarget)}
      role="button"
      aria-label="Weather widget"
    >
      <div className="widget-weather-top">
        <div className="widget-weather-main">
          <span className="widget-weather-city">{WEATHER.city}</span>
          <span className="widget-weather-temp">{WEATHER.temp}°</span>
        </div>
        <div className="widget-weather-side">
          <UiIcon name="cloudsun" size={30} />
          <span className="widget-weather-cond">{WEATHER.condition}</span>
          <span className="widget-weather-hilo">H:{WEATHER.high}°  L:{WEATHER.low}°</span>
        </div>
      </div>
      <div className="widget-weather-hours">
        {WEATHER.hourly.map((h) => (
          <div className="widget-hour" key={h.label}>
            <span className="widget-hour-label">{h.label}</span>
            <UiIcon name={h.icon} size={17} />
            <span className="widget-hour-temp">{h.temp}°</span>
          </div>
        ))}
      </div>
      {editMode && <RemoveBadge onRemove={onRemove} />}
    </div>
  )
}

function ClockWidget({ onOpen, editMode, onRemove, onLongPress }) {
  const press = useLongPress((el) => onLongPress(el))
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const h = now.getHours() % 12
  const m = now.getMinutes()
  const s = now.getSeconds()
  return (
    <div
      className="widget widget-small widget-dark"
      {...press.handlers}
      onClick={(e) => !editMode && onOpen('clock', e.currentTarget)}
      role="button"
      aria-label="Clock widget"
    >
      <span className="widget-city-label">Cupertino</span>
      <svg viewBox="0 0 100 100" className="widget-clock-face" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="8"
            x2="50"
            y2="13"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2.4"
            strokeLinecap="round"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        <line
          x1="50" y1="54" x2="50" y2="26"
          stroke="#fff" strokeWidth="4" strokeLinecap="round"
          transform={`rotate(${h * 30 + m * 0.5} 50 50)`}
        />
        <line
          x1="50" y1="56" x2="50" y2="18"
          stroke="#fff" strokeWidth="3" strokeLinecap="round"
          transform={`rotate(${m * 6 + s * 0.1} 50 50)`}
        />
        <line
          x1="50" y1="60" x2="50" y2="16"
          stroke="#ff9f0a" strokeWidth="1.6" strokeLinecap="round"
          transform={`rotate(${s * 6} 50 50)`}
        />
        <circle cx="50" cy="50" r="3" fill="#ff9f0a" />
      </svg>
      {editMode && <RemoveBadge onRemove={onRemove} />}
    </div>
  )
}

function CalendarWidget({ onOpen, editMode, onRemove, onLongPress }) {
  const press = useLongPress((el) => onLongPress(el))
  const now = new Date()
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' })
  const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  return (
    <div
      className="widget widget-small widget-light"
      {...press.handlers}
      onClick={(e) => !editMode && onOpen('calendar', e.currentTarget)}
      role="button"
      aria-label="Calendar widget"
    >
      <div className="widget-cal-head">
        <span className="widget-cal-dow">{weekday}</span>
        <span className="widget-cal-date">
          <span className="widget-cal-month">{month}</span>
          {now.getDate()}
        </span>
      </div>
      <div className="widget-cal-event">
        <span className="widget-cal-line" />
        <div>
          <strong>Design Review</strong>
          <span>3:00 – 4:00 PM</span>
        </div>
      </div>
      {editMode && <RemoveBadge onRemove={onRemove} />}
    </div>
  )
}

function RemoveBadge({ onRemove }) {
  return (
    <button
      className="app-remove"
      aria-label="Remove widget"
      onClick={(e) => {
        e.stopPropagation()
        onRemove()
      }}
    >
      <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </button>
  )
}

export default function Widget({ id, onOpen, editMode, onRemove, onLongPress }) {
  const props = { onOpen, editMode, onRemove, onLongPress }
  if (id === 'weather') return <WeatherWidget {...props} />
  if (id === 'clock') return <ClockWidget {...props} />
  if (id === 'calendar') return <CalendarWidget {...props} />
  return null
}
