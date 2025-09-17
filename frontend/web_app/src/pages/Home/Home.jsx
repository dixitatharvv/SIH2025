import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-sky-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to SIH 2025
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <p className="text-gray-600">Dashboard content goes here</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-600">Recent activity content goes here</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <p className="text-gray-600">Notifications content goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
