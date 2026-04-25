import jsPDF from "jspdf"
import { TailorResult } from "@/types"

export function exportToPdf(result: TailorResult, jobTitle: string = "Role") {
  const doc = new jsPDF()
  const margin = 20
  let y = margin

  const addText = (text: string, size: number, bold = false, color: [number, number, number] = [30, 30, 30]) => {
    doc.setFontSize(size)
    doc.setFont("helvetica", bold ? "bold" : "normal")
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, 170)
    lines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage()
        y = margin
      }
      doc.text(line, margin, y)
      y += size * 0.5
    })
    y += 4
  }

  const addDivider = () => {
    doc.setDrawColor(220, 220, 220)
    doc.line(margin, y, 190, y)
    y += 8
  }

  addText("Resume Mirror — Tailored Resume Report", 16, true)
  addText(`Tailored for: ${jobTitle}`, 10, false, [100, 100, 100])
  addText(`Generated: ${new Date().toLocaleDateString()}`, 10, false, [100, 100, 100])
  y += 4
  addDivider()

  addText("ATS Scores", 13, true)
  addText(`Original score: ${result.atsScore}/100`, 11)
  addText(`Improved score: ${result.improvedScore}/100`, 11, false, [22, 163, 74])
  y += 2
  addDivider()

  addText("Missing Keywords", 13, true)
  addText(result.missingKeywords.join(", "), 10, false, [100, 100, 100])
  y += 2
  addDivider()

  addText("Summary", 13, true)
  addText(result.summary, 10)
  y += 2
  addDivider()

  addText("Suggested Changes", 13, true)
  result.changes.forEach((change, i) => {
    addText(`Change ${i + 1}`, 11, true)
    addText(`Original: ${change.original}`, 10, false, [180, 50, 50])
    addText(`Rewritten: ${change.rewritten}`, 10, false, [22, 100, 50])
    addText(`Why: ${change.reason}`, 10, false, [100, 100, 100])
    y += 4
  })

  doc.save(`resume-mirror-${jobTitle.toLowerCase().replace(/\s+/g, "-")}.pdf`)
}