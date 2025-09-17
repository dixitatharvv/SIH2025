import React, { useState } from 'react';
import { User, Shield, BarChart3, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pravaahLogo from '../../assets/pravaah-logo.svg';

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin');
  const [selectedUserType, setSelectedUserType] = useState('citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Clear errors after 3 seconds
      setTimeout(() => setValidationErrors({}), 3000);
      return;
    }
    
    setValidationErrors({});
    navigate('/');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Clear errors after 3 seconds
      setTimeout(() => setValidationErrors({}), 3000);
      return;
    }
    
    setValidationErrors({});
    navigate('/');
  };

  const isSignInValid = formData.email && formData.password;
  const isSignUpValid = formData.email && formData.username && formData.password;

  const userTypes = [
    {
      id: 'citizen',
      name: 'Citizen',
      icon: User,
      description: 'Report hazards and stay informed',
      color: 'blue'
    },
    {
      id: 'authority',
      name: 'Authority',
      icon: Shield,
      description: 'Manage safety reports and alerts',
      color: 'red'
    },
    {
      id: 'analyst',
      name: 'Analyst',
      icon: BarChart3,
      description: 'Analyze data and trends',
      color: 'purple'
    }
  ];

  const getColorClasses = (color, isSelected = false) => {
    const colorMap = {
      blue: {
        bg: isSelected ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200',
        icon: 'bg-blue-500',
        text: 'text-blue-600'
      },
      red: {
        bg: isSelected ? 'bg-red-50 border-red-500' : 'bg-white border-gray-200',
        icon: 'bg-red-500',
        text: 'text-red-600'
      },
      purple: {
        bg: isSelected ? 'bg-purple-50 border-purple-500' : 'bg-white border-gray-200',
        icon: 'bg-purple-500',
        text: 'text-purple-600'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex">
      {/* Left Side - Pravaah Info */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 mr-4">
              <img src={pravaahLogo} alt="Pravaah Logo" className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 text-left">Pravaah</h1>
              <p className="text-blue-600 font-semibold text-left text-lg">Pacific Coast Protection</p>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl font-semibold text-gray-900 mb-8 text-left leading-tight">
            Protecting Our Oceans Together
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-xl mb-16 leading-relaxed text-left">
            Join our community-driven platform to report hazards, share safety 
            information, and help keep our coastal waters safe for everyone.
          </p>

          {/* User Type Cards - Horizontal Layout */}
          <div className="grid grid-cols-3 gap-4">
            {userTypes.map((type) => {
              const Icon = type.icon;
              const colors = getColorClasses(type.color);
              
              return (
                <div key={type.id} className="text-center bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl px-5 py-6 shadow-lg min-h-[200px] flex flex-col justify-center">
                  <div className={`w-16 h-16 ${colors.icon} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">{type.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed px-0.5">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Welcome Header */}
            <div className="text-center mb-8">
              {activeTab === 'signin' ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to your account</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
                  <p className="text-gray-600">Create a new account</p>
                </>
              )}
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'signin'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'signup'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Sign In Form */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {validationErrors.email && (
                      <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                        {validationErrors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                        validationErrors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {validationErrors.password && (
                      <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                        {validationErrors.password}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign In to Pravaah
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            )}

            {/* Sign Up Form */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 text-left">
                    I am a:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {userTypes.map((type) => {
                      const Icon = type.icon;
                      const colors = getColorClasses(type.color, selectedUserType === type.id);
                      
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedUserType(type.id)}
                          className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${colors.bg}`}
                        >
                          <div className={`w-8 h-8 ${colors.icon} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{type.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {validationErrors.email && (
                      <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                        {validationErrors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="oceankeeper123"
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                        validationErrors.username ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {validationErrors.username && (
                      <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                        {validationErrors.username}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                        validationErrors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {validationErrors.password && (
                      <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                        {validationErrors.password}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Pravaah Account
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
