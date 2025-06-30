import * as vscode from 'vscode'

export function createSettingsWebviewPanel(extensionContext: vscode.ExtensionContext) {
  let webviewPanel = vscode.window.createWebviewPanel(
    'chatgptCopilotSettings',
    'ChatGPT Copilot Settings',
    vscode.ViewColumn.One,
    { enableScripts: true }
  )
  webviewPanel.webview.html = getSettingsHtmlContent()
  return webviewPanel
}

function getSettingsHtmlContent(): string {
  return "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>ChatGPT Copilot Settings</title></head><body><h2>ChatGPT Copilot Settings</h2><p>Settings content here</p></body></html>"
}