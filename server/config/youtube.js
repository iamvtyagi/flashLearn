require("dotenv").config();
const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

async function searchPlaylists(query) {
  const url = `${BASE_URL}/search?part=snippet&type=playlist&q=${query}&maxResults=10&key=${YOUTUBE_API_KEY}`;
  const response = await axios.get(url);
  return response.data.items;
}

async function fetchPlaylistDetails(playlistId) {
  const url = `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}`;
  const response = await axios.get(url);
  return response.data.items;
}

module.exports = { searchPlaylists, fetchPlaylistDetails };


/*
Provides reusable functions to:
Search for playlists based on user queries.
Fetch details (like videos) from a specific playlist.
*/