import { useNavigate } from 'react-router-dom'

// simple back button that sits in the top left of every inner page
export default function BackButton({ to }) {
  const navigate = useNavigate()

  function handleClick() {
    if (to) navigate(to)
    else navigate(-1)
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Go back"
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 26,
        color: '#222',
        lineHeight: 1,
        padding: '4px 8px',
        borderRadius: 6,
        transition: 'background 0.15s',
        zIndex: 10,
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
      onMouseLeave={e => e.currentTarget.style.background = 'none'}
    >
      ‹
    </button>
  )
}
