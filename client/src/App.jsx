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
import Quiz from "./pages/Quiz";

const SidebarLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center px-6 py-3 transition-all duration-200 font-medium ${
                isActive
                    ? "bg-[#4285F4]/10 text-[#4285F4] border-r-4 border-[#4285F4]"
                    : "text-[#2D3748] hover:bg-[#4285F4]/10 hover:text-[#4285F4] hover:translate-x-1"
            }`}
        >
            {children}
        </Link>
    );
};

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
            <div className="w-64 fixed h-full bg-white shadow-xl border-r border-gray-100">
                <div className="p-6">
                    <Link to="/dashboard" className="block">
                        <h1 className="text-2xl font-extrabold text-[#4285F4] tracking-tight hover:text-[#3367D6] transition-colors">
                            Flash Learn
                        </h1>
                    </Link>
                </div>
                <nav className="mt-6">
                    <ul className="space-y-1">
                        <li>
                            <SidebarLink to="/dashboard">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Dashboard
                            </SidebarLink>
                        </li>
                        <li>
                            <SidebarLink to="/playlists">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                                Playlists
                            </SidebarLink>
                        </li>
                        <li>
                            <SidebarLink to="/pdf-quiz">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                PDF Quiz
                            </SidebarLink>
                        </li>
                        <li>
                            <SidebarLink to="/rewards">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                    />
                                </svg>
                                <span>Rewards</span>
                                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-[#FFC107] text-white rounded-full">New</span>
                            </SidebarLink>
                        </li>
                        <li>
                            <SidebarLink to="/leaderboard">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                Leaderboard
                            </SidebarLink>
                        </li>
                        <li>
                            <SidebarLink to="/profile">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Profile
                            </SidebarLink>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="flex-1 ml-64">
                <Navbar />
                <div className="pl-8 pt-16 pb-8">
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
