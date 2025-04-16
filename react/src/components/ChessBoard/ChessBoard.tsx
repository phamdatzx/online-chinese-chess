import { Board } from "../../model/Board";
import Tile from "../Tile/Tile";
import React, { useState } from "react";
import boardBg from "../../assets/board.jpg"; // Import the image
import Piece from "../../model/Piece/Piece";

interface Position {
  row: number;
  col: number;
}

interface DraggedPiece {
  piece: Piece;
  from: Position;
  offsetX: number;
  offsetY: number;
}

const Chessboard: React.FC = () => {
  const rows = 10;
  const cols = 9;
  const [boardModel, setBoardModel] = useState<Board>(new Board());
  const [dragged, setDragged] = useState<DraggedPiece | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  // When a tile is pressed, if it has a piece then start dragging.
  const handleMouseDownTile = (
    row: number,
    col: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const piece = boardModel.pieces[row][col];
    if (!piece) return; // nothing to grab

    // Compute the offset of the click within the tile
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragged({ piece, from: { row, col }, offsetX, offsetY });
    // (At this point you might already highlight valid moves based on piece.possibleMoves.)
  };

  // While dragging, update the floating piece's position (relative to the board container)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragged) return;
    const boardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boardRect.left;
    const y = e.clientY - boardRect.top;
    setDragPos({ x, y });
  };

  // When mouse button is released, compute the drop cell.
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragged) return;
    const boardRect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - boardRect.left;
    const relY = e.clientY - boardRect.top;
    const dropCol = Math.floor((relX / boardRect.width) * cols);
    const dropRow = Math.floor((relY / boardRect.height) * rows);

    // Check if the drop destination is a valid move
    const validMove = dragged.piece.possibleMoves.some(
      (move: Position) => move.row === dropRow && move.col === dropCol
    );

    if (validMove) {
      boardModel.movePiece(dragged.from, { row: dropRow, col: dropCol });
    }

    // Clear drag state.
    setDragged(null);
    setDragPos(null);
  };

  // Render board tiles. Each tile is absolutely positioned within the board.
  const renderTiles = () => {
    const tiles = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // If dragging a piece, highlight valid moves.
        const isHighlighted =
          dragged &&
          dragged.piece.possibleMoves.some(
            (move: Position) => move.row === row && move.col === col
          );

        // Hide the piece in its original cell if it is being dragged.
        const pieceModel =
          dragged && dragged.from.row === row && dragged.from.col === col
            ? null
            : boardModel.pieces[row][col];

        tiles.push(
          <div
            key={`${row}-${col}`}
            className="absolute"
            style={{
              width: `${100 / cols}%`,
              height: `${100 / rows}%`,
              top: `${(row / rows) * 100}%`,
              left: `${(col / cols) * 100}%`,
            }}
            onMouseDown={(e) => handleMouseDownTile(row, col, e)}
          >
            <Tile
              row={row}
              col={col}
              isHighlighted={isHighlighted}
              pieceModel={pieceModel}
            />
          </div>
        );
      }
    }
    return tiles;
  };

  return (
    <div
      className="w-full relative"
      style={{ paddingTop: `${(rows / cols) * 100}%` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${boardBg})`,
          backgroundSize: "100% 99%",
        }}
      >
        {renderTiles()}
        {dragged && dragPos && (
          <img
            src={dragged.piece.getImagePath()}
            alt="Dragging piece"
            className="absolute pointer-events-none"
            style={{
              width: `${100 / cols}%`,
              height: `${100 / rows}%`,
              top: dragPos.y - dragged.offsetY,
              left: dragPos.x - dragged.offsetX,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chessboard;
