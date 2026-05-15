import { LOADING_MESSAGES } from "@/lib/constants"

type Action = "tailor" | "redflags" | "interview" | null

export function LoadingState({ action }: { action: Action }) {
  const msg = LOADING_MESSAGES[action ?? "null"]
  return (
    <div className="text-center py-8">
      <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-sm font-medium text-gray-800">{msg.title}</p>
      <p className="text-xs text-gray-400 mt-1">{msg.sub}</p>
    </div>
  )
}