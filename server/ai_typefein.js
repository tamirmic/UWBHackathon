const axios = require('axios')
require('dotenv').config();


const API_KEY = process.env.API_KEY;
const { GoogleGenerativeAI } = require("@google/generative-ai");
console.log(API_KEY)

const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const formatPrompt = (object) => {
    return `You are a high level consulting agent, but for small restaurants. Read the following customer reviews and give specific actionable feedback on what the bussiness should do to best improve and increase profit. 

Please format the response in short sections headed by bold text. Start each section title with an impact level tag in square brackets: [HIGH IMPACT], [MEDIUM IMPACT], or [LOW IMPACT] based on how important the issue is for business success. For example: **[HIGH IMPACT] Food Quality Issues**

In each section include description of the issue along with a bulleted list of actionable imrovable items. Try to limit whitespace in response. Please keep each section breif! Prioritize your feedback from most important to least important issues, focusing on changes that would have the highest impact on customer satisfaction and business growth first. Here are the reviews "${object}"`;
};

const geminiResponse = async (object) => {
    console.log("API Key:", API_KEY);

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Ensure the prompt always follows the correct question format
        const formattedPrompt = formatPrompt(object);

        const result = await model.generateContent(formattedPrompt);
        
        // Extract response properly
        const responseText = await result.response.text();

        return responseText;
    } catch (error) {
        console.error('Gemini API Error:', error);
        return 'Error fetching response.';
    }
};

module.exports = {
    geminiResponse
}
