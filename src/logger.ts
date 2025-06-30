/**
 * Logger Utility Output Channel
 * Params: LogMessage
 */
import * as vscode from 'vscode'

const outputChannel = vscode.window.createOutputChannel('Gemini Assistant')

export function logInfo(logMessage: string) {
  outputChannel.appendLine('[Gemini Assistant] ' + logMessage)
}