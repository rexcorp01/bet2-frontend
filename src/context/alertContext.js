import React, { useState, useCallback } from "react";

export const AlertContext = React.createContext({
  error: null,
  addAlert: () => {},
  removeAlert: () => {}
});

// This context provider is passed to any component requiring the context
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: ""
  });

  const addAlert = (severity, message) => {
    setAlert({
      open: true,
      severity,
      message
    });
  };

  const removeAlert = () => {
    setAlert({
      open: false,
      severity: "",
      message: ""
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        addAlert: useCallback(
          (severity, message) => addAlert(severity, message),
          []
        ),
        removeAlert: useCallback(() => removeAlert(), [])
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
