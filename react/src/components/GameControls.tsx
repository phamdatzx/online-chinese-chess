import { Button } from "./ui/Button";
import { RefreshCw, Undo2 } from "lucide-react";
import { GameStatus } from "../lib/types";

interface GameControlsProps {
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  gameStatus: GameStatus;
}

export default function GameControls({
  onReset,
  onUndo,
  canUndo,
  gameStatus,
}: GameControlsProps) {
  const isGameOver = gameStatus !== "playing";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-amber-200">
      <h2 className="text-xl font-bold text-amber-800 mb-4">Game Controls</h2>
      <div className="flex flex-col gap-3">
        <Button
          onClick={onUndo}
          disabled={!canUndo}
          variant="outline"
          className="flex items-center gap-2 border-amber-600 text-amber-800 hover:bg-amber-50 disabled:opacity-50"
        >
          <Undo2 className="w-4 h-4" />
          Undo Last Move
        </Button>

        <Button
          onClick={onReset}
          variant={isGameOver ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isGameOver
              ? "bg-amber-600 hover:bg-amber-700 text-white"
              : "border-amber-600 text-amber-800 hover:bg-amber-50"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          {isGameOver ? "New Game" : "Reset Game"}
        </Button>
      </div>
    </div>
  );
}
