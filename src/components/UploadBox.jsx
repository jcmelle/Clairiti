import { useState, useRef } from 'react'

// drag and drop upload area — supports multiple image files
export default function UploadBox({ onFilesChange }) {
  const [previews, setPreviews] = useState([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  function handleFiles(newFiles) {
    const images = Array.from(newFiles).filter(f => f.type.startsWith('image/'))
    if (!images.length) return

    const urls = images.map(f => ({ url: URL.createObjectURL(f), name: f.name }))
    setPreviews(prev => [...prev, ...urls])
    onFilesChange?.(images)
  }

  function removePreview(index) {
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  function onInputChange(e) {
    handleFiles(e.target.files)
    e.target.value = '' // reset so the same file can be re-added if removed
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div>
      {/* the drop zone itself */}
      <div
        className={`upload-box ${dragging ? 'drag-over' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current.click()}
      >
        {/* hidden file input — always present for keyboard/non-drag access */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onInputChange}
          aria-label="upload screenshots"
          style={{ display: 'none' }}
        />

        <svg
          width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke="#999" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>

        <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
          Drag and drop your screenshots here
        </p>

        <button
          className="btn-pill-sm"
          onClick={e => { e.stopPropagation(); inputRef.current.click() }}
        >
          Choose files
        </button>
      </div>

      {/* preview thumbnails grid */}
      {previews.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: 10,
            marginTop: 14,
          }}
        >
          {previews.map((p, i) => (
            <div
              key={i}
              style={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}
            >
              <img
                src={p.url}
                alt={`screenshot ${i + 1}`}
                style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }}
              />
              {/* remove button on each thumbnail */}
              <button
                onClick={() => removePreview(i)}
                aria-label={`remove screenshot ${i + 1}`}
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  background: 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  fontSize: 13,
                  lineHeight: 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
