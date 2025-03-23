const path = require('path');
const downloadAudio = require('../utils/downloadAudio');
const transcribeAudio = require('../utils/transcribe');
const { uploadAudio } = require('../utils/cloudinary');
const { generateMCQs } = require('../utils/quizGeneration');
const fs = require('fs');

async function downloadAndProcess(req, res) {
    let audioPath = null;
    try {
        const { videoUrl } = req.body;
        if (!videoUrl) {
            return res.status(400).json({ 
                success: false,
                error: "Video URL is required" 
            });
        }

        // Create output directory for audio files
        const outputPath = path.join(__dirname, '../temp/audio');
        
        // Download audio
        console.log('Processing video URL...');
        audioPath = await downloadAudio(videoUrl, outputPath);
        
        // Check if file exists and has size
        if (!fs.existsSync(audioPath) || fs.statSync(audioPath).size === 0) {
            throw new Error('Audio file not downloaded correctly');
        }

        // Upload to Cloudinary
        console.log('Uploading to Cloudinary...');
        const cloudinaryUrl = await uploadAudio(audioPath);

        // Delete local audio file after upload
        fs.unlinkSync(audioPath);
        console.log('Local audio file deleted');

        // Transcribe audio using Cloudinary URL
        console.log('Transcribing audio...');
        const transcript = await transcribeAudio(cloudinaryUrl);

        // Generate MCQs from transcript
        console.log('Generating MCQs...');
        console.log(transcript)
        const mcqs = await generateMCQs(transcript);

        res.json({ 
            success: true,
            audioUrl: cloudinaryUrl,
            transcript,
            mcqs,
            message: 'Audio processed and MCQs generated successfully'
        });
    } catch (error) {
        console.error('Error processing video:', error);

        // Clean up audio file if it exists and there was an error
        if (audioPath && fs.existsSync(audioPath)) {
            try {
                fs.unlinkSync(audioPath);
            } catch (cleanupError) {
                console.error('Error cleaning up audio file after error:', cleanupError);
            }
        }

        // Send appropriate error response
        const errorMessage = error.message || 'An unknown error occurred';
        const statusCode = error.code === 'ENOENT' ? 404 
            : error.code === 'ETIMEDOUT' ? 504
            : error.message.includes('timed out') ? 504
            : 500;

        res.status(statusCode).json({ 
            success: false,
            error: errorMessage
        });
    }
}

module.exports = { downloadAndProcess };
