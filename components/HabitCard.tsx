"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import {
  getYearWeeks,
  getMonthLabels,
  formatDate,
  calculateStreak,
  calculateConsistency,
} from "@/lib/date-utils"
import { cn } from "@/lib/utils"
import { parseISO } from "date-fns"
import type { Habit, CheckIn } from "@/lib/supabase"

interface HabitCardProps {
  habit: Habit
  checkIns: CheckIn[]
  onUpdate: () => void
}

export function HabitCard({ habit, checkIns, onUpdate }: HabitCardProps) {
  const [loading, setLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const habitCheckIns = checkIns || []
  const checkInDates = new Set(habitCheckIns.map((c) => c.date))

  const startDate = new Date(new Date().getFullYear(), 3, 1) // April
  const weeks = getYearWeeks(startDate)
  const monthLabels = getMonthLabels(startDate)

  const currentStreak = calculateStreak(habitCheckIns.map((c) => c.date))
  const totalCheckIns = habitCheckIns.length
  const consistency = calculateConsistency(
    habitCheckIns.map((c) => c.date),
    parseISO(habit.created_at)
  )

  const handleCheckInToday = async () => {
    setLoading(true)
    const today = new Date()
    const todayStr = formatDate(today)

    const existingCheckIn = habitCheckIns.find((c) => c.date === todayStr)

    if (existingCheckIn) {
      const { error } = await supabase
        .from("checkins")
        .delete()
        .eq("id", existingCheckIn.id)

      if (!error) {
        onUpdate()
      }
    } else {
      const { error } = await supabase
        .from("checkins")
        .insert([
          {
            habit_id: habit.id,
            date: todayStr,
          },
        ])

      if (!error) {
        onUpdate()
      }
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${habit.name}"?`)) return

    await supabase.from("habits").delete().eq("id", habit.id)
    onUpdate()
  }

  const isTodayChecked = checkInDates.has(formatDate(new Date()))

  return (
    <Card className="overflow-hidden bg-[#353847] border-none">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMenu(!showMenu)}
              className="h-6 w-6 text-gray-400 hover:text-white hover:bg-transparent"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
            <span className="text-2xl">{habit.emoji}</span>
            <h3 className="font-medium text-base text-gray-200">{habit.name}</h3>
          </div>
          <button
            onClick={handleCheckInToday}
            disabled={loading}
            className={cn(
              "h-8 w-8 rounded border-2 flex items-center justify-center transition-all",
              isTodayChecked
                ? "bg-green-500 border-green-500"
                : "bg-transparent border-gray-500 hover:border-gray-400"
            )}
          >
            {isTodayChecked && (
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>

        {showMenu && (
          <div className="bg-[#2a2d3a] rounded p-2">
            <button
              onClick={handleDelete}
              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-950 rounded"
            >
              Delete Habit
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 text-center py-4">
          <div>
            <p className="text-3xl font-bold text-white">{currentStreak}</p>
            <p className="text-xs text-gray-400 mt-1">Streak</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{consistency}<span className="text-xl">%</span></p>
            <p className="text-xs text-gray-400 mt-1">Consistency</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{totalCheckIns}</p>
            <p className="text-xs text-gray-400 mt-1">Check-ins</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between px-8 text-xs text-gray-400">
            {monthLabels.filter((_, i) => i % 2 === 0).map((label, i) => (
              <span key={i}>{label.month}</span>
            ))}
          </div>

          <div className="flex space-x-1">
            <div className="flex flex-col justify-around text-[10px] text-gray-400 pr-1">
              <span>M</span>
              <span>W</span>
              <span>F</span>
              <span>S</span>
            </div>

            <div className="flex space-x-[2px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col space-y-[2px]">
                  {week.map((day, dayIndex) => {
                    const dateStr = formatDate(day)
                    const isChecked = checkInDates.has(dateStr)
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const dayTime = new Date(day)
                    dayTime.setHours(0, 0, 0, 0)
                    const habitCreationDate = new Date(habit.created_at)
                    habitCreationDate.setHours(0, 0, 0, 0)
                    const isPast = dayTime < today
                    const isBeforeHabitCreation = dayTime < habitCreationDate

                    let bgColor = "bg-[#2a2d3a]"
                    if (isChecked) {
                      bgColor = "bg-green-500"
                    } else if (isPast && !isBeforeHabitCreation) {
                      bgColor = "bg-[#5a4a4a]"
                    }

                    return (
                      <div
                        key={dayIndex}
                        className={cn("w-2 h-2 rounded-[1px]", bgColor)}
                        title={dateStr}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400 pt-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-[1px]" />
              <span>Check-in</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#5a4a4a] rounded-[1px]" />
              <span>Miss</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-600 rounded-[1px]" />
              <span>Day off</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
