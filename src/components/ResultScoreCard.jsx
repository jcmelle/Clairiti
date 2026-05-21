// the big score card at the top of the results page
export default function ResultScoreCard({ score, summary }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.36)',
        border: '1px solid rgba(200,190,230,0.55)',
        borderRadius: 16,
        padding: '22px 28px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 28,
        marginBottom: 14,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* left side — the score number */}
      <div style={{ flexShrink: 0 }}>
        <p style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>Overall Score</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <span
            className="serif"
            style={{ fontSize: 64, fontWeight: 400, color: '#111', lineHeight: 1 }}
          >
            {score}
          </span>
          <span style={{ fontSize: 16, color: '#999' }}>/100</span>
        </div>
        <div style={{ width: 80, height: 1, background: 'rgba(0,0,0,0.14)', marginTop: 8 }} />
      </div>

      {/* vertical divider between score and summary */}
      <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(0,0,0,0.12)', flexShrink: 0 }} />

      {/* right side — the summary text */}
      <div style={{ paddingTop: 4, flex: 1 }}>
        <div style={{ height: 1, background: 'rgba(0,0,0,0.13)', marginBottom: 12 }} />
        <p style={{ fontSize: 13, color: '#444', lineHeight: 1.65 }}>{summary}</p>
        <div style={{ height: 1, background: 'rgba(0,0,0,0.13)', marginTop: 12 }} />
      </div>
    </div>
  )
}
