import { Milestone } from "@/lib/milestones"
import { cn } from "@/lib/utils"

interface MilestoneBadgeProps {
  milestone: Milestone
  unlocked: boolean
  size?: 'sm' | 'md' | 'lg'
  showTitle?: boolean
}

const tierColors = {
  bronze: 'bg-amber-900 border-amber-700 text-amber-200',
  silver: 'bg-gray-700 border-gray-500 text-gray-200',
  gold: 'bg-yellow-600 border-yellow-500 text-yellow-100',
  platinum: 'bg-cyan-700 border-cyan-500 text-cyan-100',
  diamond: 'bg-purple-700 border-purple-500 text-purple-100'
}

const tierColorsLocked = {
  bronze: 'bg-gray-900 border-gray-800 text-gray-600',
  silver: 'bg-gray-900 border-gray-800 text-gray-600',
  gold: 'bg-gray-900 border-gray-800 text-gray-600',
  platinum: 'bg-gray-900 border-gray-800 text-gray-600',
  diamond: 'bg-gray-900 border-gray-800 text-gray-600'
}

export function MilestoneBadge({ milestone, unlocked, size = 'md', showTitle = true }: MilestoneBadgeProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl'
  }

  const colorClass = unlocked ? tierColors[milestone.tier] : tierColorsLocked[milestone.tier]

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={cn(
          'rounded-full border-2 flex items-center justify-center transition-all',
          sizeClasses[size],
          colorClass,
          !unlocked && 'opacity-40 grayscale'
        )}
        title={milestone.description}
      >
        <span>{milestone.emoji}</span>
      </div>
      {showTitle && (
        <div className="text-center">
          <p className={cn(
            'text-xs font-medium',
            unlocked ? 'text-white' : 'text-gray-500'
          )}>
            {milestone.title}
          </p>
        </div>
      )}
    </div>
  )
}
