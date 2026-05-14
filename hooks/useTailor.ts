import { useState } from "react"
import { TailorResult } from "@/types"
import { tailorResume } from "@/lib/api/api"

export function useTailor() {
  const [result, setResult] = useState<TailorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function run(jobDescription: string, resume: string) {
    if (!jobDescription.trim() || !resume.trim()) {
      setError("Please fill in both fields")
      return false
    }
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const data = await tailorResume(jobDescription, resume)
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