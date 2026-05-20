export default function ActionSection({
  onTailor,
  onRedFlags,
  onInterview,
}: {
  onTailor: () => void
  onRedFlags: () => void
  onInterview: () => void
}) {
  return (
    <div className="flex gap-3 mt-4">

      <button onClick={onTailor} className="px-4 py-2 bg-black text-white rounded">
        Tailor
      </button>

      <button onClick={onRedFlags} className="px-4 py-2 border rounded">
        Red Flags
      </button>

      <button onClick={onInterview} className="px-4 py-2 border rounded">
        Interview
      </button>

    </div>
  )
}