"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useStore } from "@/store/useStore"
import { Button } from "@/components/ui/button"
import { Plus, LogOut } from "lucide-react"
import { AddHabitDialog } from "@/components/AddHabitDialog"
import { HabitCard } from "@/components/HabitCard"

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const { habits, setHabits, checkIns, setCheckIns } = useStore()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/")
        return
      }

      await loadHabits()
      setLoading(false)
    }
    checkAuth()
  }, [router])

  const loadHabits = async () => {
    const { data: habitsData } = await supabase
      .from("habits")
      .select("*")
      .order("created_at", { ascending: false })

    if (habitsData) {
      setHabits(habitsData)

      for (const habit of habitsData) {
        const { data: checkInsData } = await supabase
          .from("checkins")
          .select("*")
          .eq("habit_id", habit.id)

        if (checkInsData) {
          setCheckIns(habit.id, checkInsData)
        }
      }
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#2a2d3a] p-6 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              {habits.length} HABIT{habits.length !== 1 ? 'S' : ''}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddDialog(true)}
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="text-gray-400 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {habits.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No habits yet. Click + to add your first habit!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                checkIns={checkIns[habit.id] || []}
                onUpdate={loadHabits}
              />
            ))}
          </div>
        )}
      </div>

      <AddHabitDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={() => {
          loadHabits()
          setShowAddDialog(false)
        }}
      />
    </div>
  )
}
