import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addWeeks,
  startOfMonth,
  isSameDay,
  parseISO,
  differenceInDays
} from 'date-fns'

export function getYearWeeks(startDate: Date): Date[][] {
  const weeks: Date[][] = []
  let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 1 })

  for (let i = 0; i < 52; i++) {
    const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 })
    const days = eachDayOfInterval({ start: currentWeekStart, end: weekEnd })
    weeks.push(days)
    currentWeekStart = addWeeks(currentWeekStart, 1)
  }

  return weeks
}

export function getMonthLabels(startDate: Date): Array<{ month: string; weekIndex: number }> {
  const labels: Array<{ month: string; weekIndex: number }> = []
  const weeks = getYearWeeks(startDate)

  let lastMonth = ''
  weeks.forEach((week, index) => {
    const monthName = format(week[0], 'MMM yyyy')
    if (monthName !== lastMonth) {
      labels.push({ month: monthName, weekIndex: index })
      lastMonth = monthName
    }
  })

  return labels
}

export function calculateStreak(checkIns: string[], endDate: Date = new Date()): number {
  if (checkIns.length === 0) return 0

  const sortedDates = checkIns
    .map(d => parseISO(d))
    .sort((a, b) => b.getTime() - a.getTime())

  let streak = 0
  let currentDate = endDate

  for (const checkInDate of sortedDates) {
    const daysDiff = differenceInDays(currentDate, checkInDate)

    if (daysDiff === 0) {
      streak++
      currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
    } else if (daysDiff === 1) {
      streak++
      currentDate = checkInDate
    } else {
      break
    }
  }

  return streak
}

export function calculateLongestStreak(checkIns: string[]): number {
  if (checkIns.length === 0) return 0

  const sortedDates = checkIns
    .map(d => parseISO(d))
    .sort((a, b) => a.getTime() - b.getTime())

  let longestStreak = 1
  let currentStreak = 1

  for (let i = 1; i < sortedDates.length; i++) {
    const daysDiff = differenceInDays(sortedDates[i], sortedDates[i - 1])

    if (daysDiff === 1) {
      currentStreak++
      longestStreak = Math.max(longestStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }

  return longestStreak
}

export function calculateConsistency(checkIns: string[], startDate: Date): number {
  const today = new Date()
  const daysSinceStart = differenceInDays(today, startDate)

  if (daysSinceStart === 0) return 0

  return Math.round((checkIns.length / daysSinceStart) * 100)
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}
