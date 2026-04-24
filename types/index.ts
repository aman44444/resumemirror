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