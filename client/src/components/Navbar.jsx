import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHistory, FaBookOpen, FaRegCreditCard, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-[#4285F4]' : 'text-[#2D3748]';
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-40 px-6">{/*navbar spacing*/}
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for quizzes..."
                className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 text-[#2D3748] placeholder-gray-400 transition-all duration-200"
              />
              <div className="absolute left-4 text-gray-400">
                <FaSearch className="w-4 h-4" />
              </div>
              <button 
                className="ml-2 px-4 py-2.5 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white rounded-lg transition-all duration-200 flex items-center space-x-2 font-medium"
                onClick={() => console.log('Search clicked')}
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Enhanced Navigation Links */}
          <div className="flex items-center space-x-8 ml-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 ${isActive('/')} hover:text-[#4285F4] transition-all duration-200 font-medium`}
            >
              <FaHome className="text-xl" />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/activity" 
              className={`flex items-center space-x-2 ${isActive('/activity')} hover:text-[#4285F4] transition-all duration-200 font-medium`}
            >
              <FaHistory className="text-xl" />
              <span>Activity</span>
            </Link>
            
            <Link 
              to="/classes" 
              className={`flex items-center space-x-2 ${isActive('/classes')} hover:text-[#4285F4] transition-all duration-200 font-medium group`}
            >
              <FaBookOpen className="text-xl" />
              <span>Classes</span>
              <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-[#FF6D00] text-white rounded-full group-hover:bg-[#FF9A00] transition-colors duration-200">New</span>
            </Link>
            
            <Link 
              to="/flashcards" 
              className={`flex items-center space-x-2 ${isActive('/flashcards')} hover:text-[#4285F4] transition-all duration-200 font-medium`}
            >
              <FaRegCreditCard className="text-xl" />
              <span>Flashcards</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
