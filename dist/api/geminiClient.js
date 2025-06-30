"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGeminiSuggestion = fetchGeminiSuggestion;
const node_fetch_1 = __importDefault(require("node-fetch"));
const logger_1 = require("../logger");
/**
 * Gemini Client Request
 * Params: PromptText, ApiKey
 */
async function fetchGeminiSuggestion(promptText, apiKey) {
    (0, logger_1.logInfo)('Fetch Gemini suggestion called');
    if (!(promptText)) {
        (0, logger_1.logInfo)('Prompt text missing');
        return '';
    }
    if (!(apiKey)) {
        (0, logger_1.logInfo)('API Key missing');
        return '';
    }
    let geminiResponse = await (0, node_fetch_1.default)('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: promptText }
                    ]
                }
            ]
        })
    });
    if (geminiResponse.ok) {
        let geminiData = await geminiResponse.json();
        if (geminiData.candidates && geminiData.candidates[0]) {
            (0, logger_1.logInfo)('Gemini suggestion received');
            return geminiData.candidates[0].content.parts[0].text;
        }
        else {
            (0, logger_1.logInfo)('No suggestion in Gemini response');
            return '';
        }
    }
    else {
        let errorText = await geminiResponse.text();
        (0, logger_1.logInfo)('Gemini error: ' + errorText);
        return '';
    }
}
