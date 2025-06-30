import * as vscode from 'vscode'
import { createSettingsWebviewPanel } from './views/webviewPanel'
import { scanAndExecuteGeminiCommand } from './utils/scanCommand'
import { logInfo } from './logger'

/**
 * Commands Registration
 * Params: ExtensionContext
 */
export function registerCommands(extensionContext: vscode.ExtensionContext) {
  logInfo('Register commands started')
  let extensionDisposable = vscode.commands.registerCommand('chatgptCopilot.showSettings', function () {
    logInfo('Show settings command executed')
    createSettingsWebviewPanel(extensionContext)
  })
  let geminiScanCommand = vscode.commands.registerCommand('geminiAssistant.scanAndExecuteCommand', function () {
    logInfo('Scan and execute Gemini command executed')
    scanAndExecuteGeminiCommand()
  })
  extensionContext.subscriptions.push(extensionDisposable)
  extensionContext.subscriptions.push(geminiScanCommand)
  logInfo('Register commands finished')
}