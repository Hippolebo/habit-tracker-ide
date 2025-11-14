import { create } from 'zustand'
import { Habit, CheckIn } from '@/lib/supabase'

type Store = {
  habits: Habit[]
  checkIns: Record<string, CheckIn[]>
  selectedHabitId: string | null
  setHabits: (habits: Habit[]) => void
  addHabit: (habit: Habit) => void
  updateHabit: (habit: Habit) => void
  deleteHabit: (id: string) => void
  setCheckIns: (habitId: string, checkIns: CheckIn[]) => void
  addCheckIn: (checkIn: CheckIn) => void
  removeCheckIn: (id: string) => void
  setSelectedHabitId: (id: string | null) => void
}

export const useStore = create<Store>((set) => ({
  habits: [],
  checkIns: {},
  selectedHabitId: null,
  setHabits: (habits) => set({ habits }),
  addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
  updateHabit: (habit) =>
    set((state) => ({
      habits: state.habits.map((h) => (h.id === habit.id ? habit : h)),
    })),
  deleteHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((h) => h.id !== id),
    })),
  setCheckIns: (habitId, checkIns) =>
    set((state) => ({
      checkIns: { ...state.checkIns, [habitId]: checkIns },
    })),
  addCheckIn: (checkIn) =>
    set((state) => ({
      checkIns: {
        ...state.checkIns,
        [checkIn.habit_id]: [
          ...(state.checkIns[checkIn.habit_id] || []),
          checkIn,
        ],
      },
    })),
  removeCheckIn: (id) =>
    set((state) => {
      const newCheckIns = { ...state.checkIns }
      Object.keys(newCheckIns).forEach((habitId) => {
        newCheckIns[habitId] = newCheckIns[habitId].filter((c) => c.id !== id)
      })
      return { checkIns: newCheckIns }
    }),
  setSelectedHabitId: (id) => set({ selectedHabitId: id }),
}))
