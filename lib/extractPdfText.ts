// Client-side PDF -> plain text extraction using pdf.js.
// Runs entirely in the browser, so no file ever has to be uploaded to a
// server or sent to Gemini as a binary attachment.

export async function extractTextFromPdf(file: File): Promise<string> {
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Please upload a PDF file.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("PDF is too large (max 10MB).");
  }

  // Dynamic import so pdf.js (and its worker) are only pulled into the
  // client bundle when someone actually uploads a PDF.
  const pdfjsLib = await import("pdfjs-dist");

  // Use the CDN-hosted worker matching the installed pdfjs-dist version,
  // rather than trying to get Next.js to bundle the worker file.
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pageTexts: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    const pageText = content.items
      // pdf.js types text items as TextItem | TextMarkedContent; only
      // TextItem has a `str` property.
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");

    pageTexts.push(pageText);
  }

  const text = pageTexts.join("\n\n").replace(/[ \t]+/g, " ").trim();

  if (!text) {
    throw new Error(
      "Couldn't find any text in that PDF. If it's a scanned image, try pasting the text manually instead.",
    );
  }

  return text;
}