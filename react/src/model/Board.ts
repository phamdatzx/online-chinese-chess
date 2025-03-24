import Piece from "./Piece/Piece";
import { PieceType } from "./Piece/Piece";
import Chariot from "./Piece/Chariot";
import Cannon from "./Piece/Cannon";
import Advisor from "./Piece/Advisor";
import Elephant from "./Piece/Elephant";
import Horse from "./Piece/Horse";
import King from "./Piece/King";
import Soldier from "./Piece/Soldier";
import Position from "./Position";

export class Board {
  pieces: Piece[][];

  constructor() {
    this.pieces = Array(10)
      .fill(null)
      .map(() => Array(9).fill(null));

    this.initPieces();
  }

  initPieces() {
    this.pieces[0][0] = new Chariot("black", new Position(0, 0));
    this.pieces[0][1] = new Horse("black", new Position(0, 1));
    this.pieces[0][2] = new Elephant("black", new Position(0, 2));
    this.pieces[0][3] = new Advisor("black", new Position(0, 3));
    this.pieces[0][4] = new King("black", new Position(0, 4));
    this.pieces[0][5] = new Advisor("black", new Position(0, 5));
    this.pieces[0][6] = new Elephant("black", new Position(0, 6));
    this.pieces[0][7] = new Horse("black", new Position(0, 7));
    this.pieces[0][8] = new Chariot("black", new Position(0, 8));
    this.pieces[2][1] = new Cannon("black", new Position(2, 1));
    this.pieces[2][7] = new Cannon("black", new Position(2, 7));
    this.pieces[3][0] = new Soldier("black", new Position(3, 0));
    this.pieces[3][2] = new Soldier("black", new Position(3, 2));
    this.pieces[3][4] = new Soldier("black", new Position(3, 4));
    this.pieces[3][6] = new Soldier("black", new Position(3, 6));
    this.pieces[3][8] = new Soldier("black", new Position(3, 8));

    this.pieces[9][0] = new Chariot("red", new Position(9, 0));
    this.pieces[9][1] = new Horse("red", new Position(9, 1));
    this.pieces[9][2] = new Elephant("red", new Position(9, 2));
    this.pieces[9][3] = new Advisor("red", new Position(9, 3));
    this.pieces[9][4] = new King("red", new Position(9, 4));
    this.pieces[9][5] = new Advisor("red", new Position(9, 5));
    this.pieces[9][6] = new Elephant("red", new Position(9, 6));
    this.pieces[9][7] = new Horse("red", new Position(9, 7));
    this.pieces[9][8] = new Chariot("red", new Position(9, 8));
    this.pieces[7][1] = new Cannon("red", new Position(7, 1));
    this.pieces[7][7] = new Cannon("red", new Position(7, 7));
    this.pieces[6][0] = new Soldier("red", new Position(6, 0));
    this.pieces[6][2] = new Soldier("red", new Position(6, 2));
    this.pieces[6][4] = new Soldier("red", new Position(6, 4));
    this.pieces[6][6] = new Soldier("red", new Position(6, 6));
    this.pieces[6][8] = new Soldier("red", new Position(6, 8));
  }

  updatePossibleMovesAllPiece() {
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
