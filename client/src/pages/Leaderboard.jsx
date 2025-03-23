import React, { useState } from 'react';
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

const UserRankCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Current Rank</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            13
          </div>
          <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-medium text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-500">You're in the top 5%!</p>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-full">
          <BsLightningCharge className="text-blue-600 mr-1" />
          <span className="text-blue-600 font-medium">{user.tokens.toLocaleString()} Tokens</span>
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
          <select className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 focus:outline-none focus:border-blue-500">
            <option value="all-time">All Time</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>
      </div>
      
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-gray-500 border-b border-gray-100">
        <div className="col-span-1">Rank</div>
        <div className="col-span-5">User</div>
        <div className="col-span-2 text-center">Quizzes</div>
        <div className="col-span-2 text-center">Streak</div>
        <div className="col-span-2 text-right">Tokens</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {users.map((user, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-gray-50">
            <div className="col-span-1">
              <RankBadge rank={index + 1} />
            </div>
            <div className="col-span-5">
              <div className="flex items-center space-x-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-medium text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.title}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 text-center text-gray-600">{user.quizzes}</div>
            <div className="col-span-2 text-center">
              <div className="flex items-center justify-center space-x-1 text-yellow-500">
                <FaStar />
                <span>{user.streak} days</span>
              </div>
            </div>
            <div className="col-span-2 text-right font-medium text-blue-600">
              {user.tokens.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const currentUser = {
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    tokens: 2500
  };

  const leaderboardUsers = [
    {
      name: 'Sarah Johnson',
      title: 'Pro Learner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      quizzes: 248,
      streak: 15,
      tokens: 5240
    },
    {
      name: 'Mike Chen',
      title: 'Rising Star',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      quizzes: 201,
      streak: 12,
      tokens: 4890
    },
    {
      name: 'Emily Davis',
      title: 'Quiz Master',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      quizzes: 189,
      streak: 10,
      tokens: 4670
    },
    {
      name: 'Alex Turner',
      title: 'Active Learner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      quizzes: 156,
      streak: 8,
      tokens: 4120
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <UserRankCard user={currentUser} />
      <LeaderboardTable users={leaderboardUsers} />
    </div>
  );
};

export default Leaderboard;
