import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Extracts JSON from a response text.
 * Handles raw JSON, markdown code blocks, and JSON embedded in surrounding text.
 */
export function extractJSON(text: string): unknown {
  const trimmed = text.trim()

  // Try direct parse first
  try {
    return JSON.parse(trimmed)
  } catch {
    // ignore
  }

  // Try markdown code block (```json ... ``` or ``` ... ```)
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (fenced) {
    try {
      return JSON.parse(fenced[1].trim())
    } catch {
      // ignore
    }
  }

  // Try to find a JSON object or array in the text
  const objIdx = trimmed.indexOf('{')
  const arrIdx = trimmed.indexOf('[')

  let startIdx = -1
  if (objIdx !== -1 && arrIdx !== -1) {
    startIdx = Math.min(objIdx, arrIdx)
  } else if (objIdx !== -1) {
    startIdx = objIdx
  } else if (arrIdx !== -1) {
    startIdx = arrIdx
  }

  if (startIdx !== -1) {
    try {
      return JSON.parse(trimmed.slice(startIdx))
    } catch {
      // ignore
    }
  }

  throw new Error(`Could not extract JSON from response: ${trimmed.slice(0, 200)}`)
}

/**
 * Calls the OpenAI Responses API with the web_search_preview built-in tool.
 * The tool loop runs server-side — no manual continuation needed.
 * Returns the final text output from the model.
 */
export async function callWithWebSearch(
  prompt: string,
  systemPrompt: string,
  maxOutputTokens = 4096
): Promise<string> {
  const response = await openai.responses.create({
    model: 'gpt-4o',
    instructions: systemPrompt,
    input: prompt,
    tools: [{ type: 'web_search_preview' }],
    max_output_tokens: maxOutputTokens,
  })

  return response.output_text ?? ''
}
