import { useLocation, useNavigate } from 'react-router-dom'
import GradientPageLayout from '../components/GradientPageLayout.jsx'
import BackButton from '../components/BackButton.jsx'
import SparkleIcon from '../components/SparkleIcon.jsx'
import ResultScoreCard from '../components/ResultScoreCard.jsx'
import PriorityFixesCard from '../components/PriorityFixesCard.jsx'
import FeedbackCategoryCard from '../components/FeedbackCategoryCard.jsx'
import mockReport from '../data/mockReport.js'

export default function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const error = location.state?.error
  // Use real report from API if available, otherwise fall back to mock
  const report = location.state?.report || mockReport

  // ── Error state ───────────────────────────────────────────
  if (error) {
    return (
      <GradientPageLayout gradientClass="grad-results" showCorners={false}>
        <BackButton to="/upload" />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(200,100,100,0.3)',
            borderRadius: 16, padding: '32px 40px', textAlign: 'center', maxWidth: 420,
          }}>
            <p style={{ fontSize: 28, marginBottom: 12 }}>✦</p>
            <h2 className="serif" style={{ fontSize: 22, marginBottom: 10, color: '#111' }}>
              Something went wrong
            </h2>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, marginBottom: 24 }}>
              {error}
            </p>
            <button className="btn-pill-outline" onClick={() => navigate('/upload')}>
              Try again
            </button>
          </div>
        </div>
      </GradientPageLayout>
    )
  }

  // ── Results ───────────────────────────────────────────────
  return (
    <GradientPageLayout gradientClass="grad-results" showCorners={false}>
      <BackButton to="/" />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '60px 20px 48px',
      }}>
        <div style={{ width: '100%', maxWidth: 640 }}>
          <h1 className="serif" style={{ fontSize: 32, fontWeight: 400, color: '#111', marginBottom: 6 }}>
            Review complete
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <span style={{ width: 70, height: 1, background: '#555', display: 'block', flexShrink: 0 }} />
            <SparkleIcon size={15} color="#444" />
            <span style={{ width: 70, height: 1, background: '#555', display: 'block', flexShrink: 0 }} />
          </div>

          <ResultScoreCard score={report.overallScore} summary={report.summary} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.65fr', gap: 14, marginTop: 14 }}>
            <PriorityFixesCard fixes={report.priorityFixes} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignContent: 'start' }}>
              {report.categories.map(cat => (
                <FeedbackCategoryCard key={cat.name} category={cat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </GradientPageLayout>
  )
}
