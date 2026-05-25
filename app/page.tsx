"use client"
import { useState } from "react"
import { useInputs } from "@/hooks/useInputs"
import { useTailor } from "@/hooks/useTailor"
import { useRedFlags } from "@/hooks/useRedFlags"
import { useInterview } from "@/hooks/useInterview"
import { LiquidGlassSVG, LiquidGlassPill } from "@/components/ui/LiquidGlass"
import { LoadingState } from "@/components/ui/LoadingState"
import { ActionCard } from "@/components/ui/ActionCard"
import { TabButton } from "@/components/ui/TabButton"
import { InputPanel } from "@/components/features/InputPanel"
import { ResultsView } from "@/components/features/ResultsView"
import RedFlagResults from "@/components/features/RedFlagResult"
import InterviewPrep from "@/components/features/InterviewPrep"
import ResultsSkeleton from "@/components/ResultsSkeleton"

type Tab = "tailor" | "redflags" | "interview";

export default function Home() {
  const inputs = useInputs()
  const tailor = useTailor()
  const redFlags = useRedFlags()
  const interview = useInterview()
  const [activeTab, setActiveTab] = useState<Tab>("tailor")
  const [activeAction, setActiveAction] = useState<Tab | null>(null)

  const isLoading = tailor.loading || redFlags.loading || interview.loading
  const hasResults = tailor.result || redFlags.result || interview.result
  const error = tailor.error || redFlags.error || interview.error

  async function handleTailor() {
    setActiveAction("tailor")
    const ok = await tailor.run(inputs.jobDescription, inputs.resume)
    if (ok) setActiveTab("tailor")
  }

  async function handleRedFlags() {
    setActiveAction("redflags")
    const ok = await redFlags.run(inputs.resume)
    if (ok) setActiveTab("redflags")
  }

  async function handleInterview() {
    setActiveAction("interview")
    const ok = await interview.run(inputs.jobDescription, inputs.resume)
    if (ok) setActiveTab("interview")
  }

  function resetAll() {
    tailor.reset()
    redFlags.reset()
    interview.reset()
    inputs.reset()
    setActiveTab("tailor")
    setActiveAction(null)
  }

  return (
    <div className="min-h-screen" style={{
      background: "radial-gradient(ellipse at 20% 0%, rgba(180,180,210,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 5%, rgba(160,200,185,0.14) 0%, transparent 50%), #F7F7F5"
    }}>
      <LiquidGlassSVG />

      <nav className="sticky top-0 z-50 px-6 py-3" style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(247,247,245,0.6)",
      }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <LiquidGlassPill className="px-3 py-1.5 hover:opacity-90 transition-opacity">
            <div className="w-5 h-5 bg-gray-900 rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-medium">RM</span>
            </div>
            <span className="text-sm font-medium text-gray-900">Resume Mirror</span>
          </LiquidGlassPill>
          <LiquidGlassPill className="px-3 py-1.5">
            <span className="text-xs text-gray-600 font-medium">Free — no signup needed</span>
          </LiquidGlassPill>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {isLoading ? (
          <div className="max-w-3xl mx-auto">
            <LoadingState action={activeAction} />
            <div className="mt-8"><ResultsSkeleton /></div>
          </div>
        ) : !hasResults ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-medium text-gray-900 mb-3 tracking-tight">
                Land the interview,<br />not the rejection
              </h1>
              <p className="text-gray-400 text-base max-w-md mx-auto">
                AI that reads your resume like a recruiter — then tells you exactly what to fix
              </p>
            </div>

            <InputPanel {...inputs} />

            {error && (
              <div className="max-w-3xl mx-auto mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
              <ActionCard onClick={handleTailor} loading={tailor.loading} loadingText="Tailoring..."
                icon="✦" iconBg="bg-gray-900" iconColor="text-white"
                title="Tailor Resume" description="Rewrite bullets to match the JD and boost ATS score"
                borderAccent="hover:border-gray-400" />
              <ActionCard onClick={handleRedFlags} loading={redFlags.loading} loadingText="Scanning..."
                icon="⚑" iconBg="bg-red-50" iconColor="text-red-500"
                title="Red Flag Scan" description="Find what silently kills your application before recruiters do"
                borderAccent="hover:border-red-300" />
              <ActionCard onClick={handleInterview} loading={interview.loading} loadingText="Generating..."
                icon="◈" iconBg="bg-purple-50" iconColor="text-purple-500"
                title="Interview Prep" description="Predict the exact questions you'll face based on your gaps"
                borderAccent="hover:border-purple-300" />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 max-w-3xl mx-auto">
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
                {tailor.result && (
                  <TabButton active={activeTab === "tailor"} onClick={() => setActiveTab("tailor")} color="gray">
                    Tailored Resume
                  </TabButton>
                )}
                {redFlags.result && (
                  <TabButton active={activeTab === "redflags"} onClick={() => setActiveTab("redflags")} color="red">
                    Red Flags ({redFlags.result.flags.length})
                  </TabButton>
                )}
                {interview.result && (
                  <TabButton active={activeTab === "interview"} onClick={() => setActiveTab("interview")} color="purple">
                    Interview ({interview.result.questions.length})
                  </TabButton>
                )}
              </div>
              <button onClick={resetAll} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                ← Start over
              </button>
            </div>

            {activeTab === "tailor" && tailor.result && <ResultsView result={tailor.result} onReset={resetAll} />}
            {activeTab === "redflags" && redFlags.result && <RedFlagResults data={redFlags.result} />}
            {activeTab === "interview" && interview.result && <InterviewPrep data={interview.result} />}
          </div>
        )}
      </div>
    </div>
  )
}