import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

// placeholder other pages (create these files later if you want)
function Reports() { return <div>Reports page (coming soon)</div> }
function Notifications() { return <div>Notifications page</div> }
function Settings() { return <div>Settings page</div> }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Add this line */}
      <Route path="/reports" element={<Reports />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
