const express = require('express');
const router = express.Router();
const { downloadAndProcess } = require('../controllers/videoController');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to download audio from YouTube video
router.post('/process-video', authMiddleware.authUser, downloadAndProcess);

module.exports = router;
