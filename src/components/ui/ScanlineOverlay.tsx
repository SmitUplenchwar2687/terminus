// Subtle star-field noise texture at ~3% opacity.
// Replaces the CRT scanline overlay.
export default function ScanlineOverlay() {
  return (
    <div
      className="cosmic-noise fixed inset-0 z-50"
      aria-hidden="true"
    />
  )
}
