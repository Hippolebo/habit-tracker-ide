"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useStore } from "@/store/useStore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

interface AddHabitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddHabitDialog({ open, onOpenChange, onSuccess }: AddHabitDialogProps) {
  const [name, setName] = useState("")
  const [emoji, setEmoji] = useState("🎯")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const { addHabit } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data, error } = await supabase
        .from("habits")
        .insert([
          {
            user_id: user.id,
            name: name.trim(),
            emoji,
          },
        ])
        .select()
        .single()

      if (error) throw error

      addHabit(data)
      setName("")
      setEmoji("🎯")
      onSuccess()
    } catch (err: any) {
      console.error("Error creating habit:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Habit Name</label>
            <Input
              placeholder="e.g., Morning Run"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Emoji</label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-4xl h-16 w-16"
              >
                {emoji}
              </Button>
              {showEmojiPicker && (
                <div className="absolute z-50 mt-2">
                  <Picker
                    data={data}
                    onEmojiSelect={(e: any) => {
                      setEmoji(e.native)
                      setShowEmojiPicker(false)
                    }}
                    theme="dark"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Adding..." : "Add Habit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
