import { useState, useEffect } from "react"

const STORAGE_KEY = "resume-mirror-inputs"

type PanelKey = "jobDescription" | "resume";


function loadFromStorage() {
  if (typeof window === "undefined") return { jobDescription: "", resume: "" }
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return { jobDescription: "", resume: "" }
    return JSON.parse(saved)
  } catch {
    return { jobDescription: "", resume: "" }
  }
}

export function useInputs() {
  const [jobDescription, setJobDescriptionRaw] = useState("")
  const [resume, setResumeRaw] = useState("")
  const [openPanels, setOpenPanels] = useState<Record<PanelKey, boolean>>({
  jobDescription: false,
  resume: false,
});
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadFromStorage()
    if (saved.jobDescription) setJobDescriptionRaw(saved.jobDescription)
    if (saved.resume) setResumeRaw(saved.resume)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ jobDescription, resume })
    )
  }, [jobDescription, resume, hydrated])

  function setJobDescription(v: string) {
    setJobDescriptionRaw(v)
  }

  function setResume(v: string) {
    setResumeRaw(v)
  }

  function reset() {
   setOpenPanels({
      jobDescription: false,
      resume: false,
  });

  }

  function clearStorage() {
    localStorage.removeItem(STORAGE_KEY)
    setJobDescriptionRaw("")
    setResumeRaw("")
  }

  return {
    jobDescription,
    setJobDescription,
    resume,
    setResume,
    // jdOpen,
    // setJdOpen,
    // resumeOpen,
    // setResumeOpen,
      openPanels,
  setOpenPanels,

    reset,
    clearStorage,
  }
}