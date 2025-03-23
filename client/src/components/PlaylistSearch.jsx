import React, { useState } from 'react';
import axios from 'axios';

const PlaylistSearch = ({ onVideoSelect }) => {
  const [playlistId, setPlaylistId] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/playlist-videos`, {
        params: { playlistId },
        withCredentials: true
      });
      
      setVideos(response.data.videos);
      console.log(response.data.videos,"99");
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={playlistId}
            onChange={(e) => setPlaylistId(e.target.value)}
            placeholder="Enter YouTube Playlist ID"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onVideoSelect(video)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSearch;
