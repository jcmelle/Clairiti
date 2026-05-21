import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientPageLayout from '../components/GradientPageLayout.jsx'
import BackButton from '../components/BackButton.jsx'
import SparkleDivider from '../components/SparkleDivider.jsx'

export default function DescribePage() {
  const navigate = useNavigate()
  const [description, setDescription] = useState('')

  function handleSubmit() {
    // TODO Phase 3: send description to backend
    sessionStorage.setItem('reviewDescription', description)
    navigate('/loading')
  }

  return (
    <GradientPageLayout gradientClass="grad-describe" showCorners={false}>
      <BackButton to="/choice" />

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
            Describe your interface
          </h1>

          <SparkleDivider lineWidth={80} />

          <div style={{ marginTop: 22 }}>
            <label
              htmlFor="desc-context"
              style={{ display: 'block', fontSize: 14, color: '#333', fontWeight: 500, marginBottom: 8 }}
            >
              Context
            </label>

            <textarea
              id="desc-context"
              className="styled-textarea"
              placeholder="Tell Clairiti about your interface (what it does, who it's for, etc.)"
              rows={9}
              style={{ minHeight: 200 }}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

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
