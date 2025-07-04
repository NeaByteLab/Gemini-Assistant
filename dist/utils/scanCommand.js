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
exports.scanAndExecuteGeminiCommand = scanAndExecuteGeminiCommand;
const vscode = __importStar(require("vscode"));
const logger_1 = require("../logger");
const geminiClient_1 = require("../api/geminiClient");
/**
 * Scan Editor For Gemini Command And Execute
 */
async function scanAndExecuteGeminiCommand() {
    let activeEditor = vscode.window.activeTextEditor;
    if (!(activeEditor)) {
        (0, logger_1.logInfo)('No active editor');
        return;
    }
    let document = activeEditor.document;
    let totalLines = document.lineCount;
    for (let lineIndex = 0; lineIndex < totalLines; lineIndex++) {
        let textLine = document.lineAt(lineIndex).text;
        if (textLine.trim().startsWith('// gemini-ask:')) {
            let commandText = textLine.split('// gemini-ask:')[1].trim();
            (0, logger_1.logInfo)('Gemini command found: ' + commandText);
            let extensionConfig = vscode.workspace.getConfiguration('geminiAssistant');
            let geminiApiKey = extensionConfig.get('geminiApiKey');
            let geminiResponse = await (0, geminiClient_1.fetchGeminiSuggestion)(commandText, geminiApiKey || '');
            if (geminiResponse) {
                let insertPosition = new vscode.Position(lineIndex + 1, 0);
                let editWorkspace = new vscode.WorkspaceEdit();
                editWorkspace.insert(document.uri, insertPosition, '// Gemini: ' + geminiResponse + '\n');
                await vscode.workspace.applyEdit(editWorkspace);
                (0, logger_1.logInfo)('Gemini response inserted');
            }
            else {
                (0, logger_1.logInfo)('No response from Gemini');
            }
        }
    }
}
