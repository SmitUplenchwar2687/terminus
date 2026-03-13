// Server component — no hooks needed, just a pure DOM overlay.
export default function ScanlineOverlay() {
  return (
    <div
      className="scanlines fixed inset-0 z-50"
      aria-hidden="true"
      style={{ mixBlendMode: 'overlay' }}
    />
  )
}
