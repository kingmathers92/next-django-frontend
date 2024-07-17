"use client";
const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext(null);

const LOCAL_STOARGE_KEY = "is-logged-in";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STOARGE_KEY);
    if (storedAuthStatus) {
      const storedAuthStatusInt = parseInt(storedAuthStatus);
      setIsAuthenticated(storedAuthStatusInt);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STOARGE_KEY, "1");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STOARGE_KEY, "0");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
