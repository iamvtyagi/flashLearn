import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/users.context';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [user, setUser] = useContext(UserDataContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    // TODO: Implement Google Sign In
    console.log("Google sign in clicked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        console.log(res.data.user);
        setUser(res.data.user);
        navigate('/');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-[#4285F4]/10 to-[#F8F9FA]">
      <div className="w-full max-w-md m-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#4285F4] to-[#FF6D00] bg-clip-text text-transparent">
              QuizPlay Learn
            </h2>
            <p className="mt-3 text-[#2D3748] text-sm">
              Your journey to knowledge begins here
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg border-2 border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200"
          >
            <img
              className="h-5 w-5 mr-3"
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            <span className="text-[#2D3748] font-medium">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-[#EA4335]/10 border border-[#EA4335]/20 text-[#EA4335] text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D3748] mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#4285F4] focus:ring-[#4285F4]"
                />
                <label className="ml-2 text-sm text-[#2D3748]">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm font-medium text-[#4285F4] hover:text-[#4285F4]/80">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg bg-[#4285F4] hover:bg-[#4285F4]/90 text-white font-medium transition-all duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-[#2D3748]">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[#4285F4] hover:text-[#4285F4]/80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;