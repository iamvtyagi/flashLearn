import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReactQuiz = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const quizData = {
    questions: [
      {
        question: "What is React?",
        options: [
          "A JavaScript library for building user interfaces",
          "A programming language",
          "A database management system",
          "A web server"
        ],
        correctAnswer: 0
      },
      {
        question: "What is JSX?",
        options: [
          "A JavaScript XML parser",
          "A syntax extension for JavaScript that allows HTML in React",
          "A new JavaScript framework",
          "A testing library for React"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the virtual DOM?",
        options: [
          "A complete copy of the actual DOM",
          "A lightweight copy of the actual DOM used by React for performance",
          "A new web browser feature",
          "A JavaScript engine"
        ],
        correctAnswer: 1
      },
      {
        question: "What hook is used for side effects in React?",
        options: [
          "useState",
          "useContext",
          "useEffect",
          "useReducer"
        ],
        correctAnswer: 2
      },
      {
        question: "What is the purpose of useState?",
        options: [
          "To manage component lifecycle",
          "To handle HTTP requests",
          "To manage component state",
          "To handle routing"
        ],
        correctAnswer: 2
      },
      {
        question: "How do you pass data from parent to child component?",
        options: [
          "Using state",
          "Using props",
          "Using context",
          "Using effects"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of key prop in lists?",
        options: [
          "To style list items",
          "To help React track which items changed, added, or removed",
          "To make lists sortable",
          "To add event listeners"
        ],
        correctAnswer: 1
      },
      {
        question: "What is React state used for?",
        options: [
          "Storing static data",
          "Managing component rendering and data that changes over time",
          "Handling API calls",
          "Creating routes"
        ],
        correctAnswer: 1
      },
      {
        question: "What is a controlled component?",
        options: [
          "A component with many children",
          "A component that controls other components",
          "A form element whose value is controlled by React state",
          "A component with no state"
        ],
        correctAnswer: 2
      },
      {
        question: "What is the purpose of useEffect cleanup function?",
        options: [
          "To clean up memory leaks",
          "To remove event listeners and cancel subscriptions",
          "To clear the component state",
          "To reset the DOM"
        ],
        correctAnswer: 1
      }
    ]
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const renderResults = () => {
    const percentage = (score / quizData.questions.length) * 100;
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="mb-6">
          <p className="text-4xl font-bold text-blue-600">
            {score} / {quizData.questions.length}
          </p>
          <p className="text-xl text-gray-600 mt-2">
            {percentage}% Correct
          </p>
        </div>
        {percentage >= 80 ? (
          <p className="text-green-600 font-semibold">Excellent! You have a strong understanding of React!</p>
        ) : percentage >= 60 ? (
          <p className="text-yellow-600 font-semibold">Good effort! Review some React concepts to improve your score.</p>
        ) : (
          <p className="text-red-600 font-semibold">Keep learning! Consider reviewing React fundamentals.</p>
        )}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Back
        </button>
      </div>
    );
  };

  if (!started) {
    return (
      <div className="text-center p-8">
        <button
          onClick={() => setStarted(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          Generate Quiz
        </button>
      </div>
    );
  }

  if (showResults) {
    return renderResults();
  }

  const currentQ = quizData.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">React Quiz</h2>
          <p className="text-gray-600">Question {currentQuestion + 1} of {quizData.questions.length}</p>
        </div>
        <div className="h-2 bg-gray-200 rounded">
          <div 
            className="h-2 bg-blue-600 rounded transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReactQuiz;