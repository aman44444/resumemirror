export const SEVERITY_CONFIG = {
  high: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    label: "High risk",
  },
  medium: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    label: "Medium risk",
  },
  low: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    label: "Low risk",
  },
} as const

export const RISK_BANNER = {
  high: "bg-red-50 border-red-200 text-red-800",
  medium: "bg-amber-50 border-amber-200 text-amber-800",
  low: "bg-green-50 border-green-200 text-green-800",
} as const

export const RISK_LABEL = {
  high: "High Risk Resume",
  medium: "Medium Risk Resume",
  low: "Low Risk Resume",
} as const

export const DIFFICULTY_CONFIG = {
  easy: {
    badge: "bg-green-100 text-green-700",
    border: "border-green-200",
    label: "Easy",
  },
  medium: {
    badge: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
    label: "Medium",
  },
  hard: {
    badge: "bg-red-100 text-red-700",
    border: "border-red-200",
    label: "Hard",
  },
} as const

export const LOADING_MESSAGES = {
  tailor: {
    title: "Tailoring your resume...",
    sub: "Matching keywords and rewriting bullets",
  },
  redflags: {
    title: "Scanning for red flags...",
    sub: "Reading your resume like a recruiter",
  },
  interview: {
    title: "Predicting interview questions...",
    sub: "Analysing gaps between your resume and the role",
  },
  null: {
    title: "Analysing...",
    sub: "Please wait",
  },
} as const