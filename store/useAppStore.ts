import { create } from "zustand"

type State = {
  jobDescription: string
  resume: string
  setJD: (v: string) => void
  setResume: (v: string) => void
}

export const useAppStore = create<State>((set) => ({
  jobDescription: "",
  resume: "",
  setJD: (v) => set({ jobDescription: v }),
  setResume: (v) => set({ resume: v }),
}))