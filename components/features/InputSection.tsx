import { useAppStore } from "@/store/useAppStore"

export default function InputSection() {
  const { jobDescription, resume, setJobDescription, setResume } =
    useAppStore()

  return (
    <div className="grid md:grid-cols-2 gap-4">
      
      <textarea
        placeholder="Job Description"
        className="border p-3 rounded"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <textarea
        placeholder="Resume"
        className="border p-3 rounded"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

    </div>
  )
}