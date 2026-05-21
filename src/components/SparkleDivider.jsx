import SparkleIcon from './SparkleIcon.jsx'

// the decorative divider i use under headings — looks like: ——— ✦ ———
export default function SparkleDivider({ lineWidth = 80, align = 'center', className = '' }) {
  return (
    <div
      className={`sparkle-divider ${className}`}
      style={{ justifyContent: align === 'left' ? 'flex-start' : 'center' }}
    >
      <span className="sd-line" style={{ width: lineWidth }} />
      <SparkleIcon size={15} color="#444" />
      {align !== 'left' && (
        <span className="sd-line" style={{ width: lineWidth }} />
      )}
    </div>
  )
}
