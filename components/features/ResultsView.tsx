import { TailorResult } from "@/types"
import { exportToPdf } from "@/lib/exportPdf"

export function ResultsView({
  result,
  onReset,
}: {
  result: TailorResult
  onReset: () => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Original score", value: `${result.atsScore}/100`, color: "text-gray-800" },
          { label: "Improved score", value: `${result.improvedScore}/100`, color: "text-green-600" },
          { label: "Keywords found", value: `${result.missingKeywords.length}`, color: "text-gray-800" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Missing keywords</p>
        <div className="flex flex-wrap gap-2">
          {result.missingKeywords.map((kw) => (
            <span key={kw} className="text-xs bg-red-50 text-red-500 px-3 py-1 rounded-full border border-red-100">
              {kw}
            </span>
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
      <button
        onClick={onReset}
        className="text-xs text-gray-400 hover:text-gray-600 underline text-center transition-colors"
      >
        Start over
      </button>
    </div>
  )
}