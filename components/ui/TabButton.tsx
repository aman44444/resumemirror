type TabButtonProps = {
  active: boolean
  onClick: () => void
  color: "gray" | "red" | "purple"
  children: React.ReactNode
}

const activeStyles = {
  gray: "bg-white text-gray-900 shadow-sm",
  red: "bg-white text-red-600 shadow-sm",
  purple: "bg-white text-purple-600 shadow-sm",
}

export function TabButton({ active, onClick, color, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
        active ? activeStyles[color] : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {children}
    </button>
  )
}