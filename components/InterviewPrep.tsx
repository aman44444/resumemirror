import { useState } from "react"
import { InterviewResult } from "@/types"

const difficultyConfig = {
  easy: {
    badge: "bg-green-100 text-green-700",
    border: "border-green-200",
    label: "Easy"
  },
  medium: {
    badge: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
    label: "Medium"
  },
  hard: {
    badge: "bg-red-100 text-red-700",
    border: "border-red-200",
    label: "Hard"
  },
}

export default function InterviewPrep({ data }: { data: InterviewResult }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set())

  function toggleAnswer(i: number) {
    setRevealedAnswers(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const readinessColor =
    data.overallReadiness >= 70
      ? "text-green-600"
      : data.overallReadiness >= 40
      ? "text-amber-600"
      : "text-red-600"

  return (
    <div className="flex flex-col gap-6">

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Interview readiness</p>
          <p className={`text-3xl font-medium ${readinessColor}`}>
            {data.overallReadiness}
            <span className="text-base text-gray-400">/100</span>
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Total questions</p>
          <p className="text-3xl font-medium text-gray-800">{data.questions.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Hard questions</p>
          <p className="text-3xl font-medium text-red-600">
            {data.questions.filter(q => q.difficulty === "hard").length}
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm font-medium text-amber-800 mb-1">Readiness assessment</p>
        <p className="text-sm text-amber-700">{data.summary}</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Questions — click to practice
        </p>

        {data.questions.map((q, i) => {
          const config = difficultyConfig[q.difficulty]
          const isOpen = openIndex === i
          const answerRevealed = revealedAnswers.has(i)

          return (
            <div
              key={i}
              className={`bg-white border rounded-xl overflow-hidden transition-all ${
                isOpen ? config.border : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full p-5 text-left flex items-start justify-between gap-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-gray-400">{q.category}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 text-left">{q.question}</p>
                </div>
                <span className="text-gray-400 text-lg flex-shrink-0">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 flex flex-col gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Why they ask this</p>
                    <p className="text-sm text-gray-600">{q.whyAsked}</p>
                  </div>

                  {!answerRevealed ? (
                    <button
                      onClick={() => toggleAnswer(i)}
                      className="w-full py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      Show suggested answer
                    </button>
                  ) : (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                      <p className="text-xs text-green-500 mb-1">Suggested answer</p>
                      <p className="text-sm text-green-800 leading-relaxed">{q.suggestedAnswer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}