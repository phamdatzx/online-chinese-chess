"use client";

import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import GameHeader from "../components/GameHeader";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-amber-50">
      <GameHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md border border-amber-200">
          <h1 className="text-3xl font-bold text-amber-800 mb-6">
            Player Profile
          </h1>

          <div className="space-y-4">
            <div className="p-4 bg-amber-100 rounded-lg">
              <h2 className="text-lg font-semibold text-amber-800">Username</h2>
              <p className="text-amber-700">{user}</p>
            </div>

            <div className="p-4 bg-amber-100 rounded-lg">
              <h2 className="text-lg font-semibold text-amber-800">
                Game Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-amber-600">Games Played</p>
                  <p className="text-2xl font-bold text-amber-800">0</p>
                </div>
                <div>
                  <p className="text-sm text-amber-600">Win Rate</p>
                  <p className="text-2xl font-bold text-amber-800">0%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/game">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Play New Game
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
