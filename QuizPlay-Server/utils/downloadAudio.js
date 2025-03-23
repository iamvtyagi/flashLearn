const youtubeDlExec = require('youtube-dl-exec'); // Correct import
const fs = require("fs");
const path = require("path");
const { execSync } = require('child_process');

/**
 * Downloads and converts the audio of a YouTube video to MP3.
 * @param {string} videoUrl - The URL of the YouTube video.
 * @param {string} outputPath - The path to save the audio file.
 * @returns {Promise<string>} - The path to the saved MP3 file.
 */
const downloadAudio = async (videoUrl, outputPath) => {
  try {
    // Check if ffmpeg is installed
    try {
      execSync('ffmpeg -version', { stdio: 'ignore' });
    } catch (error) {
      throw new Error('FFmpeg is not installed. Please install FFmpeg to enable audio conversion.');
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    console.log(`Processing video: ${videoUrl}`);

    // Extract video ID from URL
    const extractVideoId = (url) => {
      const regex = /(?:youtube\.com\/(?:.*[?&]v=|embed\/)|youtu\.be\/)([^"&?/]+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    const outputFile = path.resolve(outputPath, `${videoId}.mp3`);
    console.log(`Output file path: ${outputFile}`);

    console.log('Downloading audio...');

    // Execute YouTube-DL command
    await youtubeDlExec(videoUrl, {
      output: outputFile,
      extractAudio: true,
      audioFormat: 'mp3',
      audioQuality: '0', // Best quality
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      addHeader: ['referer:youtube.com'],
    });

    // Verify if file exists after download
    if (!fs.existsSync(outputFile)) {
      throw new Error('Failed to download audio.');
    }

    console.log('Audio download completed successfully.');
    return outputFile;
  } catch (error) {
    console.error('Error in downloadAudio:', error.message);
    if (error.message.includes('FFmpeg is not installed')) {
      console.error('Installation instructions:\n' +
        '- On Ubuntu/Debian: sudo apt-get install ffmpeg\n' +
        '- On MacOS: brew install ffmpeg\n' +
        '- On Windows: Download from https://ffmpeg.org/download.html');
    }
    throw error;
  }
};

module.exports = downloadAudio;
