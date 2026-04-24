import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { jobDescription, resume } = await req.json();

    if (!jobDescription || !resume) {
      return NextResponse.json(
        { error: "Job description and resume are required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert resume coach and ATS optimization specialist.

Given this job description and resume, rewrite the resume to better match the role.

JOB DESCRIPTION:
${jobDescription}

ORIGINAL RESUME:
${resume}

Return ONLY a valid JSON object in this exact format, no extra text:
{
  "atsScore": <number 0-100 representing how well original resume matches JD>,
  "improvedScore": <number 0-100 representing how well rewritten resume matches JD>,
  "missingKeywords": [<list of important keywords from JD missing in resume>],
  "changes": [
    {
      "original": "<original bullet or sentence>",
      "rewritten": "<improved version>",
      "reason": "<why this change helps>"
    }
  ],
  "summary": "<2 sentence overview of what was changed and why>"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const clean = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);

    return NextResponse.json(data);
  } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
  console.error("Tailor API error:", message)

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
