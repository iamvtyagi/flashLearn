import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaylistCard = ({ playlist, onStartLearning }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      {/* Playlist Thumbnail */}
      <div className="h-48 bg-[#F8F9FA] relative overflow-hidden">
        {playlist.thumbnail ? (
          <img 
            src={playlist.thumbnail} 
            alt={playlist.title}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-[#4285F4]/10 to-[#34A853]/10">
            <FiSearch className="text-[#4285F4] text-4xl" />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-[#2D3748] mb-2 line-clamp-2 text-lg">
          {playlist.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {playlist.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#4285F4] font-medium">
            By {playlist.channelTitle}
          </span>
          <button
            onClick={() => onStartLearning(playlist.id)}
            className="px-6 py-2 bg-[#FF6D00] text-white rounded-full hover:bg-[#FF9A00] transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
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
  const [hasSearched, setHasSearched] = useState(false);

  const searchPlaylists = async (query) => {
    setHasSearched(true);
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search`, {
        params: { query },
        withCredentials: true
      });
      
      if (response.data.playlists) {
        // Transform the YouTube API response to match your component's format
        const transformedPlaylists = response.data.playlists.map(item => ({
          id: item.id.playlistId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle
        }));
        
        setPlaylists(transformedPlaylists);
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
    <div className="min-h-screen bg-[#F8F9FA] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-2 mt-12 text-center">
          <h1 className="text-4xl font-bold text-[#2D3748] mb-4">
            Discover Learning Playlists
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Search through curated educational playlists to enhance your learning journey
          </p>
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for programming, science, math playlists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 pr-12 rounded-full border-2 border-[#4285F4]/20 focus:outline-none focus:border-[#4285F4] transition-all duration-300 text-[#2D3748]"
                />
                <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4285F4] text-xl" />
              </div>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-[#4285F4] text-white rounded-full hover:bg-[#3367D6] transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#4285F4] border-t-transparent mb-4"></div>
            <p className="text-gray-600">Searching for playlists...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-[#EA4335]/10 rounded-2xl">
            <div className="text-[#EA4335] max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && !hasSearched && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#4285F4]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="text-[#4285F4] text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-[#2D3748] mb-3">
              Ready to Start Learning?
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Search for topics like "JavaScript tutorials", "Python programming", or any subject you're interested in learning
            </p>
          </div>
        )}

        {/* Playlists Grid */}
        {!loading && !error && hasSearched && (
          <>
            {playlists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {playlists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onStartLearning={handleStartLearning}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-xl font-medium text-[#2D3748] mb-2">
                  No playlists found
                </h3>
                <p className="text-gray-600">
                  Try searching with different keywords or topics
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Playlists;