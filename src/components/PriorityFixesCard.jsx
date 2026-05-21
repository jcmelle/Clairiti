// shows the top 3 things to fix, listed with dividers between them
export default function PriorityFixesCard({ fixes = [] }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.36)',
        border: '1px solid rgba(200,190,230,0.55)',
        borderRadius: 16,
        padding: '18px 20px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        height: '100%',
      }}
    >
      <p style={{ fontSize: 12, color: '#666', fontWeight: 500, marginBottom: 4 }}>
        Priority Fixes
      </p>

      {fixes.map((fix, i) => (
        <div key={i}>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.15)', margin: '10px 0' }} />
          <p style={{ fontSize: 12.5, color: '#333', lineHeight: 1.55 }}>{fix}</p>
        </div>
      ))}

      {/* trailing line at the bottom */}
      <div style={{ height: 1, background: 'rgba(0,0,0,0.15)', marginTop: 10 }} />
    </div>
  )
}
