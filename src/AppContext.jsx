import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isSaveAllBtn, setIsSaveAllBtn] = useState(0);
  const [isSelectAllBtn, setIsSelectAllBtn] = useState(0);
  const [isFromBtn, setIsFromBtn] = useState("");

  return (
    <AppContext.Provider
      value={{
        isDataChanged,
        isSaveAllBtn,
        setIsDataChanged,
        setIsSaveAllBtn,
        isSelectAllBtn,
        setIsSelectAllBtn,
        isFromBtn,
        setIsFromBtn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
