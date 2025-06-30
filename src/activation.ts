import { ExtensionContext } from 'vscode'
import { activateInlineCompletionProvider } from './providers/inlineCompletionProvider'
import { logInfo } from './logger'

/**
 * Activation Handler
 * Params: ExtensionContext
 */
export function handleActivation(extensionContext: ExtensionContext) {
  logInfo('Handle activation started')
  activateInlineCompletionProvider(extensionContext)
  logInfo('Handle activation finished')
}