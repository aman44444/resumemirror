export default function ResultsSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="h-3 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="h-3 bg-gray-200 rounded w-32 mb-4" />
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded-full w-20" />
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-4/6" />
        </div>
      </div>

      {[1, 2].map((i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="h-3 bg-gray-200 rounded w-16 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}

    </div>
  )
}