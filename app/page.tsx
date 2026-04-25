"use client";
import ResultsSkeleton from "@/components/ResultsSkeleton";
import { exportToPdf } from "@/lib/exportPdf";
import { useState } from "react";
import { TailorResult } from "@/types";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TailorResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!jobDescription.trim() || !resume.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, resume }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setResult(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-medium text-gray-800">Resume Mirror</h1>
        <p className="text-gray-500 mt-1 text-sm mb-10">
          Tailor your resume to any job description in seconds
        </p>

        {loading ? (
          <ResultsSkeleton />
        ) : !result ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                className="w-full h-64 p-4 text-sm border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-800"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Your Resume
              </label>
              <textarea
                className="w-full h-64 p-4 text-sm border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-800"
                placeholder="Paste your resume text here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </div>

            {error && (
              <p className="md:col-span-2 text-sm text-red-500">{error}</p>
            )}

            <div className="md:col-span-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 bg-gray-800 text-white text-sm font-medium rounded-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Analyzing your resume..." : "Tailor My Resume"}
              </button>
            </div>
          </div>
        ) : (
          <ResultsView result={result} onReset={() => setResult(null)} />
        )}
      </div>
    </main>
  );
}

function ResultsView({
  result,
  onReset,
}: {
  result: TailorResult;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Original ATS score</p>
          <p className="text-3xl font-medium text-gray-800">
            {result.atsScore}
            <span className="text-base text-gray-400">/100</span>
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Improved ATS score</p>
          <p className="text-3xl font-medium text-green-600">
            {result.improvedScore}
            <span className="text-base text-gray-400">/100</span>
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-500 mb-1">Keywords added</p>
          <p className="text-3xl font-medium text-gray-800">
            {result.missingKeywords.length}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-500 mb-3">
          Missing keywords
        </p>
        <div className="flex flex-wrap gap-2">
          {result.missingKeywords.map((kw) => (
            <span
              key={kw}
              className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-500 mb-1">Summary</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {result.summary}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Suggested changes
        </p>
        {result.changes.map((change, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3"
          >
            <div className="bg-red-50 border border-red-100 rounded-lg p-3">
              <p className="text-xs text-red-400 mb-1">Original</p>
              <p className="text-sm text-red-700">{change.original}</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-lg p-3">
              <p className="text-xs text-green-500 mb-1">Rewritten</p>
              <p className="text-sm text-green-700">{change.rewritten}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Why this helps</p>
              <p className="text-sm text-gray-600">{change.reason}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => exportToPdf(result, "Job Application")}
        className="w-full py-3 bg-gray-800 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
      >
        Download as PDF
      </button>

      <button
        onClick={onReset}
        className="text-sm text-gray-500 hover:text-gray-700 underline text-center"
      >
        Tailor another resume
      </button>
    </div>
  );
}
