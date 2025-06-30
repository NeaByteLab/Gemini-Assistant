import * as vscode from 'vscode'
import { logInfo } from '../logger'
import { fetchGeminiSuggestion } from '../api/geminiClient'

/**
 * Scan Editor For Gemini Command And Execute
 */
export async function scanAndExecuteGeminiCommand() {
  let activeEditor = vscode.window.activeTextEditor
  if (!(activeEditor)) {
    logInfo('No active editor')
    return
  }
  let document = activeEditor.document
  let totalLines = document.lineCount

  for (let lineIndex = 0; lineIndex < totalLines; lineIndex++) {
    let textLine = document.lineAt(lineIndex).text
    if (textLine.trim().startsWith('// gemini-ask:')) {
      let commandText = textLine.split('// gemini-ask:')[1].trim()
      logInfo('Gemini command found: ' + commandText)
      let extensionConfig = vscode.workspace.getConfiguration('geminiAssistant')
      let geminiApiKey = extensionConfig.get<string>('geminiApiKey')
      let geminiResponse = await fetchGeminiSuggestion(commandText, geminiApiKey || '')
      if (geminiResponse) {
        let insertPosition = new vscode.Position(lineIndex + 1, 0)
        let editWorkspace = new vscode.WorkspaceEdit()
        editWorkspace.insert(document.uri, insertPosition, '// Gemini: ' + geminiResponse + '\n')
        await vscode.workspace.applyEdit(editWorkspace)
        logInfo('Gemini response inserted')
      } else {
        logInfo('No response from Gemini')
      }
    }
  }
}