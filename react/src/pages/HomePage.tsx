import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-800">
          Chinese Chess (Xiangqi)
        </h1>
        <p className="text-lg text-amber-700">
          Experience the ancient game of strategy with our modern digital
          implementation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/game">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg">
              Play as Guest
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="outline"
              className="border-amber-600 text-amber-800 hover:bg-amber-100 px-8 py-6 text-lg"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
