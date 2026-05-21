// the little 4-pointed sparkle i use as a decorative accent throughout the app
export default function SparkleIcon({ size = 16, color = '#333' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 1 L12.2 9.8 L21 11 L12.2 12.2 L11 21 L9.8 12.2 L1 11 L9.8 9.8 Z"
        fill={color}
      />
    </svg>
  )
}
