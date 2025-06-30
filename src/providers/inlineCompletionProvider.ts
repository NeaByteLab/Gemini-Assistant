import * as vscode from 'vscode'
import { fetchGeminiSuggestion } from '../api/geminiClient'
import { logInfo } from '../logger'

/**
 * Register Inline Completion Provider
 * Params: ExtensionContext
 */
export function activateInlineCompletionProvider(extensionContext: vscode.ExtensionContext) {
  logInfo('Activate inline completion provider')
  let inlineProvider = {
    provideInlineCompletionItems: async function (
      document: vscode.TextDocument,
      position: vscode.Position,
      context: vscode.InlineCompletionContext,
      cancelToken: vscode.CancellationToken
    ) {
      logInfo('Inline completion requested')
      let codeBlockContext = document.getText(
        new vscode.Range(
          new vscode.Position(Math.max(0, position.line - 10), 0),
          position
        )
      )
      let extensionConfig = vscode.workspace.getConfiguration('geminiAssistant')
      let geminiApiKey = extensionConfig.get<string>('geminiApiKey')
      logInfo('Request suggestion to Gemini API')
      let aiSuggestion = await fetchGeminiSuggestion(codeBlockContext, geminiApiKey || '')
      if (!(aiSuggestion)) {
        logInfo('No suggestion received')
        return []
      } else {
        logInfo('Suggestion received')
        logInfo('AI suggestion content: ' + aiSuggestion)
        return [
          new vscode.InlineCompletionItem(aiSuggestion, new vscode.Range(position, position))
        ]
      }
    }
  }
  extensionContext.subscriptions.push(
    vscode.languages.registerInlineCompletionItemProvider(
      { pattern: '**' }, inlineProvider
    )
  )
  logInfo('Inline completion provider registered')
}