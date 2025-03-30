const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // User reference
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    questions: [
        {
            questionText: { type: String, required: true }, // Question
            options: { type: [String], required: true }, // Options
            correctAnswer: { type: String, required: true }, // Correct Answer
            userAnswer: { type: String, required: true } // User's Selected Answer
        }
    ]
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
