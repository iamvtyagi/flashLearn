import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mcqs, setMcqs] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);

  const generateQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Making API request with:", {
        videoId,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`
      });

      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Make the API call with authorization header
      const response = await axios.post(
        'http://localhost:5000/api/process-video',
        {
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          videoId: videoId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true // Include cookies if using session-based auth
        }
      );

      console.log("Full API Response:", response);

      if (response.data && Array.isArray(response.data.mcqs)) {
        setMcqs(response.data.mcqs);
        setStarted(true);
      } else {
        throw new Error('Invalid quiz data received from server');
      }
    } catch (error) {
      console.error("Detailed error:", error);
      if (error.response?.status === 401) {
        setError('Please login to generate a quiz');
        // Optionally redirect to login page
        // navigate('/login');
      } else {
        setError(
          error.response?.data?.message || 
          error.message || 
          'Failed to generate quiz. Please try again.'
        );
      }
      setStarted(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selectedOption) => {
    if (!mcqs) return;
    
    const currentQ = mcqs[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    if (currentQuestion < mcqs.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
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
        <button
          onClick={generateQuiz}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
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
            <p className="text-xl text-gray-600 mt-2">
              {Math.round(percentage)}% Correct
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Video
          </button>
        </div>
      </div>
    );
  }

  if (!mcqs || mcqs.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">No questions available</p>
        <button
          onClick={generateQuiz}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
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
            <h2 className="text-xl font-bold">Video Quiz</h2>
            <p className="text-gray-600">Question {currentQuestion + 1} of {mcqs.length}</p>
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
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300"
              >
                {option}
              </button>
            ))}
          </div>
          {currentQ.explanation && (
            <p className="mt-4 text-sm text-gray-600">
              {currentQ.explanation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
