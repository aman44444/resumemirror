import { RedFlagResult } from "@/types"
import { SEVERITY_CONFIG, RISK_BANNER, RISK_LABEL } from "@/lib/constants"

export default function RedFlagResults({ data }: { data: RedFlagResult }) {
  const highFlags = data.flags.filter((f) => f.severity === "high")
  const mediumFlags = data.flags.filter((f) => f.severity === "medium")
  const lowFlags = data.flags.filter((f) => f.severity === "low")

  return (
    <div className="flex flex-col gap-6">
      <div className={`border rounded-xl p-4 ${RISK_BANNER[data.overallRisk]}`}>
        <p className="text-sm font-medium mb-1">{RISK_LABEL[data.overallRisk]}</p>
        <p className="text-sm mt-1 opacity-80">{data.summary}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "High risk", count: highFlags.length, color: "text-red-600" },
          { label: "Medium risk", count: mediumFlags.length, color: "text-amber-600" },
          { label: "Low risk", count: lowFlags.length, color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-medium ${s.color}`}>{s.count}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {data.flags.map((flag, i) => {
          const config = SEVERITY_CONFIG[flag.severity]
          return (
            <div key={i} className={`rounded-xl border p-5 ${config.bg} ${config.border}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>
                  {config.label}
                </span>
                <span className="text-xs text-gray-500">{flag.category}</span>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">Issue</p>
              <p className="text-sm text-gray-600 mb-3 italic">&ldquo;{flag.issue}&rdquo;</p>
              <p className="text-sm font-medium text-gray-800 mb-1">Fix</p>
              <p className="text-sm text-gray-600">{flag.fix}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}