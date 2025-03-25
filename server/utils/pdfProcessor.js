const fs = require("fs");
const pdf = require("pdf-parse");

const extractTextFromPDF = async (pdfPath) => {
    const dataBuffer = fs.readFileSync(pdfPath);

    try {
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        throw new Error("Failed to extract text from PDF");
    } finally {
        // Clean up the uploaded file
        fs.unlinkSync(pdfPath);
    }
};

module.exports = { extractTextFromPDF };
