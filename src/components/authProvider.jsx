"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext(null);

const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";
const LOCAL_STORAGE_KEY = "is-logged-in";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuthStatus) {
      const storedAuthStatusInt = parseInt(storedAuthStatus);
      setIsAuthenticated(storedAuthStatusInt);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "1");
    const nextUrl = searchParams.get("next");
    const invalidNextUrl = ["/login", "/logout"];
    console.log(nextUrl);
    const nextUrlValid =
      nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl);
    if (nextUrlValid) {
      router.replace(nextUrl);
      return;
    } else {
      router.replace(LOGIN_REDIRECT_URL);
      return;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const loginRequiredRedirect = () => {
    // user is not logged in via API
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    let newUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`;
    console.log(newUrl);
    if (LOGIN_REQUIRED_URL === pathname) {
      newUrl = `${LOGIN_REQUIRED_URL}`;
    }
    router.replace(newUrl);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loginRequiredRedirect }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
