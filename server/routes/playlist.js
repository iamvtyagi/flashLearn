const express = require("express");
const { getPlaylistVideos } = require("../controllers/playlistController");

const router = express.Router();

router.get("/playlist-videos", getPlaylistVideos);

module.exports = router;
