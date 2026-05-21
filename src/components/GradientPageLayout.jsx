// wraps every page with the gradient background and optional corner decorations
export default function GradientPageLayout({
  gradientClass = 'grad-landing',
  showCorners = true,
  children,
}) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
      className={gradientClass}
    >
      {showCorners && (
        <>
          <div className="corner-tl" aria-hidden="true" />
          <div className="corner-br" aria-hidden="true" />
        </>
      )}
      {children}
    </div>
  )
}
