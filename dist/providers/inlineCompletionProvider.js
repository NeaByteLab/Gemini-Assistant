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
/**
 * Register Inline Completion Provider
 * Params: ExtensionContext
 */
const vscode = __importStar(require("vscode"));
const geminiClient_1 = require("../api/geminiClient");
const logger_1 = require("../logger");
function activateInlineCompletionProvider(extensionContext) {
    (0, logger_1.logInfo)('Activate inline completion provider');
    let inlineProvider = {
        provideInlineCompletionItems: async function (document, position, context, cancelToken) {
            (0, logger_1.logInfo)('Inline completion requested');
            let codeBlockContext = document.getText(new vscode.Range(new vscode.Position(Math.max(0, position.line - 10), 0), position));
            let extensionConfig = vscode.workspace.getConfiguration('geminiAssistant');
            let geminiApiKey = extensionConfig.get('geminiApiKey');
            (0, logger_1.logInfo)('Request suggestion to Gemini API');
            let aiSuggestion = await (0, geminiClient_1.fetchGeminiSuggestion)(codeBlockContext, geminiApiKey || '');
            if (!(aiSuggestion)) {
                (0, logger_1.logInfo)('No suggestion received');
                return [];
            }
            else {
                (0, logger_1.logInfo)('Suggestion received');
                (0, logger_1.logInfo)('AI suggestion content: ' + aiSuggestion);
                return [
                    new vscode.InlineCompletionItem(aiSuggestion, new vscode.Range(position, position))
                ];
            }
        }
    };
    extensionContext.subscriptions.push(vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, inlineProvider));
    (0, logger_1.logInfo)('Inline completion provider registered');
}
