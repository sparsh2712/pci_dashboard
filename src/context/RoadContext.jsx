// src/context/RoadContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create Context
const RoadContext = createContext();

// Provider component
export const RoadProvider = ({ children }) => {
  const [roadData, setRoadData] = useState([]);

  // Function to update road data
  const updateRoadData = (data) => {
    setRoadData(data);
  };

  return (
    <RoadContext.Provider value={{ roadData, updateRoadData }}>
      {children}
    </RoadContext.Provider>
  );
};

// Custom hook to use the RoadContext
export const useRoadContext = () => {
  return useContext(RoadContext);
};
