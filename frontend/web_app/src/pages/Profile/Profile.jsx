import React, { useState } from 'react';
import { MapPin, Calendar, Phone, TrendingUp, Activity, Camera } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const recentActivity = [
    { 
      id: 1, 
      type: 'verified', 
      title: 'Verified rip current report at Sunset Beach', 
      time: '2 hours ago',
      color: 'green'
    },
    { 
      id: 2, 
      type: 'helped', 
      title: 'Helped 3 users with safety questions in forum', 
      time: '1 day ago',
      color: 'blue'
    },
    { 
      id: 3, 
      type: 'submitted', 
      title: 'Submitted marine debris report', 
      time: '3 days ago',
      color: 'orange'
    },
    { 
      id: 4, 
      type: 'earned', 
      title: 'Earned "Community Helper" badge', 
      time: '5 days ago',
      color: 'purple'
    },
    { 
      id: 5, 
      type: 'completed', 
      title: 'Completed safety training module', 
      time: '1 week ago',
      color: 'teal'
    },
    { 
      id: 6, 
      type: 'joined', 
      title: 'Joined beach cleanup event', 
      time: '1 week ago',
      color: 'blue'
    }
  ];

  return (
    <div className="min-h-screen bg-sky-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">SC</span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-1 text-left">Sarah Bhatt</h1>
              <p className="text-lg text-gray-600 mb-3 text-left">Ocean Safety Enthusiast</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Mumbai, Maharashtra
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined Jan 2025
                </span>
              </div>
              {/* Statistics */}
              <div className="grid grid-cols-6 gap-8">
                <div className="text-left">
                  <div className="text-3xl font-bold text-blue-600 mb-1">23</div>
                  <div className="text-sm text-gray-600">Total Reports</div>
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-green-600 mb-1">18</div>
                  <div className="text-sm text-gray-600">Verified</div>
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-orange-600 mb-1">4.8</div>
                  <div className="text-sm text-gray-600">Safety Rating</div>
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-purple-600 mb-1">156</div>
                  <div className="text-sm text-gray-600">Community Helps</div>
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-cyan-600 mb-1">2.4K</div>
                  <div className="text-sm text-gray-600">Forum Views</div>
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">12</div>
                  <div className="text-sm text-gray-600">Badges Earned</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            {['Overview', 'Reports', 'Badges', 'Rewards'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            {/* Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Safety Score */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <h3 className="text-lg font-semibold">Safety Score</h3>
                </div>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-green-600 mb-2">4.8/5.0</div>
                  <div className="text-sm text-gray-600 mb-3">Overall Safety Rating</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{width: '96%'}}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Based on report accuracy, community help, and safety practices
                </p>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Phone className="w-5 h-5 text-red-600 mr-2" />
                  <h3 className="text-lg font-semibold">Emergency Contacts</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Coast Guard</span>
                    <span className="text-blue-600 font-medium">911</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Beach Patrol</span>
                    <span className="text-blue-600 font-medium">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Personal Emergency</span>
                    <span className="text-blue-600 font-medium">(555) 987-6543</span>
                  </div>
                </div>
              </div>

              {/* This Month */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold">This Month</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Reports Filed</span>
                    <span className="text-2xl font-bold text-blue-600">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Forum Posts</span>
                    <span className="text-2xl font-bold text-green-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Helps Given</span>
                    <span className="text-2xl font-bold text-purple-600">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Safety Points</span>
                    <span className="text-2xl font-bold text-orange-600">+245</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <Activity className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Verified rip current report at Sunset Beach</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Helped 3 users with safety questions in forum</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Submitted marine debris report</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Earned "Community Helper" badge</p>
                    <p className="text-sm text-gray-500">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-teal-50 rounded-lg">
                  <div className="w-3 h-3 bg-teal-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Completed safety training module</p>
                    <p className="text-sm text-gray-500">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Joined beach cleanup event</p>
                    <p className="text-sm text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Reports' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Reports</h3>
            <p className="text-gray-600">Reports content will be displayed here.</p>
          </div>
        )}

        {activeTab === 'Badges' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Badges</h3>
            <p className="text-gray-600">Badges content will be displayed here.</p>
          </div>
        )}

        {activeTab === 'Rewards' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Rewards</h3>
            <p className="text-gray-600">Rewards content will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
