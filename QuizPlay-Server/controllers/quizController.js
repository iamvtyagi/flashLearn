const ai = require("../services/gemini.service");

const getQuizController = async (req, res) => {
  try {
    const { transcript } = req.body; // Get transcript from request body

    if (!transcript) {
      return res.status(400).json({ message: "Transcript is required" });
    }

    const quiz = await ai.generateQuiz(transcript);
    res.json(quiz);
  } catch (error) {
    console.error("Error generating quiz:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getQuizController };
