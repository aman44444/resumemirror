import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { jobDescription, resume } = await req.json()

    if (!jobDescription || !resume) {
      return NextResponse.json(
        { error: "Both job description and resume are required" },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const prompt = `
You are a senior hiring manager with 15 years of experience interviewing candidates.

Analyze this candidate's resume against the job description and generate realistic interview questions they will likely face — especially targeting gaps, weaknesses, and areas where their experience doesn't perfectly match the role.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE RESUME:
${resume}

Generate 8 questions total:
- 2 easy (general fit, motivation, background)
- 4 medium (technical skills, specific experience, role-specific scenarios)  
- 2 hard (gap-targeting questions, uncomfortable questions about weaknesses or mismatches)

For each question:
- Make it SPECIFIC to this candidate's actual resume and this actual job — not generic
- The hard questions should directly reference gaps or mismatches you spotted
- Suggested answers should use the candidate's actual experience from their resume

Return ONLY valid JSON:
{
  "overallReadiness": <number 0-100, how ready is this candidate for this specific role>,
  "summary": "<2 sentences: honest assessment of candidate's interview readiness for this role>",
  "questions": [
    {
      "question": "<the interview question>",
      "difficulty": "easy" | "medium" | "hard",
      "category": "<e.g. Motivation, Technical, Behavioral, Gap Analysis>",
      "whyAsked": "<why a recruiter would ask this specific question to this candidate>",
      "suggestedAnswer": "<a strong answer using the candidate's actual experience>"
    }
  ]
}
`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, "").trim()
    const data = JSON.parse(clean)

    return NextResponse.json(data)

  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong"
    console.error("Interview API error:", message)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}