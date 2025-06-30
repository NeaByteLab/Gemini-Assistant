import * as vscode from 'vscode'
import { debounceFunction } from './utils/debounce'
import { activateInlineCompletionProvider } from './providers/inlineCompletionProvider'
import { registerCommands } from './commands'
import { logInfo } from './logger'

/**
 * Activate Extension With Debounced Inline Suggest Trigger
 * Params: ExtensionContext
 */
export function activate(extensionContext: vscode.ExtensionContext) {
  logInfo('Extension activated')
  registerCommands(extensionContext)
  activateInlineCompletionProvider(extensionContext)
  const debouncedTriggerSuggest = debounceFunction(() => {
    vscode.commands.executeCommand('editor.action.inlineSuggest.trigger')
  }, 1500)
  vscode.workspace.onDidChangeTextDocument(() => {
    debouncedTriggerSuggest()
  }, null, extensionContext.subscriptions)
}

export function deactivate() {
  logInfo('Extension deactivated')
}