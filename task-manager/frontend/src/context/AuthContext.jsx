// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import api from "../services/api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp, ...payload } = jwtDecode(token);
      if (Date.now() < exp * 1000) {
        setUser(payload);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (creds) => {
    const { data } = await api.post("/auth/login", creds);
    localStorage.setItem("token", data.token);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setUser(jwtDecode(data.token));
  };

  const signup = async (details) => {
    const { data } = await api.post("/auth/signup", details);
    localStorage.setItem("token", data.token);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setUser(jwtDecode(data.token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}