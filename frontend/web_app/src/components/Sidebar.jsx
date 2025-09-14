import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg flex flex-col p-6">
      <h1 className="text-xl font-bold mb-10">🌊 Ocean Safety</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100">
          📊 Dashboard
        </Link>
        <Link to="/reports" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100">
          📝 Reports
        </Link>
        <Link to="/notifications" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100">
          🔔 Notifications
        </Link>
        <Link to="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100">
          ⚙️ Settings
        </Link>
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-100 text-red-600">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
