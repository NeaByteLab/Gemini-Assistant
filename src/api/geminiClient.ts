import fetch from 'node-fetch'
import { logInfo } from '../logger'
import { GeminiResponse } from '../types/geminiTypes'

/**
 * Gemini Client Request
 * Params: PromptText, ApiKey
 */
export async function fetchGeminiSuggestion(promptText: string, apiKey: string): Promise<string> {
  logInfo('Fetch Gemini suggestion called')
  if (!(promptText)) {
    logInfo('Prompt text missing')
    return ''
  }
  if (!(apiKey)) {
    logInfo('API Key missing')
    return ''
  }
  let geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: promptText }
          ]
        }
      ]
    })
  })
  if (geminiResponse.ok) {
    let geminiData = await geminiResponse.json() as GeminiResponse
    if (geminiData.candidates && geminiData.candidates[0]) {
      logInfo('Gemini suggestion received')
      return geminiData.candidates[0].content.parts[0].text
    } else {
      logInfo('No suggestion in Gemini response')
      return ''
    }
  } else {
    let errorText = await geminiResponse.text()
    logInfo('Gemini error: ' + errorText)
    return ''
  }
}