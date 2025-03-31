# 🚀 FlashLearn

FlashLearn is an AI-powered learning platform that transforms PDFs and YouTube videos into interactive quizzes, making exam preparation faster and more engaging. 

**The Problem:**  
Students struggle with last-minute revisions through lengthy PDFs and videos. Finding key concepts quickly and testing knowledge in real-time remains a challenge.

**Our Solution:**  
An AI-driven platform that:  
📄 Generates quizzes from uploaded PDFs  
🎥 Converts YouTube videos into bite-sized quizzes  
🏆 Tracks progress with leaderboards and streaks  
🤖 Provides instant doubt-solving via AI chatbot  

## 👨‍💻 Team DevSquad
- Sachin Sharma  
- Vansh Tyagi  
- Aparna Ojha  
- Ankit Gupta  

## 🌟 Key Features
- **AI-Powered Quiz Generation**  
  Upload PDFs or paste YouTube links to instantly create quizzes  
- **Gamified Learning**  
  Compete on category-specific leaderboards (React, DSA, etc.)  
- **Smart Flashcards**  
  AI generates adaptive flashcards from your learning material  
- **Discussion Forums**  
  Collaborate with peers on tricky concepts  
- **Learning Streaks**  
  Daily quiz challenges to boost retention  

## 🛠 Tech Stack
- **Frontend:** React.js ⚛, Tailwind CSS  
- **Backend:** Node.js 🟩, Express.js  
- **Database:** MongoDB 🗃  
- **AI Integration:** Quiz generation & chatbot  
- **APIs:** YouTube Data API, AI services  

## 🔧 Setup Instructions

### ⚙ Prerequisites
- Node.js (v16+)  
- MongoDB Atlas account  
- YouTube API key  

## 🔧 Setup Instructions

### ⚙ Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- YouTube Data API v3 key
- Git

### 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/flashlearn.git
   cd flashlearn
   ```

2. **Split the terminal and navigate to both server and client directories**:
   ```bash
   cd server
   ```
   In the other terminal:
   ```bash
   cd client
   ```

3. **Install dependencies in both server and client**:
   ```bash
   npm i
   ```

4. **Set up `.env` files**:
   - **In the server directory**, create a `.env` file:
     ```bash
     touch .env
     ```
     Add the following variables (without their values):
     ```env
     PORT=5000
     MONGO_URL=mongodb+<your-mongodb-url>
     JWT_SECRET=<your-secret-key>
     NODE_ENV=development

     # API Keys
     YOUTUBE_API_KEY=<your-youtube-api-key>
     GEMINI_API_KEY=<your-gemini-api-key>
     ASSEMBLYAI_API_KEY=<your-assemblyai-api-key>
     OPENAI_API_KEY=<your-openai-api-key>

     # Cloudinary
     CLOUDINARY_CLOUD_NAME=<your-cloud-name>
     CLOUDINARY_API_KEY=<your-cloudinary-api-key>
     CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
     CLOUDINARY_URL=cloudinary://<your-cloudinary-url>
     ```

   - **In the client directory**, create a `.env` file:
     ```bash
     touch .env
     ```
     Add the following variable:
     ```env
     VITE_API_URL=
     


5. **Run the project**:
   - **Start the server**:
     ```bash
     npx run server
     ```
   - **Start the client**:
     ```bash
     npm run dev
     ```
   - **Click the link** shown in the client terminal to open the application.
   - To stop the client, press `Ctrl + C` in the terminal.
  

### 📩 Contact Us
If you have any queries or suggestions, feel free to contact us:
- sachinsharma11175@gmail.com
- vanshjii021@gmail.com
- ojhaaparna0@gmail.com
- ankitgupta23sep@gmail.com
