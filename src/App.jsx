// src/App.jsx
import React from 'react';
import { RoadProvider } from './context/RoadContext';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <RoadProvider>
      <Dashboard />
    </RoadProvider>
  );
};

export default App;
