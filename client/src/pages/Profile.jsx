import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/users.context';

const Profile = () => {
  const [user, setUser] = useContext(UserDataContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  
  if (!userData) {
    return <div>Loading...</div>;
  }

  const achievements = [
    {
      title: 'Quiz Master',
      description: 'Completed 30+ quizzes',
      icon: '🏆',
      progress: 60, // percentage
      currentValue: 30,
      maxValue: 50,
    },
    {
      title: 'Early Bird',
      description: '15-day learning streak',
      icon: '🌅',
      progress: 75,
      currentValue: 15,
      maxValue: 20,
    },
  ];

  const tokenHistory = [
    {
      type: 'Quiz Completion Bonus',
      description: 'JavaScript Fundamentals',
      tokens: '+50 Tokens',
      isPositive: true,
    },
    {
      type: 'Reward Redemption',
      description: 'Amazon Gift Card',
      tokens: '-2000 Tokens',
      isPositive: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#4285F4] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4285F4]/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="flex items-center space-x-8 relative">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#4285F4] to-[#FF6D00] p-1">
                <img
                  src="https://i.pinimg.com/474x/cc/5c/08/cc5c088add6d06315242444d78a8498d.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-white"
                />
                <button className="absolute bottom-0 right-0 bg-[#FF6D00] p-2 rounded-full text-white shadow-lg hover:bg-[#FF9A00] transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-[#2D3748] mb-1">
                    {`${userData.fullname.firstname} ${userData.fullname.lastname}`}
                  </h2>
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {userData.email}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button className="bg-[#4285F4] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#3367D6] transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button className="bg-white text-[#FF6D00] border-2 border-[#FF6D00] px-6 py-3 rounded-full hover:bg-[#FF6D00] hover:text-white transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Achievements Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#2D3748] mb-6 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-r from-white to-[#F8F9FA] border border-[#FFC107] hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center text-2xl bg-[#FFC107]/10 rounded-full">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#2D3748]">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-[#34A853] rounded-full transition-all duration-500"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {achievement.currentValue}/{achievement.maxValue} completed
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Notifications</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Quiz Reminders</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Privacy</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Show Profile</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Theme</h4>
                <select className="w-full border rounded-md p-2">
                  <option>Light Mode</option>
                  <option>Dark Mode</option>
                </select>
              </div>
            </div>
          </div>

          {/* Token History Section */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Token History</h3>
            <div className="space-y-4">
              {tokenHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.isPositive ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      {item.isPositive ? '+' : '-'}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.type}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <span
                    className={`font-medium ${
                      item.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.tokens}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;