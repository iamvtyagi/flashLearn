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
        <div className="min-h-screen bg-[#F8F9FA] mt-12 p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-[#4285F4]">
                    {/* Header Section */}
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-[#4285F4]/10 rounded-full flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-[#4285F4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#2D3748]">Generate Quiz from PDF</h2>
                    </div>

                    {/* Upload Section */}
                    <div className="mb-8">
                        <div className="border-2 border-dashed border-[#4285F4]/30 rounded-xl p-8 text-center hover:border-[#4285F4] transition-colors duration-300">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                                id="pdf-upload"
                            />
                            <label
                                htmlFor="pdf-upload"
                                className="cursor-pointer flex flex-col items-center"
                            >
                                <svg className="w-16 h-16 text-[#4285F4]/60 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="text-lg font-medium text-[#2D3748] mb-2">
                                    {file ? file.name : 'Drop your PDF here, or click to browse'}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Maximum file size: 10MB
                                </span>
                            </label>
                        </div>

                        {error && (
                            <div className="mt-4 p-4 bg-[#EA4335]/10 rounded-lg flex items-center">
                                <svg className="w-5 h-5 text-[#EA4335] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[#EA4335]">{error}</span>
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleUpload}
                            disabled={!file || loading}
                            className={`
                                px-8 py-3 rounded-full font-medium
                                flex items-center justify-center min-w-[200px]
                                transition-all duration-300 transform
                                ${loading || !file 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#FF6D00] text-white hover:bg-[#FF9A00] hover:scale-105 shadow-lg hover:shadow-xl'
                                }
                            `}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating Quiz...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Generate Quiz
                                </>
                            )}
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="mt-8 text-center">
                            <div className="w-full max-w-md mx-auto bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853] w-1/2 animate-pulse"></div>
                            </div>
                            <p className="text-gray-600">Analyzing PDF content and generating questions...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PDFQuiz;
