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
exports.registerCommands = registerCommands;
const vscode = __importStar(require("vscode"));
const webviewPanel_1 = require("./views/webviewPanel");
const scanCommand_1 = require("./utils/scanCommand");
const logger_1 = require("./logger");
/**
 * Commands Registration
 * Params: ExtensionContext
 */
function registerCommands(extensionContext) {
    (0, logger_1.logInfo)('Register commands started');
    let extensionDisposable = vscode.commands.registerCommand('chatgptCopilot.showSettings', function () {
        (0, logger_1.logInfo)('Show settings command executed');
        (0, webviewPanel_1.createSettingsWebviewPanel)(extensionContext);
    });
    let geminiScanCommand = vscode.commands.registerCommand('geminiAssistant.scanAndExecuteCommand', function () {
        (0, logger_1.logInfo)('Scan and execute Gemini command executed');
        (0, scanCommand_1.scanAndExecuteGeminiCommand)();
    });
    extensionContext.subscriptions.push(extensionDisposable);
    extensionContext.subscriptions.push(geminiScanCommand);
    (0, logger_1.logInfo)('Register commands finished');
}
