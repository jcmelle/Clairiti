import { useNavigate } from 'react-router-dom'
import GradientPageLayout from '../components/GradientPageLayout.jsx'
import SparkleIcon from '../components/SparkleIcon.jsx'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <GradientPageLayout gradientClass="grad-landing" showCorners>
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px 80px',
        }}
      >
        {/* logo inside a thin oval */}
        <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 40 }}>
          <div
            className="serif"
            style={{
              border: '1.5px solid #222',
              borderRadius: '50%',
              padding: '16px 60px',
              fontSize: 68,
              fontWeight: 400,
              color: '#111',
              letterSpacing: '-1px',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            Clairiti
          </div>

          {/* sparkle accents around the logo */}
          <span style={{ position: 'absolute', top: -10, right: -20 }}>
            <SparkleIcon size={24} color="#111" />
          </span>
          <span style={{ position: 'absolute', bottom: -2, left: -10 }}>
            <SparkleIcon size={14} color="#444" />
          </span>
        </div>

        {/* how it works section */}
        <div style={{ textAlign: 'center', maxWidth: 380 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <span style={{ width: 36, height: 1, background: '#555', display: 'block' }} />
            <span style={{ fontSize: 14, color: '#333', letterSpacing: '0.3px' }}>
              How it works
            </span>
            <span style={{ width: 36, height: 1, background: '#555', display: 'block' }} />
          </div>

          <Step number="1." title="Upload" desc="Add a screenshot of your interface." />
          <Step number="2." title="Review" desc="Clairiti will check its clarity, contrast, hierarchy, and usability." />
          <Step number="3." title="Improve" desc="Get your prioritized fixes/suggestions!" />
        </div>

        <button
          className="btn-pill-solid"
          onClick={() => navigate('/upload')}
          style={{ marginTop: 34 }}
        >
          Get Review
        </button>
      </main>
    </GradientPageLayout>
  )
}

// each step in the how it works list
function Step({ number, title, desc }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <p style={{ fontSize: 14, fontWeight: 500, color: '#222', marginBottom: 2 }}>
        {number} {title}
      </p>
      <p style={{ fontSize: 13, color: '#555', lineHeight: 1.55 }}>{desc}</p>
    </div>
  )
}
