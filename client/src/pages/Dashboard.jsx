import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaTrophy } from 'react-icons/fa';
import { BsLightningCharge } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { UserDataContext } from '../context/users.context';

const DashboardHome = () => {
  const [userData, setUserData] = useState(null);
  const [topLearners, setTopLearners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from localStorage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }

        // Fetch top learners
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Sort users by total score and get top 2
        const sortedUsers = response.data
          .sort((a, b) => b.quizzes.totalScore - a.quizzes.totalScore)
          .slice(0, 2);
        
        setTopLearners(sortedUsers);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const user = {
    name: 'John',
    tokens: 2500,
    streak: 5,
    currentPlaylist: {
      name: 'JavaScript Fundamentals',
      completed: 3,
      total: 10
    },
    latestQuiz: {
      name: 'DOM Manipulation Quiz',
      status: 'Available'
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Welcome Section - Enhanced with better gradients and animations */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4]/5 to-[#FF6D00]/5 transform group-hover:scale-105 transition-transform duration-300"></div>
        <div className="flex justify-between items-center relative">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4285F4] to-[#FF6D00] bg-clip-text text-transparent">
              Welcome back, {userData?.fullname?.firstname}! 👋
            </h1>
            <p className="text-[#2D3748] mt-2 text-lg">
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-[#FFC107]/20 to-[#FF6D00]/20 px-6 py-4 rounded-xl">
              <div className="text-sm text-[#2D3748] mb-1">Total Tokens</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#FFC107] to-[#FF6D00] bg-clip-text text-transparent">
                  {userData?.tokens}
                </span>
                <span className="text-2xl ml-2">💰</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Section - Added animation and better visualization */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#2D3748] mb-2">
              Learning Streak
            </h2>
            <p className="text-gray-600">Keep learning daily to maintain your streak!</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF6D00] mb-1">{user.streak}</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div className="text-4xl animate-bounce">🔥</div>
          </div>
        </div>
        <div className="relative">
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF9A00] to-[#FF6D00] rounded-full transition-all duration-500"
              style={{ width: `${(user.streak / 7) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>0 days</span>
            <span>7 days</span>
          </div>
        </div>
      </div>

      {/* Main Grid - Improved card designs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current Playlist Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4285F4]/10 to-transparent rounded-full transform -translate-y-12 translate-x-12"></div>
          <h3 className="text-lg font-semibold text-[#2D3748] mb-4 flex items-center">
            <span className="text-2xl mr-2">📚</span>
            Current Playlist
          </h3>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#4285F4] font-semibold">Progress</p>
              <p className="text-[#4285F4]">{user.currentPlaylist.completed}/{user.currentPlaylist.total}</p>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-full transition-all duration-500"
                style={{ width: `${(user.currentPlaylist.completed / user.currentPlaylist.total) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-[#2D3748] mb-4 font-medium">{user.currentPlaylist.name}</p>
          <Link 
            to='/' 
            className="block w-full py-3 px-4 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white text-center rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
          >
            Continue Learning
          </Link>
        </div>

        {/* Latest Quiz Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6D00]/10 to-transparent rounded-full transform -translate-y-12 translate-x-12"></div>
          <h3 className="text-lg font-semibold text-[#2D3748] mb-4 flex items-center">
            <span className="text-2xl mr-2">✍️</span>
            Latest Quiz
          </h3>
          <p className="text-[#2D3748] mb-2 font-medium">{user.latestQuiz.name}</p>
          <span className="inline-block px-4 py-1 bg-[#34A853]/10 text-[#34A853] rounded-full text-sm font-medium mb-4">
            {user.latestQuiz.status}
          </span>
          <Link 
            to="/quiz" 
            className="block w-full py-3 px-4 bg-gradient-to-r from-[#FF9A00] to-[#FF6D00] text-white text-center rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
          >
            Start Quiz
          </Link>
        </div>

        {/* Available Rewards Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFC107]/10 to-transparent rounded-full transform -translate-y-12 translate-x-12"></div>
          <h3 className="text-lg font-semibold text-[#2D3748] mb-4 flex items-center">
            <span className="text-2xl mr-2">🏆</span>
            Available Rewards
          </h3>
          <p className="text-[#2D3748] mb-4">Unlock premium content</p>
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-block px-4 py-1 bg-[#FFC107]/10 text-[#FFC107] rounded-full text-sm font-medium">
              2 New Rewards
            </span>
            <span className="animate-pulse text-xl">✨</span>
          </div>
          <Link 
            to="/rewards" 
            className="block w-full py-3 px-4 bg-gradient-to-r from-[#FFC107] to-[#FF6D00] text-white text-center rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
          >
            View Rewards
          </Link>
        </div>
      </div>

      {/* Top Learners Section - Enhanced with real data */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-[#2D3748] flex items-center">
              <FaTrophy className="text-[#FFC107] mr-2" />
              Top Learners
            </h3>
            <p className="text-gray-600 mt-1">This week's champions</p>
          </div>
          <Link 
            to="/leaderboard" 
            className="text-[#4285F4] hover:text-[#4285F4]/80 font-medium flex items-center"
          >
            View Full Leaderboard
            <span className="ml-1">→</span>
          </Link>
        </div>
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            topLearners.map((learner, index) => (
              <div 
                key={learner._id} 
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-[#F8F9FA] transition-all duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-full flex items-center justify-center text-white font-bold">
                  {index === 0 ? '👑' : '🥈'}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-[#2D3748]">
                    {learner.fullname.firstname} {learner.fullname.lastname}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <BsLightningCharge className="text-[#FFC107] mr-1" />
                    {learner.quizzes.totalQuizzes} Quizzes completed
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaStar className="text-[#FFC107]" />
                  <span className="text-[#4285F4] font-bold">{learner.quizzes.totalScore}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ActivityPage = () => (
  <div className="max-w-7xl mx-auto p-8">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4285F4] to-[#FF6D00] bg-clip-text text-transparent mb-6">
      Activity
    </h1>
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <p className="text-[#2D3748]">Your recent activities will appear here.</p>
    </div>
  </div>
);

const ClassesPage = () => (
  <div className="max-w-7xl mx-auto p-8">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4285F4] to-[#FF6D00] bg-clip-text text-transparent mb-6">
      Classes
    </h1>
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <p className="text-[#2D3748]">Your classes will appear here.</p>
    </div>
  </div>
);

const FlashcardsPage = () => (
  <div className="max-w-7xl mx-auto p-8">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4285F4] to-[#FF6D00] bg-clip-text text-transparent mb-6">
      Flashcards
    </h1>
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <p className="text-[#2D3748]">Your flashcards will appear here.</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
