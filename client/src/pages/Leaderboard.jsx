import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsLightningCharge } from 'react-icons/bs';
import { FaStar, FaTrophy } from 'react-icons/fa';

const RankBadge = ({ rank }) => {
  const getBadgeStyles = () => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-600';
      case 2:
        return 'bg-gray-100 text-gray-600';
      case 3:
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${getBadgeStyles()}`}>
      {rank}
    </div>
  );
};

const UserRankCard = ({ user, rank }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Current Rank</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {rank}
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">👤</div>
            <div>
              <h3 className="font-medium text-gray-800">
                {user.fullname.firstname} {user.fullname.lastname}
              </h3>
              <p className="text-sm text-gray-500">Total Score: {user.quizzes.totalScore}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-full">
          <BsLightningCharge className="text-blue-600 mr-1" />
          <span className="text-blue-600 font-medium">{user.quizzes.totalQuizzes} Quizzes</span>
        </div>
      </div>
    </div>
  );
};

const LeaderboardTable = ({ users }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Global Leaderboard</h2>
        </div>
      </div>
      
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-gray-500 border-b border-gray-100">
        <div className="col-span-1">Rank</div>
        <div className="col-span-5">User</div>
        <div className="col-span-3 text-center">Quizzes Taken</div>
        <div className="col-span-3 text-right">Total Score</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {users.map((user, index) => (
          <div key={user._id} className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-gray-50">
            <div className="col-span-1">
              <RankBadge rank={index + 1} />
            </div>
            <div className="col-span-5">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">👤</div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {user.fullname.firstname} {user.fullname.lastname}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="col-span-3 text-center text-gray-600">
              {user.quizzes.totalQuizzes}
            </div>
            <div className="col-span-3 text-right font-medium text-blue-600">
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {currentUser && <UserRankCard user={currentUser} rank={currentUserRank} />}
      <LeaderboardTable users={users} />
    </div>
  );
};

export default Leaderboard;
