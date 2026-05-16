import { TailorResult, RedFlagResult, InterviewResult } from "@/types"

const post = async (url: string, body: Record<string, string>) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Something went wrong")
  return data
}

export const tailorResume = (jobDescription: string, resume: string): Promise<TailorResult> =>
  post("/api/tailor", { jobDescription, resume })

export const scanRedFlags = (resume: string): Promise<RedFlagResult> =>
  post("/api/redflags", { resume })

export const predictInterview = (jobDescription: string, resume: string): Promise<InterviewResult> =>
  post("/api/interview", { jobDescription, resume })