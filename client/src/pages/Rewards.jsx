import React from 'react';
import { FaGift, FaCrown, FaTshirt } from 'react-icons/fa';
import { BsLightningCharge } from 'react-icons/bs';

const RewardCard = ({ title, tokens, description, icon: Icon, isLocked }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:scale-[1.02] ${isLocked ? 'opacity-75' : ''}`}>
      {/* Card Image/Icon Section */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <Icon className="text-6xl text-gray-400" />
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
            <BsLightningCharge className="text-blue-600 mr-1" />
            <span className="text-blue-600 font-medium">{tokens} Tokens</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        <button 
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors
            ${isLocked 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          {isLocked ? 'Locked' : 'Claim Reward'}
        </button>
      </div>
    </div>
  );
};

const Rewards = () => {
  const rewards = [
    {
      title: 'Amazon Gift Card',
      tokens: 5000,
      description: 'Redeem your tokens for a $25 Amazon gift card to purchase anything you want!',
      icon: FaGift,
      isLocked: false
    },
    {
      title: 'Premium Course',
      tokens: 3000,
      description: 'Get access to any premium course of your choice for free!',
      icon: FaCrown,
      isLocked: true
    },
    {
      title: 'QuizPlay T-Shirt',
      tokens: 2500,
      description: 'Show off your QuizPlay pride with our exclusive t-shirt!',
      icon: FaTshirt,
      isLocked: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Rewards Store</h1>
            <p className="text-gray-600 mt-1">Redeem your tokens for exclusive rewards!</p>
          </div>
          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
            <BsLightningCharge className="text-blue-600 text-xl mr-2" />
            <div>
              <p className="text-sm text-blue-600">Your Balance</p>
              <p className="text-lg font-semibold text-blue-600">2,500 Tokens</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress to next reward</span>
            <span>2,500 / 3,000 tokens</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: '83.33%' }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Earn 500 more tokens to unlock the Premium Course reward!
          </p>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward, index) => (
          <RewardCard key={index} {...reward} />
        ))}
      </div>

      {/* How to Earn Section */}
      <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Earn Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <BsLightningCharge className="text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800">Complete Quizzes</h3>
            </div>
            <p className="text-gray-600 text-sm">Earn 50 tokens for each quiz you complete with a score of 80% or higher.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <BsLightningCharge className="text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800">Daily Streaks</h3>
            </div>
            <p className="text-gray-600 text-sm">Maintain your daily learning streak to earn bonus tokens.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <BsLightningCharge className="text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800">Complete Courses</h3>
            </div>
            <p className="text-gray-600 text-sm">Earn 500 tokens when you complete an entire course.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
