import { memo } from "react";
// Lightweight replacement for `clsx` to avoid an external dependency
function clsx(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

type FieldKey = "jobDescription" | "resume";

export type InputPanelProps = {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  resume: string;
  setResume: (value: string) => void;
  openPanels: Record<FieldKey, boolean>;
  setOpenPanels: React.Dispatch<
    React.SetStateAction<Record<FieldKey, boolean>>
  >;
};

const ChevronIcon = memo(({ open }: { open: boolean }) => (
  <svg
    className={clsx(
      "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
      open && "rotate-180"
    )}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 9l-7 7-7-7"
    />
  </svg>
));

ChevronIcon.displayName = "ChevronIcon";

const WordCount = memo(({ text }: { text: string }) => {
  const words = text.trim();

  if (!words) return null;

  return (
    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
      {words.split(/\s+/).length} words
    </span>
  );
});

WordCount.displayName = "WordCount";

function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Clear"
      className="absolute top-3 right-5 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
    >
      <svg
        className="h-3 w-3 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

type AccordionInputProps = {
  label: string;
  value: string;
  placeholder: string;
  open: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
};

function AccordionInput({
  label,
  value,
  placeholder,
  open,
  onToggle,
  onChange,
}: AccordionInputProps) {
  const hasContent = value.trim().length > 0;

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between px-1 py-0.5 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "h-1.5 w-1.5 rounded-full transition-colors",
              hasContent ? "bg-green-400" : "bg-gray-300"
            )}
          />

          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <WordCount text={value} />
          <ChevronIcon open={open} />
        </div>
      </button>

      <div
        className={clsx(
          "relative z-10 overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="relative">
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="h-56 w-full resize-none rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-800 placeholder:text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          {hasContent && (
            <ClearButton onClick={() => onChange("")} />
          )}
        </div>
      </div>

      {!open && (
        <button
          type="button"
          onClick={onToggle}
          className="flex h-12 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/60 transition-all hover:border-gray-300 hover:bg-white cursor-pointer"
        >
          <span className="text-xs text-gray-300">
            {hasContent ? "Click to edit" : "Click to paste"}
          </span>
        </button>
      )}
    </div>
  );
}

export function InputPanel({
  jobDescription,
  setJobDescription,
  resume,
  setResume,
  openPanels,
  setOpenPanels,
}: InputPanelProps) {
  const fields = [
    {
      id: "jobDescription" as const,
      label: "Job Description",
      value: jobDescription,
      onChange: setJobDescription,
      placeholder: "Paste the job description here...",
    },
    {
      id: "resume" as const,
      label: "Your Resume",
      value: resume,
      onChange: setResume,
      placeholder: "Paste your resume text here...",
    },
  ];

  const toggle = (id: FieldKey) => {
    setOpenPanels((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mx-auto mb-5 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <AccordionInput
          key={field.id}
          label={field.label}
          value={field.value}
          placeholder={field.placeholder}
          onChange={field.onChange}
          open={openPanels[field.id]}
          onToggle={() => toggle(field.id)}
        />
      ))}
    </div>
  );
}