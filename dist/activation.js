"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleActivation = handleActivation;
const inlineCompletionProvider_1 = require("./providers/inlineCompletionProvider");
const logger_1 = require("./logger");
/**
 * Activation Handler
 * Params: ExtensionContext
 */
function handleActivation(extensionContext) {
    (0, logger_1.logInfo)('Handle activation started');
    (0, inlineCompletionProvider_1.activateInlineCompletionProvider)(extensionContext);
    (0, logger_1.logInfo)('Handle activation finished');
}
