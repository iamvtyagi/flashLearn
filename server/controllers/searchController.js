const { searchPlaylists } = require("../config/youtube");

async function search(req, res) {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Keyword is required." });

    const playlists = await searchPlaylists(query);
    res.json({ playlists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { search };


//Implements the logic for fetching playlists from YouTube API based on a user-provided keyword or query.