"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSettingsWebviewPanel = createSettingsWebviewPanel;
const vscode = __importStar(require("vscode"));
const configManager_1 = require("../utils/configManager");
/**
 * Create Settings Webview Panel With Gemini API Key Input
 * Params: ExtensionContext
 */
function createSettingsWebviewPanel(extensionContext) {
    let panel = vscode.window.createWebviewPanel('geminiAssistantSettings', 'Gemini Assistant Settings', vscode.ViewColumn.One, {
        enableScripts: true,
        localResourceRoots: [extensionContext.extensionUri]
    });
    const currentApiKey = (0, configManager_1.getGeminiApiKey)();
    panel.webview.html = getSettingsHtmlContent(currentApiKey);
    panel.webview.onDidReceiveMessage(message => {
        if (message.command === 'saveApiKey') {
            (0, configManager_1.saveGeminiApiKey)(message.apiKey);
            vscode.window.showInformationMessage('Gemini API Key saved.');
        }
    }, undefined, extensionContext.subscriptions);
    return panel;
}
function getSettingsHtmlContent(currentApiKey) {
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
  `;
}
