const ai = require("../services/gemini.service");
const { extractTextFromPDF } = require("../utils/pdfProcessor");

const generatePDFQuiz = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "PDF file is required" });
        }

        // Extract text from PDF
        const pdfText = await extractTextFromPDF(req.file.path);

        // Generate quiz using existing Gemini service
        const quiz = await ai.generateQuiz(pdfText);

        res.json(quiz);
    } catch (error) {
        console.error("Error generating quiz from PDF:", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { generatePDFQuiz };
