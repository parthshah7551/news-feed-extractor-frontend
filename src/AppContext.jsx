import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isDataChanged, setIsDataChanged] = useState(false);

  return (
    <AppContext.Provider value={{ isDataChanged, setIsDataChanged }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
