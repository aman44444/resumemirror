import RedFlagResults from "@/components/RedFlagResult"
import InterviewPrep from "@/components/InterviewPrep"

type Props = {
  data: TailorResult | RedFlagResult | InterviewResult
}

export default function ResultSection({
  tailor,
  redflags,
  interview,
}: data) {
  return (
    <div className="mt-6">

      {tailor && (
        <pre className="bg-gray-50 p-4 rounded">
          {JSON.stringify(tailor, null, 2)}
        </pre>
      )}

      {redflags && <RedFlagResults data={redflags} />}

      {interview && <InterviewPrep data={interview} />}

    </div>
  )
}