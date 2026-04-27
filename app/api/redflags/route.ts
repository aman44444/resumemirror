import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { resume } = await req.json()

    if (!resume) {
      return NextResponse.json(
        { error: "Resume is required" },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const prompt = `
You are a senior recruiter with 15 years of experience screening resumes.
Analyze this resume and identify red flags that would cause you to reject or deprioritize it.

Be brutally honest. Look for:
- Employment gaps (unexplained time periods)
- Vague or weak job titles ("freelancer", "consultant" with no clients)
- Buzzword overuse ("passionate", "results-driven", "team player", "hardworking")
- Missing quantified achievements (bullets with no numbers or impact)
- Inconsistent dates or timelines that don't add up
- Too many jobs in short time (job hopping)
- Irrelevant hobbies or personal info that wastes space
- Weak action verbs ("assisted", "helped", "worked on")
- Missing contact info or unprofessional email
- Skills listed without any proof in experience
- Typos, grammar issues, inconsistent formatting signals

RESUME:
${resume}

Return ONLY valid JSON in this exact format:
{
  "overallRisk": "high" | "medium" | "low",
  "flags": [
    {
      "severity": "high" | "medium" | "low",
      "category": "<category name e.g. Employment Gap, Weak Language, Missing Metrics>",
      "issue": "<specific issue found in their resume, quote the exact text>",
      "fix": "<concrete actionable fix they can apply right now>"
    }
  ],
  "summary": "<2 sentence honest summary of the resume's biggest weaknesses>"
}
`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, "").trim()
    const data = JSON.parse(clean)

    return NextResponse.json(data)

  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong"
    console.error("Red flags API error:", message)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}