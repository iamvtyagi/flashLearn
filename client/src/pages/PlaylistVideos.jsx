import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlay, FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const VideoPlayer = ({ videoId }) => {
    if (!videoId) return null;
    return (
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
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
            className={`bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] duration-200
            ${isActive ? "ring-2 ring-[#4285F4] shadow-md" : "shadow"}`}
            onClick={() => onVideoSelect(video)}
        >
            <div className="relative group">
                <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full aspect-video object-cover group-hover:brightness-90 transition-all duration-200"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="bg-white/90 p-3 rounded-full">
                        <FiPlay className="text-[#4285F4] text-xl" />
                    </div>
                </div>
                {isActive && (
                    <div className="absolute top-2 left-2 bg-[#4285F4] text-white text-xs px-2 py-1 rounded-full">Now Playing</div>
                )}
            </div>

            <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">{video.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{video.description}</p>
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
                    withCredentials: true,
                });

                if (response.data?.videos) {
                    const transformedData = {
                        title: response.data.videos[0]?.snippet?.channelTitle || "Playlist",
                        videoCount: response.data.videos.length,
                        videos: response.data.videos.map((item) => ({
                            id: item.snippet.resourceId.videoId,
                            title: item.snippet.title,
                            description: item.snippet.description,
                            thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
                            position: item.snippet.position,
                        })),
                    };

                    setPlaylist(transformedData);
                    if (transformedData.videos.length > 0) {
                        setSelectedVideo(transformedData.videos[0]);
                    }
                }
            } catch (error) {
                setError(error.message || "Failed to load playlist videos");
            } finally {
                setLoading(false);
            }
        };

        if (playlistId) {
            fetchPlaylistData();
        }
    }, [playlistId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#4285F4] border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="max-w-3xl mx-auto text-center bg-red-50 rounded-xl p-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => navigate("/playlists")}
                        className="inline-flex items-center px-6 py-2 bg-[#4285F4] text-white rounded-full hover:bg-[#3367D6] transition-colors gap-2"
                    >
                        <FiArrowLeft /> Back to Playlists
                    </button>
                </div>
            </div>
        );
    }

    if (!playlist?.videos?.length) {
        return (
            <div className="p-6">
                <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-xl p-8">
                    <p className="text-gray-600 mb-4">No videos found in this playlist.</p>
                    <button
                        onClick={() => navigate("/playlists")}
                        className="inline-flex items-center px-6 py-2 bg-[#4285F4] text-white rounded-full hover:bg-[#3367D6] transition-colors gap-2"
                    >
                        <FiArrowLeft /> Back to Playlists
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{playlist.title}</h1>
                    <p className="text-gray-600 mt-1">{playlist.videoCount} lessons in this course</p>
                </div>
                <button
                    onClick={() => navigate("/playlists")}
                    className="inline-flex items-center px-6 py-2 bg-[#4285F4] text-white rounded-full hover:bg-[#3367D6] transition-colors gap-2"
                >
                    <FiArrowLeft /> Back to Playlists
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {selectedVideo && (
                        <>
                            <VideoPlayer videoId={selectedVideo.id} />
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 flex-1 mr-4">{selectedVideo.title}</h2>
                                    <button
                                        onClick={() => navigate(`/quiz/${selectedVideo.id}`)}
                                        className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Take Quiz
                                    </button>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{selectedVideo.description}</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                        <h3 className="font-semibold text-gray-800">Course Content</h3>
                        <p className="text-sm text-gray-500 mt-1">{playlist.videoCount} lessons</p>
                    </div>

                    <div className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 custom-scrollbar">
                        {playlist.videos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                onVideoSelect={setSelectedVideo}
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
