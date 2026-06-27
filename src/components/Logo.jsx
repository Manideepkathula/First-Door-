export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="34" height="34" rx="10" fill="#1d1d1f"/>
      {/* Door shape */}
      <rect x="9" y="12" width="16" height="16" rx="2" fill="none" stroke="#f5f5f7" strokeWidth="1.5"/>
      {/* Door frame top arch */}
      <path d="M9 14 Q17 8 25 14" stroke="#e8935a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Door handle */}
      <circle cx="21" cy="21" r="1.2" fill="#e8935a"/>
      {/* Step */}
      <rect x="13" y="28" width="8" height="2" rx="1" fill="#f5f5f7" opacity="0.5"/>
    </svg>
  )
}
