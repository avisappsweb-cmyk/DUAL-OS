import { useEffect, useState } from 'react'
import AppIconArt from '../icons/AppIconArt.jsx'
import { APPS } from '../data/apps.js'
import { UiIcon } from '../icons/Icons.jsx'

function fmt(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function Equalizer() {
  return (
    <span className="di-eq" aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  )
}

function CompactContent({ activity }) {
  if (!activity) return null
  if (activity.type === 'music') {
    return (
      <div className="di-compact-inner di-compact-music">
        <span className="di-mini-art" style={{ background: 'linear-gradient(150deg,#fc6379,#fa233b)' }} />
        <Equalizer />
      </div>
    )
  }
  if (activity.type === 'timer') {
    return (
      <div className="di-compact-inner di-compact-timer">
        <UiIcon name="timer" size={14} />
        <span className="di-compact-mono">{fmt(activity.remaining)}</span>
      </div>
    )
  }
  if (activity.type === 'notification') {
    const app = APPS[activity.appId]
    return (
      <div className="di-compact-inner di-compact-notif">
        <AppIconArt app={app} size={20} />
        <Equalizer />
      </div>
    )
  }
  return null
}

function ExpandedContent({ activity, nowPlaying, onPlayPause, onPrev, onNext, onTimerToggle, onTimerCancel, onOpenApp, time, dateStr }) {
  if (!activity || activity.type === 'music') {
    if (activity && activity.type === 'music') {
      const { track, elapsed, playing } = nowPlaying
      return (
        <div className="di-body di-body-music">
          <div className="di-music-top">
            <span className="di-art" style={{ background: 'linear-gradient(150deg,#fc6379,#fa233b)' }}>
              <UiIcon name="music" size={26} />
            </span>
            <div className="di-music-meta">
              <strong>{track.title}</strong>
              <span>{track.artist} — {track.album}</span>
            </div>
            <Equalizer />
          </div>
          <div className="di-progress">
            <div className="di-progress-fill" style={{ width: `${(elapsed / track.duration) * 100}%` }} />
          </div>
          <div className="di-progress-times">
            <span>{fmt(elapsed)}</span>
            <span>-{fmt(track.duration - elapsed)}</span>
          </div>
          <div className="di-music-controls">
            <button className="di-ctrl" onClick={onPrev} aria-label="Previous track"><UiIcon name="backward" size={24} /></button>
            <button className="di-ctrl di-ctrl-main" onClick={onPlayPause} aria-label={playing ? 'Pause' : 'Play'}>
              <UiIcon name={playing ? 'pause' : 'play'} size={26} />
            </button>
            <button className="di-ctrl" onClick={onNext} aria-label="Next track"><UiIcon name="forward" size={24} /></button>
          </div>
        </div>
      )
    }
    return (
      <div className="di-body di-body-clock">
        <div className="di-clock-big">{time}</div>
        <div className="di-clock-date">{dateStr}</div>
        <div className="di-clock-foot">DUAL OS · iPhone Mode</div>
      </div>
    )
  }
  if (activity.type === 'timer') {
    const pct = 1 - activity.remaining / activity.total
    return (
      <div className="di-body di-body-timer">
        <div className="di-timer-top">
          <span className="di-timer-ring" style={{ '--pct': `${pct * 100}%` }}>
            <UiIcon name="timer" size={20} />
          </span>
          <div className="di-timer-readout">
            <strong>{fmt(activity.remaining)}</strong>
            <span>Timer</span>
          </div>
        </div>
        <div className="di-timer-actions">
          <button className="di-pill" onClick={onTimerToggle}>{activity.running ? 'Pause' : 'Resume'}</button>
          <button className="di-pill di-pill-cancel" onClick={onTimerCancel}>Stop</button>
        </div>
      </div>
    )
  }
  if (activity.type === 'notification') {
    const app = APPS[activity.appId]
    return (
      <button className="di-body di-body-notif" onClick={() => onOpenApp(activity.appId)}>
        <AppIconArt app={app} size={38} />
        <div className="di-notif-text">
          <strong>{activity.title}</strong>
          <span>{activity.body}</span>
        </div>
        <span className="di-notif-open">Open</span>
      </button>
    )
  }
  return null
}

export default function DynamicIsland({
  expanded,
  onToggle,
  activity,
  nowPlaying,
  onPlayPause,
  onPrev,
  onNext,
  onTimerToggle,
  onTimerCancel,
  onOpenApp,
  time,
  dateStr,
}) {
  const [rendered, setRendered] = useState(activity)

  useEffect(() => {
    if (activity) setRendered(activity)
  }, [activity])

  const compactType = activity ? `di-compact-${activity.type}` : 'di-compact-none'
  const expandedType = rendered ? `di-expanded-${rendered.type}` : 'di-expanded-none'

  return (
    <div className="di-zone">
      <span className="di-lens" aria-hidden="true" />
      <button
        className={`di ${expanded ? 'di-expanded' : 'di-compact'} ${expanded ? expandedType : compactType}`}
        onClick={onToggle}
        aria-label={expanded ? 'Collapse Dynamic Island' : 'Expand Dynamic Island'}
      >
        {!expanded && <CompactContent activity={activity} />}
        {expanded && (
          <ExpandedContent
            activity={rendered}
            nowPlaying={nowPlaying}
            onPlayPause={onPlayPause}
            onPrev={onPrev}
            onNext={onNext}
            onTimerToggle={onTimerToggle}
            onTimerCancel={onTimerCancel}
            onOpenApp={onOpenApp}
            time={time}
            dateStr={dateStr}
          />
        )}
      </button>
    </div>
  )
}
