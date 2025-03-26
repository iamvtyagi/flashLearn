import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaylistSearch from '../components/PlaylistSearch';
import QuizComponent from '../components/Quiz';

const LearningPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to search for playlists
  const searchPlaylists = async (query) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search?query=${query}`);
      // Assuming the response contains playlists
      if (response.data.playlists) {
        // Handle the playlists (you may want to set them in state)
        console.log(response.data.playlists); // For debugging
      } else {
        throw new Error('No playlists found');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch playlists');
    } finally {
      setLoading(false);
    }
  };

  // Automatically search for "react" when the component mounts
  useEffect(() => {
    searchPlaylists('react');
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setQuiz(null);
  };

  const handleStartLearning = async () => {
    if (!selectedVideo) return;
    
    setLoading(true);
    setError('');
    
    try {
      // First process the video to get transcript and generate MCQs
      const processResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/process-video`,
        { videoUrl: `https://www.youtube.com/watch?v=${selectedVideo.id}` },
        { withCredentials: true }
      );

      if (processResponse.data.success) {
        setQuiz(processResponse.data.mcqs);
      } else {
        throw new Error('Failed to generate quiz');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Learn from YouTube</h1>
        
        {!selectedVideo ? (
          <PlaylistSearch onVideoSelect={handleVideoSelect} />
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedVideo(null)}
              className="mb-4 text-blue-600 hover:text-blue-700"
            >
              ← Back to playlist
            </button>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                  title={selectedVideo.title}
                  className="w-full h-[400px]"
                  allowFullScreen
                ></iframe>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
              
              {!quiz && (
                <button
                  onClick={handleStartLearning}
                  disabled={loading}
                  className={`w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Generating Quiz...' : 'Start Learning'}
                </button>
              )}
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
            </div>
            
            {quiz && <QuizComponent questions={quiz} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
