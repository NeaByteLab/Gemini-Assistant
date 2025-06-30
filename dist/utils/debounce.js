"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounceFunction = debounceFunction;
/**
 * Debounce Function Utility
 * Params: Callback, WaitTime
 */
function debounceFunction(callback, waitTime) {
    let timeoutHandler = null;
    return function (...contextArgs) {
        if (timeoutHandler !== null) {
            clearTimeout(timeoutHandler);
        }
        timeoutHandler = setTimeout(function () {
            callback.apply(null, contextArgs);
            timeoutHandler = null;
        }, waitTime);
    };
}
