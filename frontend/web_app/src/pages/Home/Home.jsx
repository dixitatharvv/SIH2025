import React, { useEffect, useState } from 'react';
import { MapPin, Waves, Shield, Phone, Navigation, AlertTriangle, CheckCircle, Users, Clock, Star, Anchor, Cross } from 'lucide-react';
import MapView from '../../components/MapView.jsx';
import { fetchHotspots } from '../../services/hotspotService.js';

const Home = () => {
  const [hotspots, setHotspots] = useState([]);
  const [loadingHotspots, setLoadingHotspots] = useState(true);
  const [hotspotError, setHotspotError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const items = await fetchHotspots();
        if (mounted) setHotspots(items);
      } catch (e) {
        if (mounted) setHotspotError('Failed to load hotspots');
      } finally {
        if (mounted) setLoadingHotspots(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-sky-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Title Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {/* App Logo and Name */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900 text-left">Dashboard</h1>
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
            <div className="h-64 rounded-lg border-2 border-slate-300 overflow-hidden">
              <div className="relative h-full">
                {hotspotError ? (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-red-600 bg-red-50">{hotspotError}</div>
                ) : null}
                <MapView
                  height="256px"
                  center={[19.0760, 72.8777]}
                  zoom={11}
                  markers={[{ position: [19.0760, 72.8777], popup: 'You are here' }]}
                  hotspots={hotspots}
                />
                {loadingHotspots ? (
                  <div className="absolute bottom-2 left-2 bg-white/80 text-gray-700 text-xs px-2 py-1 rounded">Loading hotspots…</div>
                ) : null}
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
              {/* Report 1 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative flex flex-col h-full">
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center shadow-md">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                </div>
                <div className="pr-24 mb-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">Coastal Flooding Alert</h3>
                </div>
                <p className="text-gray-700 text-base mb-6 leading-relaxed">
                  Severe coastal flooding reported in low-lying areas. Residents advised to move to higher ground immediately.
                </p>
                <div className="h-48 rounded-xl overflow-hidden mb-6 flex-grow">
                  <img 
                    src="/src/assets/flooding.jpg" 
                    alt="Coastal flooding" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
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
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative flex flex-col h-full">
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center shadow-md">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                </div>
                <div className="pr-24 mb-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">Flash Flood Warning</h3>
                </div>
                <p className="text-gray-700 text-base mb-6 leading-relaxed">
                  Heavy rainfall causing flash floods in urban areas. Avoid driving through flooded streets and seek shelter.
                </p>
                <div className="h-48 rounded-xl overflow-hidden mb-6 flex-grow">
                  <img 
                    src="/src/assets/flooding2.jpg" 
                    alt="Flash flood" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
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
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative flex flex-col h-full">
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center shadow-md">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                </div>
                <div className="pr-24 mb-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">River Flood Alert</h3>
                </div>
                <p className="text-gray-700 text-base mb-6 leading-relaxed">
                  River levels rising rapidly due to upstream rainfall. Evacuation orders issued for riverside communities.
                </p>
                <div className="h-48 rounded-xl overflow-hidden mb-6 flex-grow">
                  <img 
                    src="/src/assets/flooding3.jpg" 
                    alt="River flood" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
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

          {/* Safe Places Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Shield className="w-5 h-5 text-red-500 mr-3" />
              <h2 className="text-lg font-semibold text-gray-800">Safe Places</h2>
            </div>
            
            <div className="space-y-4">
              {/* Main Beach Lifeguard Station */}
              <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mt-1">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base mb-1">Main Beach Lifeguard Station</h3>
                    <p className="text-sm text-blue-600 mb-2 text-left">Lifeguard Station</p>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>6:00 AM - 8:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">0.2 mi</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">4.8</span>
                  </div>
                </div>
              </div>

              {/* Harbor Safe Zone */}
              <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <Anchor className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base mb-1">Harbor Safe Zone</h3>
                    <p className="text-sm text-blue-600 mb-2 text-left">Protected Harbor</p>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>(555) 987-6543</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>24 hours</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">0.5 mi</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">4.5</span>
                  </div>
                </div>
              </div>

              {/* Emergency Medical Station */}
              <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                    <Cross className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base mb-1">Emergency Medical Station</h3>
                    <p className="text-sm text-blue-600 mb-2 text-left">Medical Facility</p>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>(555) 911-1111</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>24 hours</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">0.8 mi</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">4.9</span>
                  </div>
                </div>
              </div>

              {/* Coastal Emergency Shelter */}
              <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mt-1">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base mb-1">Coastal Emergency Shelter</h3>
                    <p className="text-sm text-blue-600 mb-2 text-left">Emergency Shelter</p>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>(555) 456-7890</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>24 hours</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">1.2 mi</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">4.7</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
