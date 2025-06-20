// src/App.jsx
import React from 'react';
import { RoadProvider } from './context/RoadContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';

const App = () => {
  return (
    <RoadProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </Router>
    </RoadProvider>
  );
};

export default App;
