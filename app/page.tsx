"use client"

import { useState } from "react"
import ResultsSkeleton from "@/components/ResultsSkeleton"
import { exportToPdf } from "@/lib/exportPdf"
import InterviewPrep from "@/components/InterviewPrep"
import RedFlagResults from "@/components/RedFlagResult"
import { TailorResult, RedFlagResult, InterviewResult } from "@/types"

export default function Home() {
  const [jobDescription, setJobDescription] = useState("")
  const [resume, setResume] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TailorResult | null>(null)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<"tailor" | "redflags" | "interview">("tailor")
  const [redFlagResult, setRedFlagResult] = useState<RedFlagResult | null>(null)
  const [redFlagLoading, setRedFlagLoading] = useState(false)
  const [interviewResult, setInterviewResult] = useState<InterviewResult | null>(null)
  const [interviewLoading, setInterviewLoading] = useState(false)
  const [activeAction, setActiveAction] = useState<"tailor" | "redflags" | "interview" | null>(null)

  async function handleSubmit() {
    if (!jobDescription.trim() || !resume.trim()) { setError("Please fill in both fields"); return }
    setLoading(true); setError(""); setResult(null); setActiveAction("tailor")
    try {
      const res = await fetch("/api/tailor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jobDescription, resume }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data); setActiveTab("tailor")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally { setLoading(false) }
  }

  async function handleRedFlags() {
    if (!resume.trim()) { setError("Please paste your resume first"); return }
    setRedFlagLoading(true); setError(""); setActiveAction("redflags")
    try {
      const res = await fetch("/api/redflags", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resume }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setRedFlagResult(data); setActiveTab("redflags")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally { setRedFlagLoading(false) }
  }

  async function handleInterview() {
    if (!jobDescription.trim() || !resume.trim()) { setError("Please fill in both fields"); return }
    setInterviewLoading(true); setError(""); setActiveAction("interview")
    try {
      const res = await fetch("/api/interview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jobDescription, resume }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setInterviewResult(data); setActiveTab("interview")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally { setInterviewLoading(false) }
  }

  const isLoading = loading || redFlagLoading || interviewLoading
  const hasResults = result || redFlagResult || interviewResult

  function resetAll() {
    setResult(null); setRedFlagResult(null); setInterviewResult(null); setActiveTab("tailor"); setActiveAction(null)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      <nav className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-medium">RM</span>
            </div>
            <span className="text-sm font-medium text-gray-900">Resume Mirror</span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Free — no signup needed</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {isLoading ? (
          <div className="max-w-3xl mx-auto">
            <LoadingState action={activeAction} />
            <div className="mt-8">
              <ResultsSkeleton />
            </div>
          </div>
        ) : !hasResults ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-medium text-gray-900 mb-3 tracking-tight">
                Land the interview,<br />not the rejection
              </h1>
              <p className="text-gray-500 text-base max-w-md mx-auto">
                AI that reads your resume like a recruiter — then tells you exactly what to fix
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide px-1">Job Description</label>
                <textarea
                  className="w-full h-56 p-4 text-sm border border-gray-200 rounded-2xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-800 placeholder:text-gray-300 transition-all"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide px-1">Your Resume</label>
                <textarea
                  className="w-full h-56 p-4 text-sm border border-gray-200 rounded-2xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-800 placeholder:text-gray-300 transition-all"
                  placeholder="Paste your resume text here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <ActionCard
                onClick={handleSubmit}
                loading={loading}
                loadingText="Tailoring..."
                icon="✦"
                iconBg="bg-gray-900"
                iconColor="text-white"
                title="Tailor Resume"
                description="Rewrite bullets to match the JD and boost ATS score"
                borderAccent="hover:border-gray-400"
              />
              <ActionCard
                onClick={handleRedFlags}
                loading={redFlagLoading}
                loadingText="Scanning..."
                icon="⚑"
                iconBg="bg-red-50"
                iconColor="text-red-500"
                title="Red Flag Scan"
                description="Find what silently kills your application before recruiters do"
                borderAccent="hover:border-red-300"
              />
              <ActionCard
                onClick={handleInterview}
                loading={interviewLoading}
                loadingText="Generating..."
                icon="◈"
                iconBg="bg-purple-50"
                iconColor="text-purple-500"
                title="Interview Prep"
                description="Predict the exact questions you'll face based on your gaps"
                borderAccent="hover:border-purple-300"
              />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-6 text-center">
                {[
                  { stat: "ATS optimised", desc: "keyword matching" },
                  { stat: "Gap analysis", desc: "vs job requirements" },
                  { stat: "100% free", desc: "no account needed" },
                ].map((s) => (
                  <div key={s.stat}>
                    <p className="text-sm font-medium text-gray-800">{s.stat}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                {result && (
                  <TabButton active={activeTab === "tailor"} onClick={() => setActiveTab("tailor")} color="gray">
                    Tailored Resume
                  </TabButton>
                )}
                {redFlagResult && (
                  <TabButton active={activeTab === "redflags"} onClick={() => setActiveTab("redflags")} color="red">
                    Red Flags {redFlagResult.flags.length > 0 && `(${redFlagResult.flags.length})`}
                  </TabButton>
                )}
                {interviewResult && (
                  <TabButton active={activeTab === "interview"} onClick={() => setActiveTab("interview")} color="purple">
                    Interview ({interviewResult.questions.length})
                  </TabButton>
                )}
              </div>
              <button onClick={resetAll} className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                ← Start over
              </button>
            </div>

            {activeTab === "tailor" && result && (
              <ResultsView result={result} onReset={resetAll} />
            )}
            {activeTab === "redflags" && redFlagResult && (
              <RedFlagResults data={redFlagResult} />
            )}
            {activeTab === "interview" && interviewResult && (
              <InterviewPrep data={interviewResult} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ActionCard({ onClick, loading, loadingText, icon, iconBg, iconColor, title, description, borderAccent }: {
  onClick: () => void
  loading: boolean
  loadingText: string
  icon: string
  iconBg: string
  iconColor: string
  title: string
  description: string
  borderAccent: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full text-left p-5 bg-white border border-gray-200 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${borderAccent} hover:shadow-sm`}
    >
      <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center mb-3`}>
        <span className={`${iconColor} text-sm`}>{icon}</span>
      </div>
      <p className="text-sm font-medium text-gray-900 mb-1">
        {loading ? loadingText : title}
      </p>
      <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
    </button>
  )
}

function TabButton({ active, onClick, color, children }: {
  active: boolean
  onClick: () => void
  color: "gray" | "red" | "purple"
  children: React.ReactNode
}) {
  const activeStyles = {
    gray: "bg-white text-gray-900 shadow-sm",
    red: "bg-white text-red-600 shadow-sm",
    purple: "bg-white text-purple-600 shadow-sm",
  }
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${active ? activeStyles[color] : "text-gray-400 hover:text-gray-600"}`}
    >
      {children}
    </button>
  )
}

function LoadingState({ action }: { action: "tailor" | "redflags" | "interview" | null }) {
  const messages = {
    tailor: { title: "Tailoring your resume...", sub: "Matching keywords and rewriting bullets" },
    redflags: { title: "Scanning for red flags...", sub: "Reading your resume like a recruiter" },
    interview: { title: "Predicting interview questions...", sub: "Analysing gaps between your resume and the role" },
    null: { title: "Analysing...", sub: "Please wait" },
  }
  const msg = messages[action ?? "null"]
  return (
    <div className="text-center py-8">
      <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-sm font-medium text-gray-800">{msg.title}</p>
      <p className="text-xs text-gray-400 mt-1">{msg.sub}</p>
    </div>
  )
}

function ResultsView({ result, onReset }: { result: TailorResult; onReset: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Original score</p>
          <p className="text-2xl font-medium text-gray-800">{result.atsScore}<span className="text-sm text-gray-300">/100</span></p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Improved score</p>
          <p className="text-2xl font-medium text-green-600">{result.improvedScore}<span className="text-sm text-gray-300">/100</span></p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Keywords found</p>
          <p className="text-2xl font-medium text-gray-800">{result.missingKeywords.length}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Missing keywords</p>
        <div className="flex flex-wrap gap-2">
          {result.missingKeywords.map((kw) => (
            <span key={kw} className="text-xs bg-red-50 text-red-500 px-3 py-1 rounded-full border border-red-100">{kw}</span>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Summary</p>
        <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Suggested changes</p>
        {result.changes.map((change, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-xs text-red-400 mb-1">Original</p>
              <p className="text-sm text-red-700">{change.original}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-green-500 mb-1">Rewritten</p>
              <p className="text-sm text-green-700">{change.rewritten}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Why this helps</p>
              <p className="text-sm text-gray-500">{change.reason}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => exportToPdf(result, "Job Application")}
        className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
      >
        Download as PDF
      </button>
      <button onClick={onReset} className="text-xs text-gray-400 hover:text-gray-600 underline text-center transition-colors">
        Start over
      </button>
    </div>
  )
}