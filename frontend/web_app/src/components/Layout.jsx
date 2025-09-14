import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-blue-600">🌊 Ocean Safety</h2>

        <nav className="space-y-2">
          <Link
            to="/"
            className={`block px-4 py-2 rounded-lg ${
              pathname === "/"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            📊 Dashboard
          </Link>
          <Link
            to="/reports"
            className={`block px-4 py-2 rounded-lg ${
              pathname === "/reports"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            📝 Reports
          </Link>
          <Link
            to="/notifications"
            className={`block px-4 py-2 rounded-lg ${
              pathname === "/notifications"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            🔔 Notifications
          </Link>
          <Link
            to="/settings"
            className={`block px-4 py-2 rounded-lg ${
              pathname === "/settings"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            ⚙️ Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
