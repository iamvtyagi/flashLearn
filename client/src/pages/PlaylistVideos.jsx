import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiYoutube, FiClock, FiCalendar, FiPlay } from 'react-icons/fi';
import axios from 'axios';

const VideoPlayer = ({ videoId }) => {
  if (!videoId) return null;
  
  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const VideoCard = ({ video, onVideoSelect, isActive }) => {
  if (!video) return null;
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer
        ${isActive ? 'ring-2 ring-blue-500' : ''}`}
      onClick={() => onVideoSelect(video)}
    >
      {/* Video Thumbnail */}
      <div className="relative group">
        <img 
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <FiPlay className="text-white text-6xl" />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h4>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
};

const PlaylistVideos = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/playlist-videos`, {
          params: { playlistId },
          withCredentials: true
        });
        
        if (response.data) {
          setPlaylist(response.data);
          if (response.data.videos?.length > 0) {
            setSelectedVideo(response.data.videos[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching playlist data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (playlistId) {
      fetchPlaylistData();
    }
  }, [playlistId]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/playlists')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Playlists
        </button>
      </div>
    );
  }

  if (!playlist?.videos || playlist.videos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 mb-4">No videos found in this playlist.</p>
        <button 
          onClick={() => navigate('/playlists')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Playlists
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {playlist.title}
          </h1>
          <p className="text-gray-600 mt-2">
            {playlist.videoCount} videos
          </p>
        </div>
        <button 
          onClick={() => navigate('/playlists')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Playlists
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Video Player and Info */}
        <div className="lg:col-span-2 space-y-6">
          {selectedVideo && (
            <>
              <VideoPlayer videoId={selectedVideo.id} />
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedVideo.title}
                  </h2>
                  <button
                    onClick={() => navigate(`/quiz/${playlistId}`)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    Start Quiz
                  </button>
                </div>
                <p className="text-gray-600">
                  {selectedVideo.description}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Playlist Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Course Videos</h3>
            <p className="text-sm text-gray-500">{playlist.videoCount} videos</p>
          </div>
          
          {/* Video List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {playlist.videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                onVideoSelect={handleVideoSelect}
                isActive={selectedVideo?.id === video.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideos;