const { fetchPlaylistDetails } = require("../config/youtube");

async function getPlaylistVideos(req, res) {
  try {
    const { playlistId } = req.query;
    if (!playlistId) return res.status(400).json({ error: "Playlist ID is required." });

    const videos = await fetchPlaylistDetails(playlistId);
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getPlaylistVideos };


// Fetches the details of a specific playlist, including all its videos, from YouTube API. 