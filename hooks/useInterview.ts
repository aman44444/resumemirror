import { useState } from "react"
import { fetcher } from "@/lib/api/fetcher"
import { InterviewResult } from "@/types"

export function useInterview() {
  const [data, setData] = useState<InterviewResult | null>(null)
  const [loading, setLoading] = useState(false)

  const run = async (jobDescription: string, resume: string) => {
    setLoading(true)

    try {
      const res = await fetcher<InterviewResult>("/api/ai/interview", {
        jobDescription,
        resume,
      })

      setData(res)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, run }
}