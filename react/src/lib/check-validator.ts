import {
  type BoardType,
  type Piece,
  PieceType,
  Player,
  type Position,
} from "./types";

// Helper function to find the position of a player's general
function findGeneral(board: BoardType, player: Player): Position | null {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const piece = board[row][col];
      if (
        piece &&
        piece.type === PieceType.GENERAL &&
        piece.player === player
      ) {
        return { row, col };
      }
    }
  }
  return null;
}

// Check if a player's general is in check
export function isInCheck(board: BoardType, player: Player): boolean {
  const generalPos = findGeneral(board, player);
  if (!generalPos) return false;

  // Check if any opponent piece can capture the general
  const opponent = player === Player.RED ? Player.BLACK : Player.RED;

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const piece = board[row][col];
      if (piece && piece.player === opponent) {
        const from = { row, col };
        const to = generalPos;
        if (canPieceCapture(board, from, to, piece)) {
          return true;
        }
      }
    }
  }

  return false;
}

// Helper function to check if a position is within the board boundaries
function isWithinBoard(position: Position): boolean {
  return (
    position.row >= 0 &&
    position.row < 10 &&
    position.col >= 0 &&
    position.col < 9
  );
}

// Helper function to check if a position is within the palace
function isInPalace(position: Position, player: Player): boolean {
  const { row, col } = position;

  if (player === Player.BLACK) {
    // Black palace (top)
    return row >= 0 && row <= 2 && col >= 3 && col <= 5;
  } else {
    // Red palace (bottom)
    return row >= 7 && row <= 9 && col >= 3 && col <= 5;
  }
}

// Helper function to check if a position is across the river
function isAcrossRiver(position: Position, player: Player): boolean {
  if (player === Player.RED) {
    return position.row < 5; // Red pieces crossing to the top half
  } else {
    return position.row > 4; // Black pieces crossing to the bottom half
  }
}

// Helper function to count pieces between two positions (for cannon captures)
function countPiecesBetween(
  board: BoardType,
  from: Position,
  to: Position
): number {
  let count = 0;

  // Only works for straight lines (same row or same column)
  if (from.row === to.row) {
    // Horizontal movement
    const minCol = Math.min(from.col, to.col);
    const maxCol = Math.max(from.col, to.col);

    for (let col = minCol + 1; col < maxCol; col++) {
      if (board[from.row][col] !== null) {
        count++;
      }
    }
  } else if (from.col === to.col) {
    // Vertical movement
    const minRow = Math.min(from.row, to.row);
    const maxRow = Math.max(from.row, to.row);

    for (let row = minRow + 1; row < maxRow; row++) {
      if (board[row][from.col] !== null) {
        count++;
      }
    }
  }

  return count;
}

// Helper function to check if there are any pieces between two positions
function hasPiecesBetween(
  board: BoardType,
  from: Position,
  to: Position
): boolean {
  return countPiecesBetween(board, from, to) > 0;
}

function canPieceCapture(
  board: BoardType,
  from: Position,
  to: Position,
  piece: Piece
): boolean {
  const { type, player } = piece;

  // Calculate the movement delta
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);

  // Validate move based on piece type
  switch (type) {
    case PieceType.GENERAL:
      // General can only move within the palace
      if (!isInPalace(to, player)) {
        return false;
      }

      // General can only move one step horizontally or vertically
      return (
        (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)
      );

    case PieceType.ADVISOR:
      // Advisor can only move within the palace
      if (!isInPalace(to, player)) {
        return false;
      }

      // Advisor can only move one step diagonally
      return rowDiff === 1 && colDiff === 1;

    case PieceType.ELEPHANT:
      // Elephant cannot cross the river
      if (isAcrossRiver(to, player)) {
        return false;
      }

      // Elephant moves exactly two steps diagonally
      if (rowDiff !== 2 || colDiff !== 2) {
        return false;
      }

      // Check if there's a piece at the "elephant's eye" (the intermediate diagonal position)
      const eyeRow = (from.row + to.row) / 2;
      const eyeCol = (from.col + to.col) / 2;
      return board[eyeRow][eyeCol] === null;

    case PieceType.HORSE:
      // Horse moves in an L shape: one step orthogonally and then one step diagonally outward
      if (
        !((rowDiff === 1 && colDiff === 2) || (rowDiff === 2 && colDiff === 1))
      ) {
        return false;
      }

      // Check for "hobbling the horse's leg" (blocking the orthogonal step)
      if (rowDiff === 2) {
        // Moving vertically then diagonally
        const legRow = from.row + (to.row > from.row ? 1 : -1);
        return board[legRow][from.col] === null;
      } else {
        // Moving horizontally then diagonally
        const legCol = from.col + (to.col > from.col ? 1 : -1);
        return board[from.row][legCol] === null;
      }

    case PieceType.CHARIOT:
      // Chariot moves any distance horizontally or vertically
      if (!(rowDiff === 0 || colDiff === 0)) {
        return false;
      }

      // Check if there are any pieces in between
      return !hasPiecesBetween(board, from, to);

    case PieceType.CANNON:
      // Cannon moves like a chariot (any distance orthogonally)
      if (!(rowDiff === 0 || colDiff === 0)) {
        return false;
      }

      // If capturing, there must be exactly one piece in between
      return countPiecesBetween(board, from, to) === 1;

    case PieceType.SOLDIER:
      // Soldier can only move forward before crossing the river
      if (!isAcrossRiver(from, player)) {
        if (player === Player.RED) {
          // Red soldier moves up
          return to.row === from.row - 1 && to.col === from.col;
        } else {
          // Black soldier moves down
          return to.row === from.row + 1 && to.col === from.col;
        }
      }

      // After crossing the river, soldier can move forward or sideways
      if (player === Player.RED) {
        // Red soldier (moving up or sideways)
        return (
          (to.row === from.row - 1 && to.col === from.col) ||
          (to.row === from.row && Math.abs(to.col - from.col) === 1)
        );
      } else {
        // Black soldier (moving down or sideways)
        return (
          (to.row === from.row + 1 && to.col === from.col) ||
          (to.row === from.row && Math.abs(to.col - from.col) === 1)
        );
      }

    default:
      return false;
  }
}
