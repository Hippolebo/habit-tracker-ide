import { getNextMilestone, type MilestoneType } from "@/lib/milestones"

interface MilestoneProgressProps {
  currentValue: number
  milestoneType: MilestoneType
}

export function MilestoneProgress({ currentValue, milestoneType }: MilestoneProgressProps) {
  const nextMilestone = getNextMilestone(currentValue, milestoneType)

  if (!nextMilestone) return null

  const progress = (currentValue / nextMilestone.requirement) * 100
  const remaining = nextMilestone.requirement - currentValue

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">
          Next: {nextMilestone.emoji} {nextMilestone.title}
        </span>
        <span className="text-gray-500">
          {remaining} to go
        </span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  )
}
