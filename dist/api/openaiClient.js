"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOpenAISuggestion = fetchOpenAISuggestion;
const node_fetch_1 = __importDefault(require("node-fetch"));
const logger_1 = require("../logger");
/**
 * OpenAI Client Request
 * Params: PromptText, ApiKey
 */
async function fetchOpenAISuggestion(promptText, apiKey) {
    (0, logger_1.logInfo)('Fetch OpenAI suggestion called');
    if (!(promptText)) {
        (0, logger_1.logInfo)('Prompt text missing');
        return '';
    }
    else {
        if (!(apiKey)) {
            (0, logger_1.logInfo)('API Key missing');
            return '';
        }
        else {
            (0, logger_1.logInfo)('Sending request to OpenAI API');
            let openaiResponse = await (0, node_fetch_1.default)('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        { role: 'system', content: 'You are a code completion copilot' },
                        { role: 'user', content: promptText }
                    ],
                    max_tokens: 256,
                    temperature: 0.2
                })
            });
            if (openaiResponse.ok) {
                let openaiData = await openaiResponse.json();
                if (openaiData.choices && openaiData.choices[0]) {
                    (0, logger_1.logInfo)('OpenAI suggestion received');
                    return openaiData.choices[0].message.content;
                }
                else {
                    (0, logger_1.logInfo)('No suggestion in OpenAI response');
                    return '';
                }
            }
            else {
                (0, logger_1.logInfo)('OpenAI response not ok');
                return '';
            }
        }
    }
}
