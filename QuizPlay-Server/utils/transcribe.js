const AssemblyAI = require('assemblyai').AssemblyAI;

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY
});

/**
 * Transcribes audio from a URL.
 * @param {string} audioUrl - The URL of the audio file to transcribe.
 * @returns {Promise<string>} - The transcribed text.
 */
const transcribeAudio = async (audioUrl) => {
  try {
    console.log('Starting transcription...');
    const config = {
      audio_url: audioUrl
    };

    const transcript = await client.transcripts.transcribe(config);
    
    if (!transcript || !transcript.text) {
      throw new Error('Failed to transcribe audio');
    }

    console.log('Transcription completed successfully');
    return transcript.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};

module.exports = transcribeAudio;