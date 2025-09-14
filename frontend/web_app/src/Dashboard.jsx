import React from "react";
import Layout from "./components/Layout";

export default function Dashboard() {
  return (
    <Layout>
    <div className="bg-sky-100 min-h-screen p-6">
      {/* Top Navbar */}
     

      {/* Main Sections */}
      <div className="space-y-6">
        {/* Location Section */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📍 Current Location</h2>
          <div className="bg-gradient-to-b from-blue-100 to-yellow-100 rounded-xl h-60 flex items-center justify-center relative">
            <div className="absolute right-4 top-4 text-sm bg-white px-3 py-1 rounded shadow">
              <p className="text-red-500">🔴 Your Location</p>
              <p className="text-blue-500">🔵 Ocean</p>
            </div>
            <span className="text-red-500 text-3xl">•</span>
          </div>
          <p className="mt-2 text-gray-600">
            📍 <b>Pacific Coast Beach</b> (37.8651° N, 119.5383° W)
          </p>
        </section>

        {/* Reports Section */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📝 Reports & Activity</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-gray-600">Total Reports</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-green-600">18</p>
              <p className="text-gray-600">Verified</p>
            </div>
          </div>

          <ul className="space-y-3">
            {[
              { text: "Rip Current - North Beach", color: "text-red-500", time: "2h" },
              { text: "Jellyfish Sighting - Pier Area", color: "text-green-500", time: "1d" },
              { text: "Strong Waves - South Cove", color: "text-orange-500", time: "3d" },
              { text: "Sharp Objects - Main Beach", color: "text-orange-500", time: "1w" },
              { text: "Marine Life Alert - Harbor", color: "text-green-500", time: "2w" }
            ].map((item, i) => (
              <li key={i} className="flex justify-between bg-gray-50 p-3 rounded-lg">
                <span className="flex items-center gap-2">
                  ✅ <span>{item.text}</span>
                </span>
                <span className={`font-semibold ${item.color}`}>{item.time}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Risk Assessment */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">🛡 Risk Assessment</h2>
          <div className="bg-orange-50 text-orange-600 p-4 rounded-lg mb-4">
            ⚠️ <b>High Risk:</b> Current ocean hazard level is <b>65%</b>
          </div>
          {[
            { label: "Wave Height", value: 75 },
            { label: "Current Strength", value: 60 },
            { label: "Weather Conditions", value: 45 },
            { label: "Water Temperature", value: 30 },
          ].map((item, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </section>

        {/* Safe Places */}
      {/* Safe Places */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-lg font-semibold mb-4">🛟 Safe Places</h2>
  <ul className="space-y-4">
    {[
      {
        name: "Main Beach Lifeguard Station",
        label: "Lifeguard Station",
        phone: "(555) 123-4567",
        hours: "6:00 AM - 8:00 PM",
        distance: "0.2 mi",
        rating: "4.8",
        icon: "🏖️"
      },
      {
        name: "Harbor Safe Zone",
        label: "Protected Harbor",
        phone: "(555) 987-6543",
        hours: "24 hours",
        distance: "0.5 mi",
        rating: "4.5",
        icon: "⚓"
      },
      {
        name: "Emergency Medical Station",
        label: "Medical Facility",
        phone: "(555) 911-1111",
        hours: "24 hours",
        distance: "0.8 mi",
        rating: "4.9",
        icon: "🏥"
      },
      {
        name: "Coastal Emergency Shelter",
        label: "Emergency Shelter",
        phone: "(555) 456-7890",
        hours: "24 hours",
        distance: "1.2 mi",
        rating: "4.3",
        icon: "🏚️"
      },
    ].map((place, i) => (
      <li
        key={i}
        className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-4 rounded-lg"
      >
        <div>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span className="text-2xl">{place.icon}</span>
            {place.name}
          </div>
          <p className="text-blue-600 text-sm">{place.label}</p>
          <p className="text-sm text-gray-600 mt-1">📞 {place.phone}</p>
          <p className="text-sm text-gray-600">🕒 {place.hours}</p>
        </div>
        <div className="mt-2 md:mt-0 text-right text-sm text-gray-500">
          <p>{place.distance}</p>
          <p>⭐ {place.rating}</p>
        </div>
      </li>
    ))}
  </ul>

  {/* Emergency Contact Box */}
  <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-6 text-center font-medium">
    🚨 <strong>Emergency Contact:</strong> In case of immediate danger, call <strong>911</strong> or use the nearest emergency beacon.
  </div>
</section>

      </div>
    </div>
    </Layout>
  );
}
