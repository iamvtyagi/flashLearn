const geminiModel = require('../config/gemini');

/**
 * Generates MCQs from the given transcript text using Google's Gemini API
 * @param {string} transcript - The transcript text to generate MCQs from
 * @returns {Promise<Array>} - Array of MCQ objects
 */
const generateMCQs = async (transcript) => {
    try {
        console.log('Generating MCQs from transcript...');
        console.log(transcript)
        
        const prompt = `Generate 10 multiple choice questions based on the following transcript. Return ONLY a JSON array without any markdown formatting or additional text. Each question should be a JSON object with this exact structure:
        {
            "question": "The question text",
            "options": ["option1", "option2", "option3", "option4"],
            "correctAnswer": "The correct option",
            "explanation": "Brief explanation of why this is correct"
        }
        
        Transcript: ${transcript} select the keywords and generate quiz according to that`;

        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        let mcqsText = response.text();
        
        // Clean up the response by removing any markdown formatting
        mcqsText = mcqsText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        try {
            // Parse the response to get MCQs
            const mcqs = JSON.parse(mcqsText);
            console.log('MCQs generated successfully');
            return mcqs;
        } catch (parseError) {
            console.error('Failed to parse MCQs response:', mcqsText);
            throw new Error('Failed to parse MCQs response: ' + parseError.message);
        }
    } catch (error) {
        console.error('Error generating MCQs:', error);
        throw error;
    }
};
module.exports = { generateMCQs };

