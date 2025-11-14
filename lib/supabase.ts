import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Habit = {
  id: string
  user_id: string
  name: string
  emoji: string
  created_at: string
}

export type CheckIn = {
  id: string
  habit_id: string
  date: string
  created_at: string
}
