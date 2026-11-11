export default function Wallpaper({ page = 0, brightness = 70 }) {
  const dim = 0.55 + (brightness / 100) * 0.45
  return (
    <div className="wallpaper" style={{ filter: `brightness(${dim})` }}>
      <div className="wallpaper-art" style={{ transform: `translateX(${page * -10}px)` }} />
      <div className="wallpaper-grain" />
    </div>
  )
}
