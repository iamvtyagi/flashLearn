import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
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
              Create Account
            </h2>
            <p className="mt-3 text-[#2D3748] text-sm">
              Join our community of learners
            </p>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg border-2 border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5 mr-3"
            />
            <span className="text-[#2D3748] font-medium">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or sign up with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-[#EA4335]/10 border border-[#EA4335]/20 text-[#EA4335] text-sm">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2D3748] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D3748] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/20 focus:border-[#4285F4] transition-all duration-200"
                  required
                />
              </div>
            </div>

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
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg bg-[#4285F4] hover:bg-[#4285F4]/90 text-white font-medium transition-all duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-[#2D3748]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#4285F4] hover:text-[#4285F4]/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;