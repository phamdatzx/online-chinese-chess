"use client";

import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // In a real app, you would send this data to your backend
    // For this demo, we'll just log in the user
    login(username);
    navigate("/game");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-800">
            Create an Account
          </h1>
          <p className="mt-2 text-amber-700">
            Join Chinese Chess and start playing
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-amber-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2 flex flex-col">
              <Label htmlFor="username" className="self-start">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <Label htmlFor="email" className="self-start">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <Label htmlFor="password" className="self-start">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <Label htmlFor="confirmPassword" className="self-start">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-6"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-600 hover:text-amber-800 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-amber-600 hover:text-amber-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
