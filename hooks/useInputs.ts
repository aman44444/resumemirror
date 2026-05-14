import { useState } from "react"

export function useInputs() {
  const [jobDescription, setJobDescription] = useState("")
  const [resume, setResume] = useState("")
  const [jdOpen, setJdOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  function reset() {
    setJdOpen(false)
    setResumeOpen(false)
  }

  return {
    jobDescription,
    setJobDescription,
    resume,
    setResume,
    jdOpen,
    setJdOpen,
    resumeOpen,
    setResumeOpen,
    reset,
  }
}