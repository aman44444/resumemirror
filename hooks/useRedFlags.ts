import { useState } from "react"
import { fetcher } from "@/lib/api/fetcher"
import { RedFlagResult } from "@/types"

export function useRedFlags() {
  const [data, setData] = useState<RedFlagResult | null>(null)
  const [loading, setLoading] = useState(false)

  const reset = () => setData(null)

  const run = async (resume: string) => {
    setLoading(true)

    try {
      const res = await fetcher<RedFlagResult>("/api/ai/redflags", {
        resume,
      })

      setData(res)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, run, reset }
}