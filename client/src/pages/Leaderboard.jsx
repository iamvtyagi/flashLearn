import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsLightningCharge } from 'react-icons/bs';
import { FaStar, FaTrophy } from 'react-icons/fa';

const RankBadge = ({ rank }) => {
  const getBadgeStyles = () => {
    switch (rank) {
      case 1:
        return 'bg-[#FFD700] text-white';
      case 2:
        return 'bg-[#4285F4]/20 text-[#4285F4]';
      case 3:
        return 'bg-[#FF6D00] text-white';
      default:
        return 'bg-[#F8F9FA] text-[#2D3748]';
    }
  };

  const getBadgeIcon = () => {
    switch (rank) {
      case 1:
        return '🔥';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank;
    }
  };

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getBadgeStyles()} shadow-lg transform hover:scale-110 transition-all duration-300`}>
      {getBadgeIcon()}
    </div>
  );
};

const UserRankCard = ({ user, rank }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-[#4285F4] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4285F4]/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
      <h2 className="text-xl font-bold text-[#2D3748] mb-6 flex items-center">
        <BsLightningCharge className="text-[#FF6D00] mr-2" />
        Your Performance
      </h2>
      <div className="flex items-center justify-between relative">
        <div className="flex items-center space-x-6">
          <RankBadge rank={rank} />
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-full flex items-center justify-center text-white text-xl">
              {user.fullname.firstname.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-[#2D3748] text-lg">
                {user.fullname.firstname} {user.fullname.lastname}
              </h3>
              <p className="text-[#4285F4] font-medium flex items-center">
                <FaStar className="text-[#FFC107] mr-1" />
                {user.quizzes.totalScore} Points
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#F8F9FA] px-4 py-2 rounded-full">
            <div className="text-sm text-[#2D3748] font-medium">Total Quizzes</div>
            <div className="text-xl font-bold text-[#4285F4]">{user.quizzes.totalQuizzes}</div>
          </div>
          <div className="bg-[#F8F9FA] px-4 py-2 rounded-full">
            <div className="text-sm text-[#2D3748] font-medium">Current Rank</div>
            <div className="text-xl font-bold text-[#FF6D00]">#{rank}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaderboardTable = ({ users }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#FFC107]">
      <div className="p-6 bg-gradient-to-r from-[#FFC107]/10 to-transparent">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#2D3748] flex items-center">
            <FaTrophy className="text-[#FFC107] mr-2" />
            Global Leaderboard
          </h2>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F8F9FA] text-sm font-medium text-[#2D3748]">
        <div className="col-span-1">Rank</div>
        <div className="col-span-5">User</div>
        <div className="col-span-3 text-center">Quizzes</div>
        <div className="col-span-3 text-right">Score</div>
      </div>

      <div className="divide-y divide-gray-100">
        {users.map((user, index) => (
          <div key={user._id} 
            className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-300 hover:bg-[#F8F9FA] ${
              index < 3 ? 'bg-gradient-to-r from-[#FFC107]/5 to-transparent' : ''
            }`}
          >
            <div className="col-span-1">
              <RankBadge rank={index + 1} />
            </div>
            <div className="col-span-5">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-full flex items-center justify-center text-white font-medium">
                  {user.fullname.firstname.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-[#2D3748]">
                    {user.fullname.firstname} {user.fullname.lastname}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="col-span-3 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#4285F4]/10 text-[#4285F4] font-medium">
                <BsLightningCharge className="mr-1" />
                {user.quizzes.totalQuizzes}
              </div>
            </div>
            <div className="col-span-3 text-right font-bold text-[#34A853] flex items-center justify-end">
              <FaStar className="text-[#FFC107] mr-1" />
              {user.quizzes.totalScore}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRank, setCurrentUserRank] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Sort users by total score in descending order
        const sortedUsers = response.data.sort((a, b) => b.quizzes.totalScore - a.quizzes.totalScore);
        setUsers(sortedUsers);

        // Get current user's data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
          setCurrentUser(userData);
          // Find current user's rank
          const userRank = sortedUsers.findIndex(user => user._id === userData._id) + 1;
          setCurrentUserRank(userRank);
        }
      } catch (err) {
        setError('Failed to fetch leaderboard data');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#2D3748] font-medium">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="bg-[#EA4335]/10 text-[#EA4335] px-6 py-4 rounded-lg">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {currentUser && <UserRankCard user={currentUser} rank={currentUserRank} />}
        <LeaderboardTable users={users} />
      </div>
    </div>
  );
};

export default Leaderboard;
