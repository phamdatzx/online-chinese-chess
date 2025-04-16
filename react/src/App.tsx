// App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import { useState } from "react";
import Chessboard from "./components/ChessBoard/ChessBoard";
import axiosInstance from "./config/axiosInstance";
import Cookies from "js-cookie";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = (email: string, password: string) => {
    axiosInstance
      .post("/auth/login", { username: email, password })
      .then((response) => {
        console.log("Login successful", response.data);
        Cookies.set("accessToken", response.data.accessToken, {
          expires: 7,
          secure: true,
        });
        Cookies.set("refreshToken", response.data.refreshToken, {
          expires: 7,
          secure: true,
          path: "/auth/refresh-token",
        });
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth login logic
    console.log("Google login clicked");
    setIsAuthenticated(true);
  };

  const handleFacebookLogin = () => {
    // Implement Facebook OAuth login logic
    console.log("Facebook login clicked");
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage
              onLogin={handleLogin}
              onGoogleLogin={handleGoogleLogin}
              onFacebookLogin={handleFacebookLogin}
            />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/chess" element={<Chessboard />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
