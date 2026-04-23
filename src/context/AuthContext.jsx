// Removed useEffect-based initAuth to avoid initial flicker to login page.
// Auth state now hydrates synchronously from localStorage at startup.

import { createContext, useContext, useMemo, useState } from "react";
import { api, tokenStore } from "../api/client";
import { loginApi, logoutApi, registerApi } from "../api/auth.api";

const AuthContext = createContext(null);

const getInitialUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(tokenStore.get() && getInitialUser()));
  const [isLoading] = useState(false); // no async boot check

  const setAuthUser = (u) => {
    setUser(u || null);
    setIsAuthenticated(!!u && !!tokenStore.get());
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
  };

  const clearAuth = () => {
    tokenStore.clear();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const login = async (payload) => {
    const res = await loginApi(payload);
    const accessToken = res?.data?.data?.accessToken;
    const userObj = res?.data?.data?.user;

    if (!accessToken) throw new Error("No access token on login");
    tokenStore.set(accessToken);

    if (userObj) {
      setAuthUser(userObj);
    } else {
      const meRes = await api.get("/api/v1/auth/me");
      setAuthUser(meRes?.data?.data?.user || null);
    }

    return res?.data;
  };

  const register = async (payload) => {
    return await registerApi(payload);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      clearAuth();
    }
  };

  const value = useMemo(
    () => ({
      user,
      userId: user?._id || null,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// 