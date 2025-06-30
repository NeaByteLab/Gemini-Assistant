import * as vscode from 'vscode'
import { getGeminiApiKey, saveGeminiApiKey } from '../utils/configManager'

/**
 * Create Settings Webview Panel With Gemini API Key Input
 * Params: ExtensionContext
 */
export function createSettingsWebviewPanel(extensionContext: vscode.ExtensionContext) {
  let panel = vscode.window.createWebviewPanel(
    'geminiAssistantSettings',
    'Gemini Assistant Settings',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [extensionContext.extensionUri]
    }
  )
  const currentApiKey = getGeminiApiKey()
  panel.webview.html = getSettingsHtmlContent(currentApiKey)
  panel.webview.onDidReceiveMessage(message => {
    if (message.command === 'saveApiKey') {
      saveGeminiApiKey(message.apiKey)
      vscode.window.showInformationMessage('Gemini API Key saved.')
    }
  }, undefined, extensionContext.subscriptions)
  return panel
}

function getSettingsHtmlContent(currentApiKey: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Gemini Assistant Settings</title>
      <style>
        body { font-family: sans-serif; margin: 20px; }
        label { font-weight: bold; display: block; margin-bottom: 8px; }
        input[type="text"] { width: 100%; padding: 8px; margin-bottom: 12px; font-size: 14px; }
        button { padding: 8px 16px; font-size: 14px; cursor: pointer; }
      </style>
    </head>
    <body>
      <h2>Gemini Assistant Settings</h2>
      <label for="apiKey">Google Gemini API Key:</label>
      <input type="text" id="apiKey" placeholder="Enter your Gemini API key here" value="${currentApiKey}" />
      <button onclick="saveApiKey()">Save</button>

      <script>
        const vscode = acquireVsCodeApi()
        function saveApiKey() {
          const apiKey = document.getElementById('apiKey').value
          vscode.postMessage({ command: 'saveApiKey', apiKey })
        }
      </script>
    </body>
    </html>
  `
}