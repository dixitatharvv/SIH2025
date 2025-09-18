import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Report from './pages/Report';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import './App.css';

function App() {
  const isLoggedIn = Boolean(localStorage.getItem('authToken'));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={true ? <Home /> : <Navigate to="/auth" replace />} />
          <Route path="report" element={<Report />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
