import Piece from "./Piece/Piece";
import { PieceType } from "./Piece/Piece";
import Chariot from "./Piece/Chariot";
import Cannon from "./Piece/Cannon";
import Advisor from "./Piece/Advisor";
import Elephant from "./Piece/Elephant";
import Horse from "./Piece/Horse";
import King from "./Piece/King";
import Soldier from "./Piece/Soldier";

export class Board {
  pieces: (Piece | null)[][];

  constructor() {
    this.pieces = Array(10)
      .fill(null)
      .map(() => Array(9).fill(null));

    this.initPieces();
    this.updatePossibleMovesAllPieces();
  }

  clone() {
    const newBoard = new Board();
    newBoard.pieces = this.pieces.map((row) => [...row]);
    return newBoard;
  }

  initPieces() {
    this.pieces[0][0] = new Chariot("black", { row: 0, col: 0 });
    this.pieces[0][1] = new Horse("black", { row: 0, col: 1 });
    this.pieces[0][2] = new Elephant("black", { row: 0, col: 2 });
    this.pieces[0][3] = new Advisor("black", { row: 0, col: 3 });
    this.pieces[0][4] = new King("black", { row: 0, col: 4 });
    this.pieces[0][5] = new Advisor("black", { row: 0, col: 5 });
    this.pieces[0][6] = new Elephant("black", { row: 0, col: 6 });
    this.pieces[0][7] = new Horse("black", { row: 0, col: 7 });
    this.pieces[0][8] = new Chariot("black", { row: 0, col: 8 });
    this.pieces[2][1] = new Cannon("black", { row: 2, col: 1 });
    this.pieces[2][7] = new Cannon("black", { row: 2, col: 7 });
    this.pieces[3][0] = new Soldier("black", { row: 3, col: 0 });
    this.pieces[3][2] = new Soldier("black", { row: 3, col: 2 });
    this.pieces[3][4] = new Soldier("black", { row: 3, col: 4 });
    this.pieces[3][6] = new Soldier("black", { row: 3, col: 6 });
    this.pieces[3][8] = new Soldier("black", { row: 3, col: 8 });

    this.pieces[9][0] = new Chariot("red", { row: 9, col: 0 });
    this.pieces[9][1] = new Horse("red", { row: 9, col: 1 });
    this.pieces[9][2] = new Elephant("red", { row: 9, col: 2 });
    this.pieces[9][3] = new Advisor("red", { row: 9, col: 3 });
    this.pieces[9][4] = new King("red", { row: 9, col: 4 });
    this.pieces[9][5] = new Advisor("red", { row: 9, col: 5 });
    this.pieces[9][6] = new Elephant("red", { row: 9, col: 6 });
    this.pieces[9][7] = new Horse("red", { row: 9, col: 7 });
    this.pieces[9][8] = new Chariot("red", { row: 9, col: 8 });
    this.pieces[7][1] = new Cannon("red", { row: 7, col: 1 });
    this.pieces[7][7] = new Cannon("red", { row: 7, col: 7 });
    this.pieces[6][0] = new Soldier("red", { row: 6, col: 0 });
    this.pieces[6][2] = new Soldier("red", { row: 6, col: 2 });
    this.pieces[6][4] = new Soldier("red", { row: 6, col: 4 });
    this.pieces[6][6] = new Soldier("red", { row: 6, col: 6 });
    this.pieces[6][8] = new Soldier("red", { row: 6, col: 8 });
  }

  movePiece(
    from: { row: number; col: number },
    to: { row: number; col: number }
  ) {
    try {
      this.pieces[to.row][to.col] = this.pieces[from.row][from.col];
      this.pieces[from.row][from.col] = null;
      this.pieces[to.row][to.col].position = { row: to.row, col: to.col };
      this.updatePossibleMovesAllPieces();
    } catch (e) {
      console.log(e);
    }
  }

  updatePossibleMovesAllPieces() {
    for (const row of this.pieces) {
      for (const piece of row) {
        if (piece) {
          piece.updatePossibleMoves(this.pieces);
        }
      }
    }
  }

  logBoard() {
    for (const row of this.pieces) {
      for (const piece of row) {
        if (piece) {
          console.log(PieceType[piece.getPieceType()]);
          console.log(piece.position);
          console.log(piece.possibleMoves);
        }
      }
    }
  }
}
