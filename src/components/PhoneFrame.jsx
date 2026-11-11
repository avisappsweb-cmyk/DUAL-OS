import { useEffect, useLayoutEffect, useState } from 'react'

export default function PhoneFrame({ theme, reduceMotion, children }) {
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const fit = () => {
      const s = Math.min(
        1,
        (window.innerHeight - 32) / 884,
        (window.innerWidth - 16) / 413
      )
      setScale(Math.max(0.35, s))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('reduce-motion', reduceMotion)
  }, [reduceMotion])

  return (
    <div className={`stage theme-${theme}`}>
      <div className="stage-caption">
        <span className="stage-caption-logo">DUAL OS</span>
        <span>iPhone Mode · Interactive Prototype</span>
      </div>
      <div className="device-scaler" style={{ transform: `scale(${scale})` }}>
        <div className="device">
          <div className="device-screen">{children}</div>
        </div>
      </div>
    </div>
  )
}
