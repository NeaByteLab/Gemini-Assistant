import * as vscode from 'vscode'

/**
 * Configuration Manager Utility
 */
export function getGeminiApiKey() {
  let extensionConfig = vscode.workspace.getConfiguration('geminiAssistant')
  let geminiApiKey = extensionConfig.get('geminiApiKey')
  if (!(geminiApiKey)) {
    return ''
  } else {
    return geminiApiKey
  }
}