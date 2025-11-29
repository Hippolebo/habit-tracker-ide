import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HabitGrid - Track Your Yearly Habits with Beautiful Visualizations",
  description: "Free habit tracker with 52-week yearly heatmap. Track your habits, maintain streaks, and visualize your progress. Simple, private, and beautiful.",
  keywords: [
    "habit tracker",
    "habit tracking app",
    "yearly habit tracker",
    "habit heatmap",
    "streak tracker",
    "consistency tracker",
    "free habit tracker",
    "github style habit tracker",
    "52 week habit tracker",
    "habit visualization",
    "daily habits",
    "build habits",
    "productivity app"
  ],
  authors: [{ name: "HabitGrid" }],
  creator: "HabitGrid",
  publisher: "HabitGrid",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.habitgrid.eu'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "HabitGrid - Track Your Yearly Habits",
    description: "Free habit tracker with 52-week yearly heatmap. Track your habits, maintain streaks, and visualize your progress.",
    url: 'https://www.habitgrid.eu',
    siteName: 'HabitGrid',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HabitGrid - Yearly Habit Tracker',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "HabitGrid - Track Your Yearly Habits",
    description: "Free habit tracker with 52-week yearly heatmap. Track your habits, maintain streaks, and visualize your progress.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'HabitGrid',
    description: 'Free habit tracker with 52-week yearly heatmap. Track your habits, maintain streaks, and visualize your progress.',
    url: 'https://www.habitgrid.eu',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Yearly habit heatmap visualization',
      'Streak tracking',
      'Multiple habit support',
      'Real-time statistics',
      'Mobile-friendly interface',
      'Private and secure'
    ],
    screenshot: 'https://www.habitgrid.eu/og-image.png',
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
