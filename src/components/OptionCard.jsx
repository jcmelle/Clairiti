// the big clickable cards on the choice page
export default function OptionCard({ icon, iconGradient, title, description, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      style={{
        background: 'rgba(255,255,255,0.32)',
        border: '1px solid rgba(200,190,220,0.5)',
        borderRadius: 18,
        padding: '28px 22px 24px',
        cursor: 'pointer',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'background 0.15s, transform 0.12s',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.52)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.32)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {/* gradient icon square */}
      <div
        aria-hidden="true"
        style={{
          width: 54,
          height: 54,
          borderRadius: 14,
          background: iconGradient || 'linear-gradient(135deg, #f8c8e8, #d8b8f8)',
          border: '1px solid rgba(180,140,200,0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 18px',
        }}
      >
        {icon}
      </div>

      <h3
        className="serif"
        style={{ fontSize: 15, fontWeight: 400, color: '#222', marginBottom: 6 }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 12.5, color: '#555', lineHeight: 1.55 }}>
        {description}
      </p>
    </div>
  )
}
