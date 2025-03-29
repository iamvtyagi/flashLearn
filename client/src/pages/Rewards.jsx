import React from 'react';
import { FaGift, FaCrown, FaTshirt, FaLock } from 'react-icons/fa';
import { BsLightningCharge } from 'react-icons/bs';

const RewardCard = ({ title, tokens, description, icon: Icon, isLocked }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 
      ${isLocked ? 'opacity-80' : ''} border-l-4 ${isLocked ? 'border-gray-200' : 'border-[#FFC107]'}`}>
      {/* Card Image/Icon Section */}
      <div className="h-48 bg-gradient-to-br from-[#4285F4]/5 to-[#34A853]/5 flex items-center justify-center relative">
        <Icon className={`text-7xl ${isLocked ? 'text-gray-400' : 'text-[#4285F4]'}`} />
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50">
            <div className="p-3 rounded-full bg-[#2D3748]/10">
              <FaLock className="text-2xl text-[#2D3748]" />
            </div>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-[#2D3748]">{title}</h3>
          <div className="flex items-center bg-[#FFC107]/10 px-3 py-1 rounded-full">
            <BsLightningCharge className="text-[#FFC107] mr-1" />
            <span className="text-[#2D3748] font-medium">{tokens} Tokens</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 min-h-[48px]">{description}</p>
        
        <button 
          className={`w-full py-3 px-4 rounded-full font-medium transition-all duration-300
            ${isLocked 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-[#FF6D00] text-white hover:bg-[#FF9A00] hover:shadow-lg transform hover:-translate-y-0.5'
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
    <div className="min-h-screen bg-[#F8F9FA] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#2D3748] mb-2">Rewards Store</h1>
              <p className="text-gray-600">Redeem your tokens for exclusive rewards!</p>
            </div>
            <div className="flex items-center bg-gradient-to-r from-[#FFC107]/20 to-[#FF6D00]/20 px-6 py-3 rounded-2xl">
              <BsLightningCharge className="text-[#FFC107] text-2xl mr-3" />
              <div>
                <p className="text-sm text-[#2D3748]">Your Balance</p>
                <p className="text-2xl font-bold text-[#2D3748]">2,500 Tokens</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#4285F4]">
            <div className="flex justify-between text-sm text-[#2D3748] mb-3">
              <span className="font-medium">Progress to next reward</span>
              <span className="font-bold">2,500 / 3,000 tokens</span>
            </div>
            <div className="h-3 bg-[#F8F9FA] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-full transition-all duration-300"
                style={{ width: '83.33%' }}
              />
            </div>
            <p className="text-sm text-[#2D3748] mt-3 flex items-center">
              <BsLightningCharge className="text-[#FF6D00] mr-2" />
              Earn 500 more tokens to unlock the Premium Course reward!
            </p>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {rewards.map((reward, index) => (
            <RewardCard key={index} {...reward} />
          ))}
        </div>

        {/* How to Earn Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#FFC107]">
          <h2 className="text-2xl font-bold text-[#2D3748] mb-6 flex items-center">
            <BsLightningCharge className="text-[#FFC107] mr-2" />
            How to Earn Tokens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-[#4285F4]/5 to-transparent rounded-xl border border-[#4285F4]/20">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#4285F4]/10 rounded-full flex items-center justify-center mr-3">
                  <BsLightningCharge className="text-[#4285F4] text-xl" />
                </div>
                <h3 className="font-bold text-[#2D3748]">Complete Quizzes</h3>
              </div>
              <p className="text-gray-600">Earn 50 tokens for each quiz you complete with a score of 80% or higher.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#4285F4]/5 to-transparent rounded-xl border border-[#4285F4]/20">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#4285F4]/10 rounded-full flex items-center justify-center mr-3">
                  <BsLightningCharge className="text-[#4285F4] text-xl" />
                </div>
                <h3 className="font-bold text-[#2D3748]">Daily Streaks</h3>
              </div>
              <p className="text-gray-600">Maintain your daily learning streak to earn bonus tokens.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#4285F4]/5 to-transparent rounded-xl border border-[#4285F4]/20">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-[#4285F4]/10 rounded-full flex items-center justify-center mr-3">
                  <BsLightningCharge className="text-[#4285F4] text-xl" />
                </div>
                <h3 className="font-bold text-[#2D3748]">Complete Courses</h3>
              </div>
              <p className="text-gray-600">Earn 500 tokens when you complete an entire course.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
