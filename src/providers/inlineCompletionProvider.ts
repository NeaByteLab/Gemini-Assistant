import * as vscode from 'vscode'
import { fetchGeminiSuggestion } from '../api/geminiClient'
import { logInfo } from '../logger'

/**
 * Delay Variable
 */
let lastFetchTime = 0
let lastPromise: Promise<string> | null = null

/**
 * Throttled Fetch Gemini Suggestion
 * Params: PromptText, ApiKey
 */
async function throttledFetch(promptText: string, apiKey: string): Promise<string> {
  const now = Date.now()
  if (lastPromise && now - lastFetchTime < 1500) {
    logInfo('Using cached Gemini suggestion')
    return lastPromise
  }
  lastFetchTime = now
  lastPromise = fetchGeminiSuggestion(promptText, apiKey)
  return lastPromise
}

/**
 * Activate Inline Completion Provider
 * Params: ExtensionContext
 */
export function activateInlineCompletionProvider(extensionContext: vscode.ExtensionContext) {
  let inlineProvider: vscode.InlineCompletionItemProvider = {
    provideInlineCompletionItems: async function (
      document: vscode.TextDocument,
      position: vscode.Position,
      _context: vscode.InlineCompletionContext,
      _cancelToken: vscode.CancellationToken
    ): Promise<vscode.InlineCompletionItem[] | vscode.InlineCompletionList | null> {
      logInfo('Inline completion requested')
      const startLine = Math.max(0, position.line - 10)
      const codeBlockContext = document.getText(new vscode.Range(new vscode.Position(startLine, 0), position))
      const extensionConfig = vscode.workspace.getConfiguration('geminiAssistant')
      const geminiApiKey = extensionConfig.get<string>('geminiApiKey') || ''
      const aiSuggestion = await throttledFetch(codeBlockContext, geminiApiKey)
      if (!(aiSuggestion)) {
        logInfo('No suggestion received')
        return null
      }
      logInfo('Suggestion received')
      logInfo('AI suggestion content: ' + aiSuggestion)
      const item = new vscode.InlineCompletionItem(aiSuggestion, new vscode.Range(position, position))
      return [item]
    }
  }
  extensionContext.subscriptions.push(vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, inlineProvider))
  logInfo('Inline completion provider registered')
}