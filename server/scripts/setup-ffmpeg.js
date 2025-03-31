const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const os = require('os');
const execAsync = promisify(exec);

const FFMPEG_URL = 'https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip';
const DOWNLOAD_PATH = path.join(__dirname, '../temp/ffmpeg.zip');
const EXTRACT_PATH = path.join(__dirname, '../bin');

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', err => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function setupFFmpeg() {
    try {
        // Create directories if they don't exist
        if (!fs.existsSync(path.dirname(DOWNLOAD_PATH))) {
            fs.mkdirSync(path.dirname(DOWNLOAD_PATH), { recursive: true });
        }
        if (!fs.existsSync(EXTRACT_PATH)) {
            fs.mkdirSync(EXTRACT_PATH, { recursive: true });
        }

        console.log('Downloading FFmpeg...');
        await downloadFile(FFMPEG_URL, DOWNLOAD_PATH);

        console.log('Extracting FFmpeg...');
        if (os.platform() === 'win32') {
            // Use PowerShell on Windows
            await execAsync(`powershell -command "Expand-Archive -Path '${DOWNLOAD_PATH}' -DestinationPath '${EXTRACT_PATH}' -Force"`);
        } else {
            // Use unzip on Linux
            await execAsync(`unzip ${DOWNLOAD_PATH} -d ${EXTRACT_PATH}`);
        }

        // Move executables to bin directory
        const ffmpegDir = path.join(EXTRACT_PATH, 'ffmpeg-master-latest-win64-gpl', 'bin');
        const files = ['ffmpeg.exe', 'ffplay.exe', 'ffprobe.exe'];
        
        for (const file of files) {
            const source = path.join(ffmpegDir, file);
            const dest = path.join(EXTRACT_PATH, file);
            if (fs.existsSync(source)) {
                fs.renameSync(source, dest);
            }
        }

        // Clean up
        fs.rmSync(DOWNLOAD_PATH);
        fs.rmSync(path.join(EXTRACT_PATH, 'ffmpeg-master-latest-win64-gpl'), { recursive: true, force: true });

        console.log('FFmpeg setup completed successfully!');
    } catch (error) {
        console.error('Error setting up FFmpeg:', error);
        process.exit(1);
    }
}

setupFFmpeg();
