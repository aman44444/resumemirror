type ActionCardProps = {
  onClick: () => void
  loading: boolean
  loadingText: string
  icon: string
  iconBg: string
  iconColor: string
  title: string
  description: string
  borderAccent: string
}

export function ActionCard({
  onClick, loading, loadingText,
  icon, iconBg, iconColor,
  title, description, borderAccent,
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full text-left p-5 bg-white border border-gray-200 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${borderAccent} hover:shadow-sm`}
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