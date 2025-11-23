export function HabitGridLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 4x4 grid of squares */}
      {/* Top row */}
      <rect x="2" y="2" width="4" height="4" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="7" y="2" width="4" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="12" y="2" width="4" height="4" rx="1" fill="currentColor" />
      <rect x="17" y="2" width="4" height="4" rx="1" fill="currentColor" opacity="0.4" />

      {/* Second row */}
      <rect x="2" y="7" width="4" height="4" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="7" y="7" width="4" height="4" rx="1" fill="currentColor" />
      <rect x="12" y="7" width="4" height="4" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="17" y="7" width="4" height="4" rx="1" fill="currentColor" opacity="0.7" />

      {/* Third row */}
      <rect x="2" y="12" width="4" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="7" y="12" width="4" height="4" rx="1" fill="currentColor" opacity="0.9" />
      <rect x="12" y="12" width="4" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="17" y="12" width="4" height="4" rx="1" fill="currentColor" />

      {/* Bottom row */}
      <rect x="2" y="17" width="4" height="4" rx="1" fill="currentColor" />
      <rect x="7" y="17" width="4" height="4" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="12" y="17" width="4" height="4" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="17" y="17" width="4" height="4" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  )
}
