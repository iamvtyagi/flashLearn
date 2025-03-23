import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaylistCard = ({ playlist, onStartLearning }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Playlist Thumbnail */}
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {playlist.thumbnail ? (
          <img 
            src={playlist.thumbnail} 
            alt={playlist.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FiSearch className="text-gray-400 text-4xl" />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {playlist.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {playlist.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            By {playlist.channelTitle}
          </span>
          <button
            onClick={() => onStartLearning(playlist.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

const Playlists = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPlaylists = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/playlist-videos`, {
        params: { query },
        withCredentials: true
      });
      
      if (response.data.success) {
        setPlaylists(response.data.playlists);
      } else {
        throw new Error(response.data.error || 'Failed to fetch playlists');
      }
    } catch (error) {
      console.error('Error searching playlists:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchPlaylists(searchQuery);
    }
  };

  const handleStartLearning = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Learning Playlists
        </h1>
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 py-8">
          {error}
        </div>
      )}

      {/* Playlists Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onStartLearning={handleStartLearning}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && playlists.length === 0 && (
        <div className="text-center py-12">
          <FiSearch className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No playlists found
          </h3>
          <p className="text-gray-500">
            Try searching for different keywords or topics
          </p>
        </div>
      )}
    </div>
  );
};

export default Playlists;
