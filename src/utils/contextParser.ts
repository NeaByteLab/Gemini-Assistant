import * as vscode from 'vscode'
import { logInfo } from '../logger'

/**
 * Context Parser Utility
 * Params: Document, Position
 */
export function getContextBeforeCursor(document: vscode.TextDocument, position: vscode.Position): string {
  logInfo('Get context before cursor')
  let documentText = document.getText()
  let linesArray = documentText.split('\n')
  let contextArray = linesArray.slice(Math.max(0, position.line - 10), position.line)
  return contextArray.join('\n')
}