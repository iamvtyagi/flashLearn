const dotenv = require("dotenv");
const colors = require("colors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const userRouter = require("./routes/user.routes");
const searchRoutes = require("./routes/search");
const playlistRoutes = require("./routes/playlist");
const quizRoutes = require("./routes/quiz");
const videoRoutes = require("./routes/video");
const userModel = require("./models/user.model");
const fs = require("fs");
const path = require("path");
const ffmpeg = require('ffmpeg-static'); 

dotenv.config();

// Initialize Express App
const app = express();
app.use(morgan("dev"));

// Middleware
connectToDB();
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cookieParser()); // Parse cookies
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Define Port
const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
    const message = "Welcome to the QuizPlay server!";
    res.status(200).json({
        success: true,
        message,
    });
});

app.use("/users", userRouter);
app.use("/api", searchRoutes);
app.use("/api", playlistRoutes);
app.use("/api", quizRoutes);
app.use("/api", videoRoutes);

app.get("/users", async (req, res) => {
    try {
        const users = await userModel.find(); // Sare users ko fetch karega
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});





// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads/pdfs");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`.blue.bold);
});
