import { useState } from "react"
import { RedFlagResult } from "@/types"
import { scanRedFlags } from "@/lib/api/api"

export function useRedFlags() {
  const [result, setResult] = useState<RedFlagResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function run(resume: string) {
    if (!resume.trim()) {
      setError("Please paste your resume first")
      return false
    }
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const data = await scanRedFlags(resume)
      setResult(data)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      return false
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setResult(null)
    setError("")
  }

  return { result, loading, error, run, reset }
}