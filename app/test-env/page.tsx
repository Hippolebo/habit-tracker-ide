'use client'

export default function TestEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Environment Variables Test</h1>
      <div style={{ marginTop: '20px' }}>
        <h2>NEXT_PUBLIC_SUPABASE_URL:</h2>
        <p style={{ color: supabaseUrl ? 'green' : 'red' }}>
          {supabaseUrl || '❌ NOT FOUND'}
        </p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>NEXT_PUBLIC_SUPABASE_ANON_KEY:</h2>
        <p style={{ color: supabaseKey ? 'green' : 'red' }}>
          {supabaseKey ? `✅ FOUND (${supabaseKey.substring(0, 20)}...)` : '❌ NOT FOUND'}
        </p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Status:</h2>
        <p style={{ color: (supabaseUrl && supabaseKey) ? 'green' : 'red', fontSize: '24px' }}>
          {(supabaseUrl && supabaseKey)
            ? '✅ Environment variables are loaded correctly!'
            : '❌ Environment variables are MISSING!'}
        </p>
      </div>
    </div>
  )
}
