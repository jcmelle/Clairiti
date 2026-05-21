import { useNavigate } from 'react-router-dom'
import GradientPageLayout from '../components/GradientPageLayout.jsx'
import BackButton from '../components/BackButton.jsx'
import SparkleDivider from '../components/SparkleDivider.jsx'
import OptionCard from '../components/OptionCard.jsx'

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="#7a5fa0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8"  y1="12" x2="16" y2="12" />
    </svg>
  )
}

export default function ChoicePage() {
  const navigate = useNavigate()

  return (
    <GradientPageLayout gradientClass="grad-choice" showCorners={false}>
      <BackButton to="/" />

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '70px 24px 48px',
        }}
      >
        <div className="page-card">
          <h1
            className="serif"
            style={{ fontSize: 28, fontWeight: 400, color: '#111', textAlign: 'center', marginBottom: 8 }}
          >
            What would you like to review?
          </h1>

          <SparkleDivider lineWidth={80} />

          <div style={{ marginTop: 28 }}>
            <OptionCard
              icon={<PlusIcon />}
              iconGradient="linear-gradient(135deg, #f8c8e8, #d8b8f8)"
              title="Upload a screenshot"
              description="Share a UI screen, mockup, or app design."
              onClick={() => navigate('/upload')}
            />
          </div>
        </div>
      </div>
    </GradientPageLayout>
  )
}
