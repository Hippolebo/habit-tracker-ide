"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function HabitGridDemo() {
  // Generate a demo 52-week grid with realistic check-ins
  const weeks = 52
  const daysPerWeek = 7

  // Create a realistic pattern with varied streaks and missed days
  // Pattern: streak of 5, miss 2, streak of 8, miss 1, streak of 4, miss 3, etc.
  const streakPattern = [
    { checked: 5, missed: 2 },
    { checked: 8, missed: 1 },
    { checked: 4, missed: 3 },
    { checked: 10, missed: 1 },
    { checked: 6, missed: 2 },
    { checked: 3, missed: 4 },
    { checked: 12, missed: 1 },
    { checked: 7, missed: 2 },
    { checked: 5, missed: 3 },
    { checked: 9, missed: 1 },
    { checked: 4, missed: 2 },
    { checked: 11, missed: 2 },
    { checked: 6, missed: 1 },
    { checked: 8, missed: 3 },
    { checked: 7, missed: 1 },
    { checked: 5, missed: 2 },
    { checked: 10, missed: 2 },
    { checked: 6, missed: 1 },
    { checked: 4, missed: 3 },
    { checked: 9, missed: 1 },
  ]

  const checkInPattern: boolean[] = []
  let patternIndex = 0
  while (checkInPattern.length < 40 * 7) {
    const current = streakPattern[patternIndex % streakPattern.length]
    // Add checked days
    for (let i = 0; i < current.checked && checkInPattern.length < 40 * 7; i++) {
      checkInPattern.push(true)
    }
    // Add missed days
    for (let i = 0; i < current.missed && checkInPattern.length < 40 * 7; i++) {
      checkInPattern.push(false)
    }
    patternIndex++
  }

  // Generate grid data
  const gridData: boolean[][] = []
  for (let week = 0; week < weeks; week++) {
    const weekDays: boolean[] = []
    for (let day = 0; day < daysPerWeek; day++) {
      // Only show data for the first ~40 weeks (to simulate current progress)
      if (week < 40) {
        const patternIndex = week * 7 + day
        weekDays.push(checkInPattern[patternIndex] || false)
      } else {
        // Future weeks are "day off" (not started yet)
        weekDays.push(false)
      }
    }
    gridData.push(weekDays)
  }

  const monthLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]

  return (
    <Card className="overflow-hidden bg-[#353847] border-none max-w-2xl">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏃</span>
            <h3 className="font-medium text-base text-gray-200">Morning Run</h3>
          </div>
          <div className="h-8 w-8 rounded border-2 flex items-center justify-center bg-green-500 border-green-500">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center py-4">
          <div>
            <p className="text-3xl font-bold text-white">23</p>
            <p className="text-xs text-gray-400 mt-1">Streak</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">78<span className="text-xl">%</span></p>
            <p className="text-xs text-gray-400 mt-1">Consistency</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">186</p>
            <p className="text-xs text-gray-400 mt-1">Check-ins</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between px-8 text-xs text-gray-400">
            {monthLabels.filter((_, i) => i % 2 === 0).map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>

          <div className="flex space-x-1">
            <div className="flex flex-col justify-around text-[10px] text-gray-400 pr-1">
              <span>M</span>
              <span>W</span>
              <span>F</span>
              <span>S</span>
            </div>

            <div className="flex space-x-[2px] overflow-x-auto">
              {gridData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col space-y-[2px]">
                  {week.map((isChecked, dayIndex) => {
                    let bgColor = "bg-[#2a2d3a]" // Day off / future

                    if (weekIndex < 40) {
                      // Past weeks
                      if (isChecked) {
                        bgColor = "bg-green-500" // Checked
                      } else {
                        bgColor = "bg-[#5a4a4a]" // Missed
                      }
                    }

                    return (
                      <div
                        key={dayIndex}
                        className={cn("w-2 h-2 rounded-[1px]", bgColor)}
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
