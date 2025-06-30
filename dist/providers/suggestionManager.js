"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSuggestions = clearSuggestions;
const logger_1 = require("../logger");
/**
 * Suggestion Manager Logic
 */
function clearSuggestions() {
    (0, logger_1.logInfo)('Suggestions cleared');
    return [];
}
