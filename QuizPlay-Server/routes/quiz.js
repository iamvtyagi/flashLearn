const express = require("express");
const { getQuizController } = require("../controllers/quizController");
// const { generateQuiz } = require("../services/gemini.service");


const router = express.Router();

router.post("/quiz", getQuizController);

module.exports = router;
