"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const inlineCompletionProvider_1 = require("./providers/inlineCompletionProvider");
const logger_1 = require("./logger");
function activate(extensionContext) {
    (0, inlineCompletionProvider_1.activateInlineCompletionProvider)(extensionContext);
    (0, logger_1.logInfo)('Gemini Assistant extension activated');
}
function deactivate() { }
