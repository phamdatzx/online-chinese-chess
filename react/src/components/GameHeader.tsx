"use client";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";

export default function GameHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-amber-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Chinese Chess
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{user}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-amber-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-amber-700"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
