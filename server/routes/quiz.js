const express = require("express");
const { getQuizController } = require("../controllers/quizController");
const { generatePDFQuiz } = require("../controllers/pdfQuizController");
const pdfUpload = require("../config/multer");

const router = express.Router();

router.post("/quiz", getQuizController);
router.post("/pdf-quiz", pdfUpload.single("pdf"), generatePDFQuiz);

module.exports = router;
