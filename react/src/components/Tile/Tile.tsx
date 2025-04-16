import React from "react";
import Piece from "../../model/Piece/Piece";

// Tile component props interface
interface TileProps {
  row: number;
  col: number;
  isHighlighted: boolean;
  pieceModel: Piece | null;
}

// Tile component - a single square on the chessboard
const Tile: React.FC<TileProps> = ({ row, col, isHighlighted, pieceModel }) => {
  return (
    <div
      className="relative w-full h-full flex justify-center items-center"
      data-row={row}
      data-col={col}
    >
      {pieceModel && (
        <img
          src={pieceModel.getImagePath()}
          className="w-9/10 h-9/10"
          alt="Chess piece"
        />
      )}
      {isHighlighted && (
        <div className="absolute w-4 h-4 bg-[#03ff46] rounded-full z-10 border border-black" />
      )}
    </div>
  );
};

export default Tile;
