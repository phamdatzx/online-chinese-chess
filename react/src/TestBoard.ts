import { Board } from "./model/Board";

export function testBoard() {
  const board = new Board();
  console.log("Initial board state:");
  board.logBoard();

  console.log("\nUpdating possible moves...");
  board.updatePossibleMovesAllPiece();
  board.logBoard();
}
