import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientPageLayout from '../components/GradientPageLayout.jsx'
import BackButton from '../components/BackButton.jsx'
import SparkleDivider from '../components/SparkleDivider.jsx'
import UploadBox from '../components/UploadBox.jsx'

export default function UploadPage() {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [context, setContext] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (files.length === 0) {
      setError('Please upload at least one screenshot.')
      return
    }
    setError('')

    // Build a FormData payload — same format multer expects on the server
    const formData = new FormData()
    files.forEach(file => formData.append('screenshots', file))
    formData.append('context', context)

    // Store formData reference so LoadingPage can send it
    // We pass it via sessionStorage as a flag; the actual fetch
    // happens in LoadingPage so the loading screen shows while waiting
    sessionStorage.setItem('pendingContext', context)

    // Navigate to loading, passing files via state
    // (files can't go in sessionStorage, so we use router state)
    navigate('/loading', { state: { files, context } })
  }

  return (
    <GradientPageLayout gradientClass="grad-upload" showCorners={false}>
      <BackButton to="/" />

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '70px 24px 48px',
        }}
      >
        <div className="page-card">
          <h1
            className="serif"
            style={{ fontSize: 28, fontWeight: 400, color: '#111', textAlign: 'center', marginBottom: 8 }}
          >
            Upload your screenshots
          </h1>

          <SparkleDivider lineWidth={80} />

          <div style={{ marginTop: 22 }}>
            <UploadBox onFilesChange={setFiles} />

            {error && (
              <p style={{ color: '#c0392b', fontSize: 13, marginTop: 10, textAlign: 'center' }}>
                {error}
              </p>
            )}

            <label
              htmlFor="upload-context"
              style={{ display: 'block', fontSize: 14, color: '#555', margin: '18px 0 6px' }}
            >
              Optional Context
            </label>
            <textarea
              id="upload-context"
              className="styled-textarea"
              placeholder="Describe the interface or provide any useful context..."
              rows={4}
              value={context}
              onChange={e => setContext(e.target.value)}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                fontSize: 13,
                color: '#666',
                lineHeight: 1.5,
                marginTop: 12,
                padding: '9px 12px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: 10,
                border: '1px solid rgba(170,160,210,0.32)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>
                Please avoid uploading screenshots with passwords, private messages,
                addresses, API keys, or sensitive information.
              </span>
            </div>

            <div style={{ textAlign: 'center', marginTop: 22 }}>
              <button className="btn-pill-outline" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </GradientPageLayout>
  )
}
