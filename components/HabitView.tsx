"use client"

import { useStore } from "@/store/useStore"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import {
  getYearWeeks,
  getMonthLabels,
  formatDate,
  isToday,
  calculateStreak,
  calculateLongestStreak,
  calculateConsistency,
} from "@/lib/date-utils"
import { cn } from "@/lib/utils"
import { parseISO } from "date-fns"

export function HabitView() {
  const { habits, selectedHabitId, setSelectedHabitId, checkIns, addCheckIn, removeCheckIn, setCheckIns } = useStore()

  const habit = habits.find((h) => h.id === selectedHabitId)
  if (!habit) return null

  const habitCheckIns = checkIns[habit.id] || []
  const checkInDates = new Set(habitCheckIns.map((c) => c.date))

  const startDate = new Date(new Date().getFullYear(), 2, 1)
  const weeks = getYearWeeks(startDate)
  const monthLabels = getMonthLabels(startDate)

  const currentStreak = calculateStreak(habitCheckIns.map((c) => c.date))
  const longestStreak = calculateLongestStreak(habitCheckIns.map((c) => c.date))
  const totalCheckIns = habitCheckIns.length
  const consistency = calculateConsistency(
    habitCheckIns.map((c) => c.date),
    parseISO(habit.created_at)
  )

  const handleCheckInToday = async () => {
    const today = new Date()
    const todayStr = formatDate(today)

    const existingCheckIn = habitCheckIns.find((c) => c.date === todayStr)

    if (existingCheckIn) {
      // Uncheck today
      const { error } = await supabase
        .from("checkins")
        .delete()
        .eq("id", existingCheckIn.id)

      if (!error) {
        const updatedCheckIns = habitCheckIns.filter((c) => c.id !== existingCheckIn.id)
        setCheckIns(habit.id, updatedCheckIns)
      }
    } else {
      // Check in today
      const { data, error } = await supabase
        .from("checkins")
        .insert([
          {
            habit_id: habit.id,
            date: todayStr,
          },
        ])
        .select()
        .single()

      if (!error && data) {
        addCheckIn(data)
      }
    }
  }

  const isTodayChecked = checkInDates.has(formatDate(new Date()))

  return (
    <div className="min-h-screen bg-black animate-fade-in">
      <div className="sticky top-0 z-10 bg-black border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedHabitId(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{habit.emoji}</span>
            <h1 className="text-xl font-bold">{habit.name}</h1>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Current Streak</p>
              <p className="text-2xl font-bold">{currentStreak} days</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Longest Streak</p>
              <p className="text-2xl font-bold">{longestStreak} days</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total Check-ins</p>
              <p className="text-2xl font-bold">{totalCheckIns}</p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Consistency</p>
              <p className="text-2xl font-bold">{consistency}%</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleCheckInToday}
              size="lg"
              className={cn(
                "w-full h-16 text-lg font-semibold transition-all",
                isTodayChecked
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              )}
            >
              {isTodayChecked ? "✓ Checked in today!" : "Check in for today"}
            </Button>

            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
              <div className="mb-4 flex space-x-2 text-xs text-gray-400">
                {monthLabels.map((label, i) => (
                  <div
                    key={i}
                    style={{ marginLeft: i === 0 ? "0" : `${label.weekIndex * 14}px` }}
                    className="font-medium"
                  >
                    {label.month}
                  </div>
                ))}
              </div>

              <div className="flex space-x-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col space-y-1">
                    {week.map((day, dayIndex) => {
                      const dateStr = formatDate(day)
                      const isChecked = checkInDates.has(dateStr)
                      const isTodayDate = isToday(day)
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      const dayTime = new Date(day)
                      dayTime.setHours(0, 0, 0, 0)
                      const habitCreationDate = new Date(habit.created_at)
                      habitCreationDate.setHours(0, 0, 0, 0)
                      const isPast = dayTime < today
                      const isFuture = dayTime > today
                      const isBeforeHabitCreation = dayTime < habitCreationDate

                      let bgColor = "bg-black"
                      if (isChecked) {
                        bgColor = "bg-green-600"
                      } else if (isPast && !isBeforeHabitCreation) {
                        // Only show red for days that were missed AFTER the habit was created
                        bgColor = "bg-red-600"
                      } else if (isFuture || isBeforeHabitCreation) {
                        bgColor = "bg-black"
                      }

                      return (
                        <div
                          key={dayIndex}
                          className={cn(
                            "w-3 h-3 rounded-sm",
                            bgColor,
                            isTodayDate && "ring-2 ring-white ring-offset-2 ring-offset-black"
                          )}
                          title={dateStr}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-600 rounded-sm" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-600 rounded-sm" />
                  <span>Missed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <Button
            variant="outline"
            onClick={() => setSelectedHabitId(null)}
            className="w-full max-w-xs"
          >
            Back to Habits
          </Button>
        </div>
      </div>
    </div>
  )
}
