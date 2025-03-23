import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const { videoId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mcqs, setMcqs] = useState(null);

  useEffect(() => {
    const generateQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/process-video`,
          { videoUrl: `https://www.youtube.com/watch?v=${videoId}` },
          { withCredentials: true }
        );
        setMcqs(response.data);
      } catch (error) {
        setError('Failed to generate quiz');
      } finally {
        setLoading(false);
      }
    };

    generateQuiz();
  }, [videoId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return <pre>{JSON.stringify(mcqs, null, 2)}</pre>;
};

export default Quiz;
