import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import GradientPageLayout from '../components/GradientPageLayout.jsx'
import BackButton from '../components/BackButton.jsx'
import SparkleDivider from '../components/SparkleDivider.jsx'

// uses the env variable in production, falls back to localhost for local dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function LoadingPage() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const { files, context } = location.state || {}

    // if someone lands here without files, send them back
    if (!files || files.length === 0) {
      navigate('/upload')
      return
    }

    async function runReview() {
      try {
        // build the form data to send to the backend
        const formData = new FormData()
        files.forEach(file => formData.append('screenshots', file))
        formData.append('context', context || '')

        const response = await fetch(`${API_URL}/api/review`, {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          navigate('/results', { state: { error: data.error } })
          return
        }

        // pass the real report to the results page
        navigate('/results', { state: { report: data } })

      } catch (err) {
        console.error('network error:', err)
        navigate('/results', {
          state: { error: 'Could not reach the server. Please try again in a moment.' }
        })
      }
    }

    runReview()
  }, [])

  return (
    <GradientPageLayout gradientClass="grad-loading" showCorners={false}>
      <BackButton to="/upload" />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
        }}
      >
        <p
          className="serif loading-pulse"
          style={{ fontSize: 28, fontWeight: 400, color: '#222', marginBottom: 14 }}
        >
          Reviewing your interface...
        </p>

        <SparkleDivider lineWidth={100} />
      </div>
    </GradientPageLayout>
  )
}