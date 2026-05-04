import { model } from "./client"

export async function generateJSON<T>(prompt: string): Promise<T> {
  const result = await model.generateContent(prompt)
  const text = result.response.text()

  const clean = text.replace(/```json|```/g, "").trim()

  try {
    return JSON.parse(clean)
  } catch {
    throw new Error("Invalid AI response format")
  }
}