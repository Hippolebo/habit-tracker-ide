"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { HabitGridDemo } from "@/components/HabitGridDemo"
import { HabitGridLogo } from "@/components/HabitGridLogo"

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push("/dashboard")
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white animate-fade-in">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-2">
            <HabitGridLogo className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold">HabitGrid</h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/auth")}
            className="text-gray-400 hover:text-white"
          >
            Sign In
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            Build better habits,
            <br />
            <span className="text-gray-400">one day at a time</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Track your yearly habits with a beautiful 52-week grid. See your progress, maintain streaks, and build consistency.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => router.push("/auth")}
              className="text-base px-8"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/auth")}
              className="text-base px-8"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Demo Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">Your year at a glance</h3>
            <p className="text-gray-400">
              Every check-in appears as a green square. Watch your progress grow over time.
            </p>
          </div>

          <div className="flex justify-center">
            <HabitGridDemo />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="space-y-2">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-xl font-semibold">Track Your Streaks</h4>
            <p className="text-gray-400">
              See your current and longest streaks. Build momentum with consistent daily habits.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl mb-4">📅</div>
            <h4 className="text-xl font-semibold">52-Week Visualization</h4>
            <p className="text-gray-400">
              Beautiful year-long heatmap shows your entire habit history at a glance.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl mb-4">📈</div>
            <h4 className="text-xl font-semibold">Consistency Metrics</h4>
            <p className="text-gray-400">
              Track your consistency percentage and total check-ins for each habit.
            </p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="text-center mt-24 py-16 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent rounded-lg">
          <h3 className="text-3xl font-bold mb-4">Help me make this app better</h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            HabitGrid is in beta. Your feedback is incredibly valuable and will directly shape the future of this app.
          </p>
          <Button
            size="lg"
            asChild
            className="text-base px-8"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfZRyYNFkEu1iL-KZg3mOxw6r-Zhskn7xRC9c-Qh8Xsweh3NA/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share Your Feedback
            </a>
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-24 pt-12 border-t border-gray-800 space-y-3">
          <p className="text-gray-400 text-sm">
            HabitGrid - Track your yearly habits with beautiful visualizations
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfZRyYNFkEu1iL-KZg3mOxw6r-Zhskn7xRC9c-Qh8Xsweh3NA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 underline"
            >
              Feedback
            </a>
            <span>•</span>
            <button
              onClick={() => router.push("/privacy")}
              className="hover:text-gray-300 underline"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
