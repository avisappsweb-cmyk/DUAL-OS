import { useRef } from 'react'

export default function useLongPress(callback, { delay = 450, move = 10 } = {}) {
  const timer = useRef(null)
  const fired = useRef(false)
  const origin = useRef(null)

  const clear = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }

  const handlers = {
    onPointerDown: (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      fired.current = false
      origin.current = { x: e.clientX, y: e.clientY }
      const target = e.currentTarget
      clear()
      timer.current = setTimeout(() => {
        fired.current = true
        callback(target)
      }, delay)
    },
    onPointerMove: (e) => {
      if (origin.current) {
        const dx = e.clientX - origin.current.x
        const dy = e.clientY - origin.current.y
        if (Math.hypot(dx, dy) > move) clear()
      }
    },
    onPointerUp: clear,
    onPointerLeave: clear,
    onPointerCancel: clear,
  }

  return {
    handlers,
    didFire: () => fired.current,
  }
}
