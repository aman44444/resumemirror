export type TailorResult = {
  atsScore: number
  improvedScore: number
  missingKeywords: string[]
  changes: {
    original: string
    rewritten: string
    reason: string
  }[]
  summary: string
}

export type RedFlag = {
  severity: "high" | "medium" | "low"
  category: string
  issue: string
  fix: string
}

export type RedFlagResult = {
  overallRisk: "high" | "medium" | "low"
  flags: RedFlag[]
  summary: string
}