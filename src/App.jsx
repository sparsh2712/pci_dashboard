// src/App.jsx
import React from 'react';
import { RoadProvider } from './context/RoadContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const App = () => {
  return (
    <RoadProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </RoadProvider>
  );
};

export default App;
