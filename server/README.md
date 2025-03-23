# QuizPlay Server

## Setup

1. Install dependencies:
```bash
npm install
```
This will automatically download and set up FFmpeg.

2. Create a `.env` file with your environment variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

3. Start the server:
```bash
npm start
```

## Features

- YouTube video audio extraction
- JWT Authentication
- MongoDB integration
- FFmpeg for audio processing

## API Endpoints

### Video Processing
```
POST /api/process-video
Headers:
  - Authorization: Bearer <token>
Body:
  - videoUrl: YouTube video URL
```

## Notes

- FFmpeg binaries are downloaded automatically during installation
- Processed audio files are stored in the `temp/audio` directory
- The server uses `youtube-dl-exec` for reliable YouTube downloads
