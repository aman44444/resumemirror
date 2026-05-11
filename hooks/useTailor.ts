import { useState } from "react"
import { fetcher } from "@/lib/api/fetcher"
import { TailorResult } from "@/types"

export function useTailor() {
  const [data, setData] = useState<TailorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const reset = () => setData(null)

  const run = async (jobDescription: string, resume: string) => {
    setLoading(true)
    setError("")

    try {
      const res = await fetcher<TailorResult>("/api/ai/tailor", {
        jobDescription,
        resume,
      })

      setData(res)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error")
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, run , reset}
}