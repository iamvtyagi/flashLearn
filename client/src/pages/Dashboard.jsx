import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { UserDataContext } from '../context/users.context';

const DashboardHome = () => {

  // const [user, setUser] = useContext(UserDataContext);
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const topLearners = [
    { name: 'Sarah Johnson', tokens: 5240 },
    { name: 'Mike Chen', tokens: 4890 }
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {userData?.fullname?.firstname}! 👋</h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full">
          <span className="text-blue-600">💰 {userData?.tokens} Tokens</span>
        </div>
      </div>

      {/* Streak Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold">⭐ You're on a {user.streak}-day streak! 🔥</h2>
        <div className="w-full h-2 bg-blue-600 rounded-full mt-4"></div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Current Playlist */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Current Playlist</h3>
          <p className="text-blue-600 mb-2">{user.currentPlaylist.completed}/{user.currentPlaylist.total} completed</p>
          <p className="text-gray-600 mb-4">{user.currentPlaylist.name}</p>
          <Link 
            to="/learn" 
            className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Learning
          </Link>
        </div>

        {/* Latest Quiz */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Quiz</h3>
          <p className="text-gray-600 mb-2">{user.latestQuiz.name}</p>
          <p className="text-green-600 mb-4">{user.latestQuiz.status}</p>
          <Link 
            to="/quiz" 
            className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Quiz
          </Link>
        </div>

        {/* Available Rewards */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Available Rewards</h3>
          <p className="text-gray-600 mb-4">Unlock premium content</p>
          <span className="text-amber-500 text-sm font-medium mb-4 inline-block">2 New</span>
          <Link 
            to="/rewards" 
            className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
          >
            View Rewards
          </Link>
        </div>
      </div>

      {/* Top Learners */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Top Learners</h3>
          <Link to="/leaderboard" className="text-blue-600 hover:text-blue-700">
            View Full Leaderboard
          </Link>
        </div>
        <div className="space-y-4">
          {topLearners.map((learner, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="text-gray-600">{index + 1}.</span>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <span className="flex-grow font-medium">{learner.name}</span>
              <span className="text-blue-600 font-medium">{learner.tokens} tokens</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ActivityPage = () => (
  <div className="max-w-7xl mx-auto p-8">
    <h1 className="text-2xl font-semibold mb-4">Activity</h1>
    <p>Your recent activities will appear here.</p>
  </div>
);

const ClassesPage = () => (
  <div className="max-w-7xl mx-auto p-8">
    <h1 className="text-2xl font-semibold mb-4">Classes</h1>
    <p>Your classes will appear here.</p>
  </div>
);

const FlashcardsPage = () => (
  <div className="max-w-7xl mx-auto p-8">
    <h1 className="text-2xl font-semibold mb-4">Flashcards</h1>
    <p>Your flashcards will appear here.</p>
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
