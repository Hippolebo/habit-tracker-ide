export type MilestoneType = 'streak' | 'total_checkins' | 'consistency' | 'habit_count'

export interface Milestone {
  id: string
  type: MilestoneType
  title: string
  description: string
  requirement: number
  emoji: string
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
}

export const MILESTONES: Milestone[] = [
  // Streak Milestones
  {
    id: 'streak_7',
    type: 'streak',
    title: '7-Day Streak',
    description: 'Complete a habit for 7 days in a row',
    requirement: 7,
    emoji: '🔥',
    tier: 'bronze'
  },
  {
    id: 'streak_30',
    type: 'streak',
    title: '30-Day Streak',
    description: 'Complete a habit for 30 days in a row',
    requirement: 30,
    emoji: '💪',
    tier: 'silver'
  },
  {
    id: 'streak_100',
    type: 'streak',
    title: '100-Day Streak',
    description: 'Complete a habit for 100 days in a row',
    requirement: 100,
    emoji: '🏆',
    tier: 'gold'
  },
  {
    id: 'streak_365',
    type: 'streak',
    title: 'Year Streak',
    description: 'Complete a habit for 365 days in a row',
    requirement: 365,
    emoji: '👑',
    tier: 'diamond'
  },
  // Total Check-ins Milestones
  {
    id: 'checkins_50',
    type: 'total_checkins',
    title: '50 Check-ins',
    description: 'Reach 50 total check-ins',
    requirement: 50,
    emoji: '✨',
    tier: 'bronze'
  },
  {
    id: 'checkins_100',
    type: 'total_checkins',
    title: '100 Check-ins',
    description: 'Reach 100 total check-ins',
    requirement: 100,
    emoji: '⭐',
    tier: 'silver'
  },
  {
    id: 'checkins_500',
    type: 'total_checkins',
    title: '500 Check-ins',
    description: 'Reach 500 total check-ins',
    requirement: 500,
    emoji: '🌟',
    tier: 'gold'
  },
  {
    id: 'checkins_1000',
    type: 'total_checkins',
    title: '1000 Check-ins',
    description: 'Reach 1000 total check-ins',
    requirement: 1000,
    emoji: '💫',
    tier: 'platinum'
  },
  // Consistency Milestones
  {
    id: 'consistency_50',
    type: 'consistency',
    title: '50% Consistency',
    description: 'Maintain 50% consistency',
    requirement: 50,
    emoji: '📈',
    tier: 'bronze'
  },
  {
    id: 'consistency_75',
    type: 'consistency',
    title: '75% Consistency',
    description: 'Maintain 75% consistency',
    requirement: 75,
    emoji: '📊',
    tier: 'silver'
  },
  {
    id: 'consistency_90',
    type: 'consistency',
    title: '90% Consistency',
    description: 'Maintain 90% consistency',
    requirement: 90,
    emoji: '🎯',
    tier: 'gold'
  },
  {
    id: 'consistency_95',
    type: 'consistency',
    title: '95% Consistency',
    description: 'Maintain 95% consistency',
    requirement: 95,
    emoji: '💎',
    tier: 'platinum'
  },
  // Habit Count Milestones
  {
    id: 'habits_3',
    type: 'habit_count',
    title: '3 Habits',
    description: 'Track 3 different habits',
    requirement: 3,
    emoji: '🌱',
    tier: 'bronze'
  },
  {
    id: 'habits_5',
    type: 'habit_count',
    title: '5 Habits',
    description: 'Track 5 different habits',
    requirement: 5,
    emoji: '🌿',
    tier: 'silver'
  },
  {
    id: 'habits_10',
    type: 'habit_count',
    title: '10 Habits',
    description: 'Track 10 different habits',
    requirement: 10,
    emoji: '🌳',
    tier: 'gold'
  },
]

export interface Achievement {
  milestoneId: string
  habitId?: string // For habit-specific achievements like streaks
  unlockedAt: Date
}

export function calculateAchievements(
  habits: any[],
  checkIns: Record<string, any[]>
): Achievement[] {
  const achievements: Achievement[] = []
  const now = new Date()

  // Calculate streak milestones for each habit
  habits.forEach(habit => {
    const habitCheckIns = checkIns[habit.id] || []
    const streak = calculateStreak(habitCheckIns.map(c => c.date))

    MILESTONES.filter(m => m.type === 'streak').forEach(milestone => {
      if (streak >= milestone.requirement) {
        achievements.push({
          milestoneId: milestone.id,
          habitId: habit.id,
          unlockedAt: now
        })
      }
    })
  })

  // Calculate total check-ins across all habits
  const totalCheckIns = Object.values(checkIns).reduce((sum, habitCheckins) =>
    sum + habitCheckins.length, 0
  )

  MILESTONES.filter(m => m.type === 'total_checkins').forEach(milestone => {
    if (totalCheckIns >= milestone.requirement) {
      achievements.push({
        milestoneId: milestone.id,
        unlockedAt: now
      })
    }
  })

  // Calculate consistency milestones for each habit
  habits.forEach(habit => {
    const habitCheckIns = checkIns[habit.id] || []
    const consistency = calculateConsistency(
      habitCheckIns.map(c => c.date),
      new Date(habit.created_at)
    )

    MILESTONES.filter(m => m.type === 'consistency').forEach(milestone => {
      if (consistency >= milestone.requirement) {
        achievements.push({
          milestoneId: milestone.id,
          habitId: habit.id,
          unlockedAt: now
        })
      }
    })
  })

  // Calculate habit count milestone
  const habitCount = habits.length

  MILESTONES.filter(m => m.type === 'habit_count').forEach(milestone => {
    if (habitCount >= milestone.requirement) {
      achievements.push({
        milestoneId: milestone.id,
        unlockedAt: now
      })
    }
  })

  return achievements
}

export function getNextMilestone(
  currentValue: number,
  milestoneType: MilestoneType
): Milestone | null {
  const typeMilestones = MILESTONES.filter(m => m.type === milestoneType)
    .sort((a, b) => a.requirement - b.requirement)

  return typeMilestones.find(m => m.requirement > currentValue) || null
}

// Helper functions (assuming these exist in date-utils)
function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0

  const sortedDates = dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let streak = 0
  let currentDate = new Date(today)

  for (const dateStr of sortedDates) {
    const checkDate = new Date(dateStr)
    checkDate.setHours(0, 0, 0, 0)

    if (checkDate.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else if (checkDate.getTime() < currentDate.getTime()) {
      break
    }
  }

  return streak
}

function calculateConsistency(dates: string[], createdAt: Date): number {
  if (dates.length === 0) return 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(createdAt)
  start.setHours(0, 0, 0, 0)

  const daysSinceCreation = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

  if (daysSinceCreation <= 0) return 0

  return Math.round((dates.length / daysSinceCreation) * 100)
}
