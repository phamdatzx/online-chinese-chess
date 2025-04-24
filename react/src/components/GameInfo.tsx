import { type GameStatus, type Move, type Piece, Player } from "../lib/types";

interface GameInfoProps {
  currentPlayer: Player;
  gameStatus: GameStatus;
  moveHistory: Move[];
  redCaptures: (Piece | null)[];
  blackCaptures: (Piece | null)[];
}

export default function GameInfo({
  currentPlayer,
  gameStatus,
  moveHistory,
  redCaptures,
  blackCaptures,
}: GameInfoProps) {
  const getStatusMessage = (): string => {
    switch (gameStatus) {
      case "playing":
        // Check if the current player is in check
        const isCurrentPlayerInCheck =
          moveHistory.length > 0 &&
          moveHistory[moveHistory.length - 1].resultedInCheck;

        if (isCurrentPlayerInCheck) {
          return `${
            currentPlayer === Player.RED ? "Red" : "Black"
          } is in CHECK!`;
        }
        return `${currentPlayer === Player.RED ? "Red" : "Black"}'s turn`;
      case "redWin":
        return "Red wins!";
      case "blackWin":
        return "Black wins!";
      case "draw":
        return "Game ended in a draw";
      default:
        return "";
    }
  };

  const formatPosition = (pos: { row: number; col: number }): string => {
    return `${9 - pos.col}${pos.row + 1}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-amber-200">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-amber-800 mb-2">Game Status</h2>
        <div
          className={`text-lg font-semibold ${
            gameStatus === "playing"
              ? moveHistory.length > 0 &&
                moveHistory[moveHistory.length - 1].resultedInCheck
                ? "text-red-500"
                : currentPlayer === Player.RED
                ? "text-red-600"
                : "text-black"
              : "text-amber-800"
          }`}
        >
          {getStatusMessage()}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-amber-800 mb-2">
          Captured Pieces
        </h2>
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-red-600">Red Captures:</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {blackCaptures.map(
                (piece, index) =>
                  piece && (
                    <div
                      key={index}
                      className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm"
                    >
                      {piece.type.charAt(0)}
                    </div>
                  )
              )}
              {blackCaptures.length === 0 && (
                <span className="text-gray-500">None</span>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-black">Black Captures:</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {redCaptures.map(
                (piece, index) =>
                  piece && (
                    <div
                      key={index}
                      className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm"
                    >
                      {piece.type.charAt(0)}
                    </div>
                  )
              )}
              {redCaptures.length === 0 && (
                <span className="text-gray-500">None</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-amber-800 mb-2">Move History</h2>
        <div className="max-h-40 overflow-y-auto border border-amber-100 rounded p-2 bg-amber-50">
          {moveHistory.length > 0 ? (
            <ol className="list-decimal pl-5">
              {moveHistory.map((move, index) => (
                <li key={index} className="text-sm mb-1">
                  <span
                    className={
                      move.piece.player === Player.RED
                        ? "text-red-600 font-semibold"
                        : "text-black font-semibold"
                    }
                  >
                    {move.piece.player === Player.RED ? "Red" : "Black"}
                  </span>{" "}
                  {move.piece.type} from {formatPosition(move.from)} to{" "}
                  {formatPosition(move.to)}
                  {move.resultedInCheck && (
                    <span className="text-red-500 ml-1">CHECK!</span>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 text-center py-2">No moves yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
