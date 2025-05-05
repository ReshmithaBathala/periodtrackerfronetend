import React, { createContext, useState, useContext } from "react";

// Create Context for Symptoms
const SymptomContext = createContext();

// Custom hook to use the SymptomContext
export const useSymptoms = () => {
  return useContext(SymptomContext);
};

// Provider component to wrap the app and provide the context value
export const SymptomProvider = ({ children }) => {
  const [symptoms, setSymptoms] = useState([]);

  // Function to update the symptoms
  const updateSymptoms = (newSymptoms) => {
    setSymptoms(newSymptoms);
  };

  return (
    <SymptomContext.Provider value={{ symptoms, updateSymptoms }}>
      {children}
    </SymptomContext.Provider>
  );
};
