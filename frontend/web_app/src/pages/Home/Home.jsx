import React from 'react';
import { MapPin, Waves, Shield, Phone, Navigation, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-sky-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Title Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {/* App Logo and Name */}
            <div className="flex items-center">
              <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>
            </div>
            {/* SOS Button */}
            <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>SOS</span>
            </button>
          </div>
          
          <p className="text-slate-600 text-lg text-left">
            Stay informed about current ocean conditions and safety alerts.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-8">
          {/* Current Location Card */}
          <div className="bg-slate-50 rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-blue-800 mr-3" />
                <h2 className="text-xl font-semibold text-blue-800">Current Location</h2>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                GPS Active
              </div>
            </div>
            
            {/* Map Container */}
            <div className="h-64 bg-sky-200 rounded-lg border-2 border-slate-300 relative overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-sky-300"></div>
              
              {/* Location Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
              
              {/* Location Info Card */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md">
                <div className="flex items-center text-blue-600 mb-1">
                  <Navigation className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Pacific Coast Beach</span>
                </div>
                <p className="text-xs text-gray-600">37.8651° N, 119.5383° W</p>
              </div>
              
              {/* Legend */}
              <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-md">
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>Your Location</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>Ocean</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports Card */}
          <div className="bg-slate-50 rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-blue-800 mr-3" />
                <h2 className="text-xl font-semibold text-blue-800">Recent Reports</h2>
              </div>
              <button className="text-blue-600 text-lg font-semibold hover:text-blue-700 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50">
                View More
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Report 1 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center shadow-md">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                </div>
                <div className="pr-24 mb-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">Severe Rip Current Alert</h3>
                </div>
                <p className="text-gray-700 text-base mb-6 leading-relaxed">
                  Strong rip currents detected at North Beach. Swimmers advised to avoid the area until conditions improve.
                </p>
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-6 hover:from-gray-50 hover:to-gray-150 transition-colors duration-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-400 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md">
                      <span className="text-white text-2xl">📷</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Image will load from backend</p>
                    <p className="text-xs text-gray-500 mt-1">Click to upload or view image</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Sarah Bhatt</p>
                      <p className="text-xs text-gray-500">Reporter</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">2 hours ago</p>
                    <p className="text-xs text-gray-500">Last updated</p>
                  </div>
                </div>
              </div>

              {/* Report 2 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center shadow-md">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                </div>
                <div className="pr-24 mb-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">Jellyfish Bloom Warning</h3>
                </div>
                <p className="text-gray-700 text-base mb-6 leading-relaxed">
                  Large jellyfish bloom spotted near South Pier. Beachgoers should exercise caution when entering water.
                </p>
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-6 hover:from-gray-50 hover:to-gray-150 transition-colors duration-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-400 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md">
                      <span className="text-white text-2xl">📷</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Image will load from backend</p>
                    <p className="text-xs text-gray-500 mt-1">Click to upload or view image</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Ocean Watch Team</p>
                      <p className="text-xs text-gray-500">Official Reporter</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">5 hours ago</p>
                    <p className="text-xs text-gray-500">Last updated</p>
                  </div>
                </div>
              </div>

              {/* Report 3 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center shadow-md">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                </div>
                <div className="pr-24 mb-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">High Tide Advisory</h3>
                </div>
                <p className="text-gray-700 text-base mb-6 leading-relaxed">
                  Unusually high tides expected this evening. Coastal areas may experience temporary flooding.
                </p>
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-6 hover:from-gray-50 hover:to-gray-150 transition-colors duration-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-400 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md">
                      <span className="text-white text-2xl">📷</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Image will load from backend</p>
                    <p className="text-xs text-gray-500 mt-1">Click to upload or view image</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Weather Station</p>
                      <p className="text-xs text-gray-500">Meteorological Dept.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">1 day ago</p>
                    <p className="text-xs text-gray-500">Last updated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment Card */}
          <div className="bg-slate-50 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-blue-800 mr-3" />
              <h2 className="text-xl font-semibold text-blue-800">Risk Assessment</h2>
            </div>
            
            {/* High Risk Indicator */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 mb-6 shadow-lg">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-start">
                  <AlertTriangle className="w-8 h-8 mr-4 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-left">High Risk</h3>
                    <p className="text-base opacity-90 text-left">Current ocean hazard level for your location</p>
                  </div>
                </div>
                <div className="text-4xl font-bold">76%</div>
              </div>
            </div>
            
            {/* Risk Factors */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Risk Factors</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-base mb-2">
                    <span className="text-gray-800 font-medium">Wave Height</span>
                    <span className="font-bold text-blue-800">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-base mb-2">
                    <span className="text-gray-800 font-medium">Current Strength</span>
                    <span className="font-bold text-blue-800">50%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" style={{width: '50%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-base mb-2">
                    <span className="text-gray-800 font-medium">Water Temperature</span>
                    <span className="font-bold text-blue-800">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" style={{width: '30%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Recommendations Card */}
          <div className="bg-slate-50 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-blue-800 mr-3" />
              <h2 className="text-xl font-semibold text-blue-800">Safety Recommendations</h2>
            </div>
            
            <div className="space-y-3">
              {[
                'Avoid swimming alone',
                'Stay close to shore',
                'Check with lifeguards before entering',
                'Be aware of rip current warnings'
              ].map((recommendation, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700 text-base">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safe Places Nearby Card */}
          <div className="bg-slate-50 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-blue-800 mr-3" />
              <h2 className="text-xl font-semibold text-blue-800">Safe Places Nearby</h2>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  name: 'Main Beach Lifeguard Station',
                  distance: '0.2 km',
                  type: 'Lifeguard Station',
                  phone: '+(91) 1234567890'
                },
                {
                  name: 'Harbor Safe Zone',
                  distance: '0.5 km',
                  type: 'Protected Harbor',
                  phone: '+(91) 1234567890'
                },
                {
                  name: 'Emergency Medical Station',
                  distance: '0.9 km',
                  type: 'Medical Facility',
                  phone: '+(91) 1234567890'
                }
              ].map((place, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-blue-800 mr-2" />
                      <h3 className="font-semibold text-gray-900 text-sm">{place.name}</h3>
                    </div>
                    <span className="text-xs text-gray-600">{place.distance}</span>
                  </div>
                  <p className="text-xs text-blue-600 mb-2">{place.type}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-600">
                      <Phone className="w-3 h-3 mr-1" />
                      <span>{place.phone}</span>
                    </div>
                    <button className="bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium flex items-center hover:bg-blue-700 transition-colors">
                      <Navigation className="w-4 h-4 mr-1" />
                      Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
