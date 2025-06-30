// FLASHLEARN Gemini AI Logic
// Replace with your Gemini API key
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Call Gemini API with a prompt
 * @param {string} prompt - The prompt to send
 * @returns {Promise<string>} - The AI response text
 */
async function callGeminiAPI(prompt) {
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error.message || 'API returned an error');
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content)
            throw new Error('No response content received from API');
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
}

/**
 * Get learning suggestions for a topic
 * @param {string} topic
 * @returns {Promise<string>}
 */
export async function getLearningSuggestions(topic) {
    const prompt = `Provide 3 learning topics or study suggestions related to: ${topic}. Include a brief explanation for each topic and suggest a suitable color theme (as HEX codes) that represents the learning mood.`;
    return callGeminiAPI(prompt);
}

/**
 * Get daily boost challenge
 * @returns {Promise<string>}
 */
export async function getDailyChallenge() {
    const prompt = 'Give me a random learning topic or study suggestion for today. Make it creative and inspiring. Keep it under 100 words.';
    return callGeminiAPI(prompt);
}

/**
 * Get daily study tip
 * @returns {Promise<string>}
 */
export async function getDailyTip() {
    const prompt = 'Give me a random study tip for today. Make it practical and actionable. Keep it under 100 words.';
    return callGeminiAPI(prompt);
}

/**
 * Get daily quiz question
 * @returns {Promise<string>}
 */
export async function getDailyQuiz() {
    const prompt = 'Give me a multiple choice learning quiz question with 4 options (A, B, C, D) and the correct answer. Make it about learning principles.';
    return callGeminiAPI(prompt);
}

/**
 * Check grammar and style
 * @param {string} text
 * @returns {Promise<string>}
 */
export async function checkGrammar(text) {
    const prompt = `Analyze this text for grammar, spelling, punctuation, and style improvements. Provide specific suggestions with corrections:\n\n${text}`;
    return callGeminiAPI(prompt);
}

/**
 * Generate professional content
 * @param {string} type - blog, email, report, proposal, summary, social
 * @param {string} topic
 * @returns {Promise<string>}
 */
export async function generateContent(type, topic) {
    const prompts = {
        blog: `Write a professional blog post about: ${topic}. Include an engaging introduction, main points, and conclusion.`,
        email: `Write a professional email about: ${topic}. Use appropriate business tone and format.`,
        report: `Write a business report about: ${topic}. Include executive summary, key findings, and recommendations.`,
        proposal: `Write a project proposal about: ${topic}. Include objectives, methodology, timeline, and budget considerations.`,
        summary: `Write an executive summary about: ${topic}. Be concise and highlight key points.`,
        social: `Write an engaging social media post about: ${topic}. Include relevant hashtags and call-to-action.`
    };
    return callGeminiAPI(prompts[type]);
}

/**
 * Analyze writing for quality, tone, clarity, and suggestions
 * @param {string} text
 * @returns {Promise<string>}
 */
export async function analyzeWriting(text) {
    const prompt = `Analyze this text for writing quality, tone, clarity, and provide specific improvement suggestions:\n\n${text}`;
    return callGeminiAPI(prompt);
}

/**
 * Improve writing for clarity, grammar, style, and professional tone
 * @param {string} text
 * @returns {Promise<string>}
 */
export async function improveWriting(text) {
    const prompt = `Improve this text for clarity, grammar, style, and professional tone while maintaining the original meaning:\n\n${text}`;
    return callGeminiAPI(prompt);
}

// Optionally, export the API key setter for dynamic assignment
export function setGeminiApiKey(key) {
    window.GEMINI_API_KEY = key;
} 