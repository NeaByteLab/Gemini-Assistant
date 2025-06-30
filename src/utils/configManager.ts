import * as vscode from 'vscode'

/**
 * Configuration Manager For Gemini API Key Persistence
 */
const configSection = 'geminiAssistant'

export function getGeminiApiKey(): string {
  const config = vscode.workspace.getConfiguration(configSection)
  const apiKey = config.get<string>('geminiApiKey')
  if (!(apiKey)) {
    return ''
  }
  return apiKey
}

export async function saveGeminiApiKey(apiKey: string) {
  const config = vscode.workspace.getConfiguration(configSection)
  await config.update('geminiApiKey', apiKey, vscode.ConfigurationTarget.Global)
}