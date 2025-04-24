import { type Piece as PieceType, Player } from "../lib/types";

interface PieceProps {
  piece: PieceType;
  isSelected: boolean;
}

interface PieceProps {
  piece: PieceType;
  isSelected: boolean;
}

export default function Piece({ piece, isSelected }: PieceProps) {
  const { type, player } = piece;

  // Get the piece image URL based on type and player
  const getPieceImageUrl = () => {
    const color = player === Player.RED ? "red" : "black";
    const pieceType = type.toLowerCase();
    return `/piece_images/${color}-${pieceType}.png`;
  };

  return (
    <div
      className={`
        w-14 h-14 rounded-full flex items-center justify-center
        ${isSelected ? "ring-4 ring-yellow-400" : ""}
        shadow-md relative
      `}
    >
      <img
        src={getPieceImageUrl()}
        alt={`${player} ${type}`}
        width={56}
        height={56}
      />
    </div>
  );
}
