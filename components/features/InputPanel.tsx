type InputPanelProps = {
  jobDescription: string;
  setJobDescription: (v: string) => void;
  resume: string;
  setResume: (v: string) => void;
  jdOpen: boolean;
  setJdOpen: (v: boolean) => void;
  resumeOpen: boolean;
  setResumeOpen: (v: boolean) => void;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function WordCount({ text }: { text: string }) {
  if (!text.trim()) return null;
  return (
    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
      {text.trim().split(/\s+/).length} words
    </span>
  );
}

function AccordionInput({
  label,
  value,
  onChange,
  open,
  onToggle,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  open: boolean;
  onToggle: () => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onToggle}
        className="flex items-center justify-between px-1 py-0.5"
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full transition-colors ${value.trim() ? "bg-green-400" : "bg-gray-300"}`}
          />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <WordCount text={value} />
          <ChevronIcon open={open} />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <textarea
          className="w-full h-56 p-4 text-sm border border-gray-200 rounded-2xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent text-gray-800 placeholder:text-gray-300"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {!open && (
        <div
          onClick={onToggle}
          className="h-12 border border-dashed border-gray-200 rounded-2xl bg-white/60 flex items-center justify-center cursor-pointer hover:border-gray-300 hover:bg-white transition-all"
        >
          <span className="text-xs text-gray-300">
            {value.trim() ? "Click to edit" : "Click to paste"}
          </span>
        </div>
      )}
    </div>
  );
}

export function InputPanel({
  jobDescription,
  setJobDescription,
  resume,
  setResume,
  jdOpen,
  setJdOpen,
  resumeOpen,
  setResumeOpen,
}: InputPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 max-w-3xl mx-auto">
      <AccordionInput
        label="Job Description"
        value={jobDescription}
        onChange={setJobDescription}
        open={jdOpen}
        onToggle={() => setJdOpen(!jdOpen)}
        placeholder="Paste the job description here..."
      />
      <AccordionInput
        label="Your Resume"
        value={resume}
        onChange={setResume}
        open={resumeOpen}
        onToggle={() => setResumeOpen(!resumeOpen)}
        placeholder="Paste your resume text here..."
      />
    </div>
  );
}
