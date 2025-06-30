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
exports.activateInlineCompletionProvider = activateInlineCompletionProvider;
const vscode = __importStar(require("vscode"));
const geminiClient_1 = require("../api/geminiClient");
const logger_1 = require("../logger");
/**
 * Delay Variable
 */
let lastFetchTime = 0;
let lastPromise = null;
/**
 * Throttled Fetch Gemini Suggestion
 * Params: PromptText, ApiKey
 */
async function throttledFetch(promptText, apiKey) {
    const now = Date.now();
    if (lastPromise && now - lastFetchTime < 1500) {
        (0, logger_1.logInfo)('Using cached Gemini suggestion');
        return lastPromise;
    }
    lastFetchTime = now;
    lastPromise = (0, geminiClient_1.fetchGeminiSuggestion)(promptText, apiKey);
    return lastPromise;
}
/**
 * Activate Inline Completion Provider
 * Params: ExtensionContext
 */
function activateInlineCompletionProvider(extensionContext) {
    let inlineProvider = {
        provideInlineCompletionItems: async function (document, position, _context, _cancelToken) {
            (0, logger_1.logInfo)('Inline completion requested');
            const startLine = Math.max(0, position.line - 10);
            const codeBlockContext = document.getText(new vscode.Range(new vscode.Position(startLine, 0), position));
            const extensionConfig = vscode.workspace.getConfiguration('geminiAssistant');
            const geminiApiKey = extensionConfig.get('geminiApiKey') || '';
            const aiSuggestion = await throttledFetch(codeBlockContext, geminiApiKey);
            if (!(aiSuggestion)) {
                (0, logger_1.logInfo)('No suggestion received');
                return null;
            }
            (0, logger_1.logInfo)('Suggestion received');
            (0, logger_1.logInfo)('AI suggestion content: ' + aiSuggestion);
            const item = new vscode.InlineCompletionItem(aiSuggestion, new vscode.Range(position, position));
            return [item];
        }
    };
    extensionContext.subscriptions.push(vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, inlineProvider));
    (0, logger_1.logInfo)('Inline completion provider registered');
}
