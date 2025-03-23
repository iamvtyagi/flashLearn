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
      icon: ' ',
    },
    {
      title: 'Early Bird',
      description: '15-day learning streak',
      icon: ' ',
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src="https://imgs.search.brave.com/QjaiTrsP9kXcA3btEFYLGq4p09RLtun2hybMNGrGfRU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC84NC84MS95/b3VuZy1tYW4tYXZh/dGFyLXByb2ZpbGUt/dXNlcnBpYy1vbi13/aGl0ZS12ZWN0b3It/ODk4ODQ4MS5qcGc"
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <button className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {`${userData.fullname.firstname} ${userData.fullname.lastname}`}
              </h2>
              <p className="text-gray-600">{userData.email}</p>
              <div className="mt-4 space-x-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Edit Profile
                </button>
                <button className="border border-gray-300 px-4 py-2 rounded-md">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Achievements Section */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex items-start space-x-3"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
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