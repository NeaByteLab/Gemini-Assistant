import * as vscode from 'vscode'

/**
 * Logger Utility Output Channel
 * Params: LogMessage
 */
const outputChannel = vscode.window.createOutputChannel('Gemini Assistant')
export function logInfo(logMessage: string) {
  outputChannel.appendLine('[Gemini Assistant] ' + logMessage)
}