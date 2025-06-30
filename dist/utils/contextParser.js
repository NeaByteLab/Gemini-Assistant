"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContextBeforeCursor = getContextBeforeCursor;
const logger_1 = require("../logger");
/**
 * Context Parser Utility
 * Params: Document, Position
 */
function getContextBeforeCursor(document, position) {
    (0, logger_1.logInfo)('Get context before cursor');
    let documentText = document.getText();
    let linesArray = documentText.split('\n');
    let contextArray = linesArray.slice(Math.max(0, position.line - 10), position.line);
    return contextArray.join('\n');
}
