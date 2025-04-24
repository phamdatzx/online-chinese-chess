import { BoardType, Position } from "../lib/types";
import Piece from "./Piece";

interface BoardProps {
  board: BoardType;
  selectedPiece: Position | null;
  availableMoves: Position[]; // Add this prop
  onSquareClick: (position: Position) => void;
}

export default function Board({
  board,
  selectedPiece,
  availableMoves, // Add this prop
  onSquareClick,
}: BoardProps) {
  // Board dimensions
  const ROWS = 10;
  const COLS = 9;

  // Generate row labels if needed (not rendered currently)
  const rowLabels = Array.from({ length: ROWS }, (_, i) => i + 1);

  // Check if a position is the selected piece
  const isSelected = (row: number, col: number) => {
    return (
      selectedPiece && selectedPiece.row === row && selectedPiece.col === col
    );
  };

  // Check if a position is in the palace (for generals and advisors)
  const isInPalace = (row: number, col: number) => {
    // Black palace
    if (row <= 2 && col >= 3 && col <= 5) return true;
    // Red palace
    if (row >= 7 && col >= 3 && col <= 5) return true;
    return false;
  };

  // Check if a position is a river crossing point
  const isRiverPoint = (row: number, col: number) => {
    return row === 4 || row === 5;
  };

  // Add helper function to check if a position is an available move
  const isAvailableMove = (row: number, col: number) => {
    return availableMoves.some((pos) => pos.row === row && pos.col === col);
  };

  return (
    <div className="relative overflow-hidden rounded-lg border-4 border-amber-800 bg-amber-100 shadow-xl">
      <div className="relative w-full aspect-[9/10] bg-[url('/board.jpg')] bg-cover bg-center m-0 p-0">
        <div className="grid grid-rows-10 h-full">
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid grid-cols-9">
              {Array.from({ length: COLS }).map((_, colIndex) => {
                const piece = board[rowIndex][colIndex];
                const position = { row: rowIndex, col: colIndex };
                const isAvailable = isAvailableMove(rowIndex, colIndex);

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`relative flex items-center justify-center cursor-pointer ${
                      isAvailable
                        ? "after:absolute after:w-5 after:h-5 after:bg-green-500 after:rounded-full after:opacity-100"
                        : ""
                    }`}
                    onClick={() => onSquareClick(position)}
                  >
                    {piece && (
                      <Piece
                        piece={piece}
                        isSelected={isSelected(rowIndex, colIndex)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
