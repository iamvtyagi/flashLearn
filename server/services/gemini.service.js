const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
  }
});

const generateQuiz = async (transcript) => {
  try {
    const prompt = `Generate a quiz from this transcript. Return a JSON object in this exact format:
    {
      "quizTitle": "Generated Quiz Title",
      "questions": [
        {
          "question": "Question text here?",
          "options": {
            "A": "Option 1",
            "B": "Option 2",
            "C": "Option 3",
            "D": "Option 4"
          },
          "answer": "Correct Option (A, B, C, or D)",
          "explanation": "Brief explanation for the correct answer."
        }
      ]
    }

    Rules:
    - Generate exactly 10 MCQs
    - Questions must be clear and concise
    - Each question must have 4 options (A, B, C, D)
    - Provide correct answer and explanation
    - Return valid JSON only

    Transcript: "${transcript}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Clean any potential markdown formatting and parse JSON
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse quiz response:', cleanedText);
      throw new Error('Failed to generate valid quiz format');
    }
  } catch (err) {
    console.error("Error generating quiz:", err);
    throw new Error("Failed to generate quiz");
  }
};

module.exports = { generateQuiz };
