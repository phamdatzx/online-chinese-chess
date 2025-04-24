import { type BoardType, PieceType, Player } from "./types";

export function initialBoardSetup(): BoardType {
  // Create an empty 10x9 board
  const board: BoardType = Array(10)
    .fill(null)
    .map(() => Array(9).fill(null));

  // Place the pieces on the board

  // Red pieces (bottom)
  // Chariots (Rooks)
  board[9][0] = { type: PieceType.CHARIOT, player: Player.RED };
  board[9][8] = { type: PieceType.CHARIOT, player: Player.RED };

  // Horses (Knights)
  board[9][1] = { type: PieceType.HORSE, player: Player.RED };
  board[9][7] = { type: PieceType.HORSE, player: Player.RED };

  // Elephants
  board[9][2] = { type: PieceType.ELEPHANT, player: Player.RED };
  board[9][6] = { type: PieceType.ELEPHANT, player: Player.RED };

  // Advisors
  board[9][3] = { type: PieceType.ADVISOR, player: Player.RED };
  board[9][5] = { type: PieceType.ADVISOR, player: Player.RED };

  // General (King)
  board[9][4] = { type: PieceType.GENERAL, player: Player.RED };

  // Cannons
  board[7][1] = { type: PieceType.CANNON, player: Player.RED };
  board[7][7] = { type: PieceType.CANNON, player: Player.RED };

  // Soldiers (Pawns)
  board[6][0] = { type: PieceType.SOLDIER, player: Player.RED };
  board[6][2] = { type: PieceType.SOLDIER, player: Player.RED };
  board[6][4] = { type: PieceType.SOLDIER, player: Player.RED };
  board[6][6] = { type: PieceType.SOLDIER, player: Player.RED };
  board[6][8] = { type: PieceType.SOLDIER, player: Player.RED };

  // Black pieces (top)
  // Chariots (Rooks)
  board[0][0] = { type: PieceType.CHARIOT, player: Player.BLACK };
  board[0][8] = { type: PieceType.CHARIOT, player: Player.BLACK };

  // Horses (Knights)
  board[0][1] = { type: PieceType.HORSE, player: Player.BLACK };
  board[0][7] = { type: PieceType.HORSE, player: Player.BLACK };

  // Elephants
  board[0][2] = { type: PieceType.ELEPHANT, player: Player.BLACK };
  board[0][6] = { type: PieceType.ELEPHANT, player: Player.BLACK };

  // Advisors
  board[0][3] = { type: PieceType.ADVISOR, player: Player.BLACK };
  board[0][5] = { type: PieceType.ADVISOR, player: Player.BLACK };

  // General (King)
  board[0][4] = { type: PieceType.GENERAL, player: Player.BLACK };

  // Cannons
  board[2][1] = { type: PieceType.CANNON, player: Player.BLACK };
  board[2][7] = { type: PieceType.CANNON, player: Player.BLACK };

  // Soldiers (Pawns)
  board[3][0] = { type: PieceType.SOLDIER, player: Player.BLACK };
  board[3][2] = { type: PieceType.SOLDIER, player: Player.BLACK };
  board[3][4] = { type: PieceType.SOLDIER, player: Player.BLACK };
  board[3][6] = { type: PieceType.SOLDIER, player: Player.BLACK };
  board[3][8] = { type: PieceType.SOLDIER, player: Player.BLACK };

  return board;
}
