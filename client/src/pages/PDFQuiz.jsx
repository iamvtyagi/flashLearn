import React, { useState } from "react";
import axios from "axios";
import Quiz from "./Quiz";

const PDFQuiz = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [quizData, setQuizData] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setError(null);
        } else {
            setError("Please select a valid PDF file");
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a PDF file");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);

        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("token");
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pdf-quiz`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            setQuizData(response.data);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to generate quiz");
        } finally {
            setLoading(false);
        }
    };

    if (quizData) {
        return <Quiz mcqs={quizData.questions} />;
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Generate Quiz from PDF</h2>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Upload PDF</label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                        />
                        <button
                            onClick={handleUpload}
                            disabled={!file || loading}
                            className={`px-4 py-2 rounded-md text-white font-semibold
                ${loading || !file ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
                transition-colors`}
                        >
                            {loading ? "Generating..." : "Generate Quiz"}
                        </button>
                    </div>
                    {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
                </div>

                {loading && (
                    <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        <p className="text-gray-600">Generating quiz from PDF...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFQuiz;
