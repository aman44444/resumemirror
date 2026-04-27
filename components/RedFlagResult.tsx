import { RedFlagResult } from "@/types"

const severityConfig = {
  high: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    label: "High risk"
  },
  medium: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    label: "Medium risk"
  },
  low: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    label: "Low risk"
  },
}

const riskBanner = {
  high: "bg-red-50 border-red-200 text-red-800",
  medium: "bg-amber-50 border-amber-200 text-amber-800",
  low: "bg-green-50 border-green-200 text-green-800",
}

const riskLabel = {
  high: "High Risk Resume",
  medium: "Medium Risk Resume",
  low: "Low Risk Resume",
}

export default function RedFlagResults({ data }: { data: RedFlagResult }) {
  const highFlags = data.flags.filter(f => f.severity === "high")
  const mediumFlags = data.flags.filter(f => f.severity === "medium")
  const lowFlags = data.flags.filter(f => f.severity === "low")

  return (
    <div className="flex flex-col gap-6">

      <div className={`border rounded-xl p-4 ${riskBanner[data.overallRisk]}`}>
        <p className="font-medium text-sm">{riskLabel[data.overallRisk]}</p>
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
          const config = severityConfig[flag.severity]
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