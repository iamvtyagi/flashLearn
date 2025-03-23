import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizComponent from '../components/Quiz';
// import { UserContext } from '../context/users.context';

const QuizPage = () => {
  const { videoId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState(location.state?.transcript);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(videoId,"4545");
  
  useEffect(() => {
    const fetchTranscript = async () => {
      if (!transcript && videoId) {
        try {
          setLoading(true);
          setError(null);
          
          // Using a sample transcript for testing
          const sampleTranscript = `This video covers important educational content.
            Key points discussed include:
            - Introduction to the subject matter
            - Core concepts and principles
            - Practical applications and examples
            - Review and summary of key points`;
          
          setTranscript(sampleTranscript);
        } catch (error) {
          console.error('Error fetching transcript:', error);
          setError('Failed to load video transcript. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTranscript();
  }, [videoId, transcript]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="ml-4 text-gray-600">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Video
          </button>
        </div>
      </div>
    );
  }

  if (!transcript) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500 mb-4">No transcript available for this quiz.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Video
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Video Quiz</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Video
          </button>
        </div>
        <QuizComponent 
          videoId={videoId} 
          transcript={transcript}
        />
      </div>
    </div>
  );
};

export default QuizPage;
