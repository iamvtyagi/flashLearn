const ai = require("../services/gemini.service");
const userModel = require('../models/user.model');

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

const updateQuizStats = async (req, res) => {
  try {
    const { email, score } = req.body; // score is now the number of correct answers
    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update quiz stats
    user.quizzes.totalQuizzes += 1; // Increment total quizzes
    user.quizzes.totalScore += score; // Add the score (number of correct answers)
    await user.save();

    res.json({
      success: true,
      message: "Quiz stats updated successfully",
      quizzes: user.quizzes
    });
  } catch (error) {
    console.error("Error updating quiz stats:", error);
    res.status(500).json({ message: "Failed to update quiz stats" });
  }
};

module.exports = { 
  getQuizController,
  updateQuizStats 
};
