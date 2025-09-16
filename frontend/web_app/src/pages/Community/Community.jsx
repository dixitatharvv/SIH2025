import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Users, TrendingUp } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const mockPosts = [
    {
      id: 1,
      author: 'John Doe',
      avatar: '/api/placeholder/40/40',
      time: '2 hours ago',
      content: 'Just reported a pothole on Main Street. Thanks to everyone who helped verify the location!',
      likes: 12,
      comments: 3,
      verified: true
    },
    {
      id: 2,
      author: 'Sarah Wilson',
      avatar: '/api/placeholder/40/40',
      time: '4 hours ago',
      content: 'Community cleanup drive this weekend at Central Park. Who\'s joining?',
      likes: 25,
      comments: 8,
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Community Hub
        </h1>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'feed'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Community Feed
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'groups'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Groups
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'trending'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'feed' && (
              <>
                {/* Create Post */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <textarea
                    placeholder="Share something with the community..."
                    className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-4">
                      <button className="text-gray-500 hover:text-blue-600">
                        📷 Photo
                      </button>
                      <button className="text-gray-500 hover:text-blue-600">
                        📍 Location
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Post
                    </button>
                  </div>
                </div>

                {/* Posts */}
                {mockPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">{post.author}</h3>
                          {post.verified && (
                            <span className="ml-2 text-blue-600">✓</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-4">{post.content}</p>
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button className="flex items-center space-x-2 hover:text-red-600">
                        <Heart className="w-5 h-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-blue-600">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-green-600">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === 'groups' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Community Groups</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold">Local Safety Watch</h3>
                    <p className="text-sm text-gray-600 mt-1">234 members</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold">Environmental Action</h3>
                    <p className="text-sm text-gray-600 mt-1">156 members</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trending' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>#RoadSafety</span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>#CommunityCleanup</span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reports This Week</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolved Issues</span>
                  <span className="font-semibold">67</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Suggested Groups</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Neighborhood Watch</p>
                    <p className="text-sm text-gray-600">89 members</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">Join</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
