import { UiIcon } from '../icons/Icons.jsx'

function Battery({ level = 78 }) {
  const w = Math.max(2, (17.5 * level) / 100)
  return (
    <svg viewBox="0 0 27 14" width="27" height="14" aria-hidden="true">
      <rect x="1" y="1.5" width="21" height="11" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.45" />
      <rect x="2.6" y="3.1" width={w} height="7.8" rx="1.8" fill="currentColor" />
      <path d="M23.6 5.2v3.6a2 2 0 0 0 0-3.6z" fill="currentColor" opacity="0.45" />
    </svg>
  )
}

export default function StatusBar({ time, toggles, islandExpanded }) {
  return (
    <header className={`status-bar${islandExpanded ? ' status-bar-island-open' : ''}`}>
      <span className="status-time">{time}</span>
      <span className="status-icons">
        {toggles.airplane ? (
          <UiIcon name="airplane" size={16} />
        ) : (
          <>
            {toggles.cellular && <UiIcon name="cell" size={18} />}
            {toggles.wifi && <UiIcon name="wifi" size={17} />}
          </>
        )}
        {toggles.lowPower && <UiIcon name="lowPower" size={15} className="status-lowpower" />}
        <Battery level={78} />
      </span>
    </header>
  )
}
