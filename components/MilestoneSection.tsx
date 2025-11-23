"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MILESTONES, calculateAchievements, getNextMilestone, type Milestone } from "@/lib/milestones"
import { MilestoneBadge } from "@/components/MilestoneBadge"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MilestoneSectionProps {
  habits: any[]
  checkIns: Record<string, any[]>
}

export function MilestoneSection({ habits, checkIns }: MilestoneSectionProps) {
  const [expanded, setExpanded] = useState(false)

  const achievements = calculateAchievements(habits, checkIns)
  const unlockedIds = new Set(achievements.map(a => a.milestoneId))

  // Group milestones by type
  const milestoneGroups = {
    streak: MILESTONES.filter(m => m.type === 'streak'),
    total_checkins: MILESTONES.filter(m => m.type === 'total_checkins'),
    consistency: MILESTONES.filter(m => m.type === 'consistency'),
    habit_count: MILESTONES.filter(m => m.type === 'habit_count')
  }

  const unlockedCount = unlockedIds.size
  const totalCount = MILESTONES.length

  return (
    <Card className="bg-[#353847] border-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Achievements</CardTitle>
            <p className="text-sm text-gray-400 mt-1">
              {unlockedCount} of {totalCount} unlocked
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-white"
          >
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!expanded ? (
          // Show recently unlocked badges
          <div className="flex flex-wrap gap-4">
            {MILESTONES.slice(0, 6).map(milestone => (
              <MilestoneBadge
                key={milestone.id}
                milestone={milestone}
                unlocked={unlockedIds.has(milestone.id)}
                size="sm"
                showTitle={false}
              />
            ))}
            {MILESTONES.length > 6 && (
              <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-xs text-gray-400">
                +{MILESTONES.length - 6}
              </div>
            )}
          </div>
        ) : (
          // Show all milestones grouped
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Streaks 🔥
              </h3>
              <div className="flex flex-wrap gap-4">
                {milestoneGroups.streak.map(milestone => (
                  <MilestoneBadge
                    key={milestone.id}
                    milestone={milestone}
                    unlocked={unlockedIds.has(milestone.id)}
                    size="md"
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Total Check-ins ✨
              </h3>
              <div className="flex flex-wrap gap-4">
                {milestoneGroups.total_checkins.map(milestone => (
                  <MilestoneBadge
                    key={milestone.id}
                    milestone={milestone}
                    unlocked={unlockedIds.has(milestone.id)}
                    size="md"
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Consistency 📈
              </h3>
              <div className="flex flex-wrap gap-4">
                {milestoneGroups.consistency.map(milestone => (
                  <MilestoneBadge
                    key={milestone.id}
                    milestone={milestone}
                    unlocked={unlockedIds.has(milestone.id)}
                    size="md"
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Multiple Habits 🌱
              </h3>
              <div className="flex flex-wrap gap-4">
                {milestoneGroups.habit_count.map(milestone => (
                  <MilestoneBadge
                    key={milestone.id}
                    milestone={milestone}
                    unlocked={unlockedIds.has(milestone.id)}
                    size="md"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
