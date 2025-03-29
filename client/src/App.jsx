import React from "react";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import Profile from "./pages/Profile";
import Playlists from "./pages/Playlists";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import LearningPage from "./pages/LearningPage";
import PlaylistVideos from "./pages/PlaylistVideos";
import PDFQuiz from "./pages/PDFQuiz";
// import QuizComponent from "./components/Quiz";
// import ReactQuiz from "./components/Quiz";
import Quiz from "./pages/Quiz";

// Placeholder components for routes that haven't been created yet
const ProfilePage = () => (
    <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
        <p className="text-gray-600">Manage your profile and settings here.</p>
    </div>
);

const App = () => {
    const location = useLocation();
    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    if (isAuthPage) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex">
            {/* Enhanced Sidebar */}
            <div className="w-64 fixed h-full bg-white shadow-xl border-r border-gray-100">
                <div className="p-6 ">
                    <h1 className="text-2xl font-extrabold text-[#4285F4]  tracking-tight"> Flash Learn</h1>
                </div>
                <nav className="mt-6">
                    <ul className="space-y-1.5">
                        <li>
                            <Link
                                to="/dashboard"
                                className="flex items-center px-6 py-3 text-[#2D3748] hover:bg-[#4285F4]/10 hover:text-[#4285F4] transition-all duration-200 font-medium"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/playlists"
                                className="flex items-center px-6 py-3 text-[#2D3748] hover:bg-[#4285F4]/10 hover:text-[#4285F4] transition-all duration-200 font-medium"
                            >
                                Playlists
                            </Link>
                        </li>
                       
                        
                        <li>
                            <Link 
                                to="/pdf-quiz" 
                                className="flex items-center px-6 py-3 text-[#2D3748] hover:bg-[#4285F4]/10 hover:text-[#4285F4] transition-all duration-200 font-medium"
                            >
                                PDF Quiz
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/rewards" 
                                className="flex items-center px-6 py-3 text-[#2D3748] hover:bg-[#4285F4]/10 hover:text-[#4285F4] transition-all duration-200 font-medium group"
                            >
                                <span>Rewards</span>
                                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-[#FFC107] text-white rounded-full group-hover:bg-[#FF9A00]">New</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/leaderboard"
                                className="flex items-center px-6 py-3 text-[#2D3748] hover:bg-[#4285F4]/10 hover:text-[#4285F4] transition-all duration-200 font-medium"
                            >
                                Leaderboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/profile" 
                                className="flex items-center px-6 py-3 text-[#2D3748] hover:bg-[#4285F4]/10 hover:text-[#4285F4] transition-all duration-200 font-medium"
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Enhanced Main Content */}
            <div className="flex-1 ml-64">
                <Navbar />
                <div className="pt-16 px-8 pb-8">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route
                            path="/dashboard/*"
                            element={
                                <UserProtectedWrapper>
                                    <Dashboard />
                                </UserProtectedWrapper>
                            }
                        />
                        <Route
                            path="/learn"
                            element={
                                <UserProtectedWrapper>
                                    <LearningPage />
                                </UserProtectedWrapper>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <UserProtectedWrapper>
                                    <Profile />
                                </UserProtectedWrapper>
                            }
                        />
                        <Route
                            path="/playlists"
                            element={
                                <UserProtectedWrapper>
                                    <Playlists />
                                </UserProtectedWrapper>
                            }
                        />
                        <Route
                            path="/playlist/:playlistId"
                            element={
                                <UserProtectedWrapper>
                                    <PlaylistVideos />
                                </UserProtectedWrapper>
                            }
                        />
                        <Route
                            path="/quiz/:videoId"
                            element={
                                <UserProtectedWrapper>
                                    <Quiz />
                                </UserProtectedWrapper>
                            }
                        />
                        <Route
                            path="/pdf-quiz"
                            element={
                                <UserProtectedWrapper>
                                    <PDFQuiz />
                                </UserProtectedWrapper>
                            }
                        />
                        <Route
                            path="/rewards"
                            element={
                                <UserProtectedWrapper>
                                    <Rewards />
                                </UserProtectedWrapper>
                            }
                        />
                        <Route
                            path="/leaderboard"
                            element={
                                <UserProtectedWrapper>
                                    <Leaderboard />
                                </UserProtectedWrapper>
                            }
                        />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
