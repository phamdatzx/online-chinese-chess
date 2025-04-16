// components/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    // Then redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg">
          Welcome to your dashboard! You are successfully logged in.
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
