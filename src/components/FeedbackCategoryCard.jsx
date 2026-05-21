import { useState } from 'react'

// each of the 6 category cards — click one to see full details in a modal
export default function FeedbackCategoryCard({ category }) {
  const [open, setOpen] = useState(false)

  // pick the right badge color based on severity
  const badgeClass =
    category.severity === 'High'  ? 'badge-high'
    : category.severity === 'Low' ? 'badge-low'
    : 'badge-medium'

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`view details for ${category.name}`}
        onClick={() => setOpen(true)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(true) }}
        style={{
          background: 'rgba(255,255,255,0.30)',
          border: '1px solid rgba(200,190,230,0.5)',
          borderRadius: 14,
          padding: '14px 16px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'background 0.15s',
          userSelect: 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.52)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.30)'}
      >
        <span
          className={badgeClass}
          style={{
            display: 'inline-block',
            fontSize: 10,
            padding: '2px 9px',
            borderRadius: 99,
            fontWeight: 500,
            marginBottom: 5,
          }}
        >
          {category.severity}
        </span>
        <p style={{ fontSize: 12, color: '#222', fontWeight: 500, marginBottom: 3 }}>
          {category.name}
        </p>
        <p style={{ fontSize: 11, color: '#666', lineHeight: 1.45 }}>
          {category.status}
        </p>
      </div>

      {/* detail modal — opens when you click a card */}
      {open && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.32)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              padding: 28,
              maxWidth: 420,
              width: '100%',
              boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="close"
              style={{
                position: 'absolute',
                top: 14,
                right: 16,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 22,
                color: '#888',
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <h2 className="serif" style={{ fontSize: 21, fontWeight: 400, color: '#111', marginBottom: 10 }}>
              {category.name}
            </h2>
            <span
              className={badgeClass}
              style={{ display: 'inline-block', fontSize: 11, padding: '3px 10px', borderRadius: 99, fontWeight: 500, marginBottom: 14 }}
            >
              {category.severity} — {category.status}
            </span>

            <DetailRow label="Issue"          value={category.issue} />
            <DetailRow label="Why it matters" value={category.whyItMatters} />
            <DetailRow label="Suggested fix"  value={category.suggestedFix} />
          </div>
        </div>
      )}
    </>
  )
}

// small helper for each labeled row inside the modal
function DetailRow({ label, value }) {
  return (
    <div style={{ marginTop: 14 }}>
      <p style={{ fontSize: 10.5, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 13, color: '#333', lineHeight: 1.6 }}>
        {value}
      </p>
    </div>
  )
}
