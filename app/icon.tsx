import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {/* 4x4 grid pattern - same as HabitGridLogo */}
          {/* Top row */}
          <rect x="2" y="2" width="4" height="4" rx="1" fill="white" opacity="0.3" />
          <rect x="7" y="2" width="4" height="4" rx="1" fill="white" opacity="0.6" />
          <rect x="12" y="2" width="4" height="4" rx="1" fill="white" />
          <rect x="17" y="2" width="4" height="4" rx="1" fill="white" opacity="0.4" />

          {/* Second row */}
          <rect x="2" y="7" width="4" height="4" rx="1" fill="white" opacity="0.8" />
          <rect x="7" y="7" width="4" height="4" rx="1" fill="white" />
          <rect x="12" y="7" width="4" height="4" rx="1" fill="white" opacity="0.5" />
          <rect x="17" y="7" width="4" height="4" rx="1" fill="white" opacity="0.7" />

          {/* Third row */}
          <rect x="2" y="12" width="4" height="4" rx="1" fill="white" opacity="0.4" />
          <rect x="7" y="12" width="4" height="4" rx="1" fill="white" opacity="0.9" />
          <rect x="12" y="12" width="4" height="4" rx="1" fill="white" opacity="0.6" />
          <rect x="17" y="12" width="4" height="4" rx="1" fill="white" />

          {/* Bottom row */}
          <rect x="2" y="17" width="4" height="4" rx="1" fill="white" />
          <rect x="7" y="17" width="4" height="4" rx="1" fill="white" opacity="0.5" />
          <rect x="12" y="17" width="4" height="4" rx="1" fill="white" opacity="0.8" />
          <rect x="17" y="17" width="4" height="4" rx="1" fill="white" opacity="0.3" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
