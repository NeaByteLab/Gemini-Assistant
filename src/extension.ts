/**
 * Extension Entry Point
 * Params: ExtensionContext
 */
import { ExtensionContext } from 'vscode'
import { activateInlineCompletionProvider } from './providers/inlineCompletionProvider'
import { logInfo } from './logger'

export function activate(extensionContext: ExtensionContext) {
  activateInlineCompletionProvider(extensionContext)
  logInfo('Gemini Assistant extension activated')
}

export function deactivate() { }