import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = ({ mcqs: providedMcqs }) => {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mcqs, setMcqs] = useState(providedMcqs || null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [started, setStarted] = useState(false);

    const generateQuiz = async () => {
        if (providedMcqs) {
            setMcqs(providedMcqs);
            setStarted(true);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/process-video`,
                {
                    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
                    videoId: videoId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.data && Array.isArray(response.data.mcqs)) {
                setMcqs(response.data.mcqs);
                setStarted(true);
            } else {
                throw new Error("Invalid quiz data received from server");
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Failed to generate quiz");
            setStarted(false);
        } finally {
            setLoading(false);
        }
    };

    const updateQuizStats = async (finalScore) => {
        try {
            const token = localStorage.getItem("token");
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData || !userData.email) {
                console.error("User data not found in localStorage");
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/quiz/update-stats`,
                {
                    email: userData.email,
                    score: finalScore
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.data.success) {
                // Update localStorage with new stats
                userData.quizzes = response.data.quizzes;
                localStorage.setItem('userData', JSON.stringify(userData));
            }
        } catch (error) {
            console.error("Error updating quiz stats:", error);
        }
    };

    const handleAnswer = (selectedOption) => {
        if (!mcqs) return;

        const currentQ = mcqs[currentQuestion];
        const isCorrect = selectedOption === currentQ.answer;

        if (isCorrect) {
            setScore(score + 1);
        }

        if (currentQuestion < mcqs.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate final score based on correct answers
            const finalScore = score + (isCorrect ? 1 : 0);
            updateQuizStats(finalScore);
            setShowResults(true);
        }
    };

    if (!started && !loading) {
        return (
            <div className="text-center p-8">
                <button
                    onClick={generateQuiz}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
                >
                    Generate Quiz
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="ml-4">Generating quiz questions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-red-600 mb-4">{error}</p>
                <button onClick={generateQuiz} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Try Again
                </button>
            </div>
        );
    }

    if (showResults) {
        const percentage = (score / mcqs.length) * 100;
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
                    <div className="mb-6">
                        <p className="text-4xl font-bold text-blue-600">
                            {score} / {mcqs.length}
                        </p>
                        <p className="text-xl text-gray-600 mt-2">{Math.round(percentage)}% Correct</p>
                    </div>
                    {percentage >= 80 ? (
                        <p className="text-green-600 font-semibold">Excellent! You have a strong understanding!</p>
                    ) : percentage >= 60 ? (
                        <p className="text-yellow-600 font-semibold">Good effort! Review some concepts to improve.</p>
                    ) : (
                        <p className="text-red-600 font-semibold">Keep learning! Consider reviewing the fundamentals.</p>
                    )}
                    <button onClick={() => navigate(-1)} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                        Back
                    </button>
                </div>
            </div>
        );
    }

    if (!mcqs || mcqs.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="text-red-600 mb-4">No questions available</p>
                <button onClick={generateQuiz} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Try Again
                </button>
            </div>
        );
    }

    const currentQ = mcqs[currentQuestion];

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Quiz</h2>
                        <p className="text-gray-600">
                            Question {currentQuestion + 1} of {mcqs.length}
                        </p>
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                        <div
                            className="h-2 bg-blue-600 rounded transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / mcqs.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
                    <div className="space-y-3">
                        {Object.entries(currentQ.options).map(([key, value]) => (
                            <button
                                key={key}
                                onClick={() => handleAnswer(key)}
                                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                            >
                                {key}. {value}
                            </button>
                        ))}
                    </div>
                    {currentQ.explanation && <p className="mt-4 text-sm text-gray-600">{currentQ.explanation}</p>}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
