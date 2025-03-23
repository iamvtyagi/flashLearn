import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Box, Typography, Button } from '@mui/material';

const Quiz = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const generateQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/quiz/generate`,
          { videoId },
          { withCredentials: true }
        );

        if (response.data) {
          setQuiz(response.data);
        }
      } catch (error) {
        console.error('Error generating quiz:', error);
        setError(error.response?.data?.message || 'Failed to generate quiz');
      } finally {
        setLoading(false);
      }
    };

    generateQuiz();
  }, [videoId]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    Object.entries(selectedAnswers).forEach(([questionIndex, answerIndex]) => {
      if (quiz.questions[questionIndex].correctAnswer === answerIndex) {
        correctCount++;
      }
    });
    const finalScore = (correctCount / quiz.questions.length) * 100;
    setScore(finalScore);
    setShowResults(true);

    // Save quiz results
    saveQuizResults(correctCount, finalScore);
  };

  const saveQuizResults = async (correctCount, finalScore) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/quiz/results`,
        {
          videoId,
          score: finalScore,
          correctAnswers: correctCount,
          totalQuestions: quiz.questions.length
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  const retryQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="max-w-2xl mx-auto p-6 text-center">
        <Typography color="error" variant="h6" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          className="mt-4"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  if (showResults) {
    return (
      <Box className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Typography variant="h4" gutterBottom>
            Quiz Results
          </Typography>
          <div className="my-8">
            <Typography variant="h2" color="primary">
              {Math.round(score)}%
            </Typography>
            <Typography variant="body1" className="mt-2">
              You got {Object.values(selectedAnswers).filter((answer, index) => 
                quiz.questions[index].correctAnswer === answer
              ).length} out of {quiz.questions.length} questions correct!
            </Typography>
          </div>
          <div className="space-x-4">
            <Button
              variant="contained"
              onClick={retryQuiz}
              className="mr-4"
            >
              Try Again
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Back to Video
            </Button>
          </div>
        </div>
      </Box>
    );
  }

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  return (
    <Box className="max-w-2xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {quiz?.questions.length}</span>
          <span>{Math.round((currentQuestionIndex + 1) / quiz?.questions.length * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz?.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <Typography variant="h6" gutterBottom>
          {currentQuestion?.question}
        </Typography>
        <div className="space-y-3 mt-4">
          {currentQuestion?.options.map((option, index) => (
            <Button
              key={index}
              fullWidth
              variant={selectedAnswers[currentQuestionIndex] === index ? "contained" : "outlined"}
              onClick={() => handleAnswerSelect(index)}
              className="justify-start text-left normal-case p-3"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
        >
          {currentQuestionIndex === quiz?.questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </Box>
  );
};

export default Quiz;
