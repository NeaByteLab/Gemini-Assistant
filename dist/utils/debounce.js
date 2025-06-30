"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounceFunction = debounceFunction;
/**
 * Debounce Function Utility
 * Params: Callback, WaitTime
 */
const logger_1 = require("../logger");
function debounceFunction(callback, waitTime) {
    let timeoutHandler;
    return function (...contextArgs) {
        (0, logger_1.logInfo)('Debounce function called');
        if (timeoutHandler) {
            clearTimeout(timeoutHandler);
        }
        timeoutHandler = setTimeout(function () {
            callback.apply(null, contextArgs);
        }, waitTime);
    };
}
