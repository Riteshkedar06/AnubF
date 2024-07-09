import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify the token
      fetch("http://localhost:5000/auth/verify", {
        headers: {
          "x-auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setIsAuthenticated(true);
            setUser(data.user);
          } else {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("token");
          }
        });
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser(user);
    navigate("/admin");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
