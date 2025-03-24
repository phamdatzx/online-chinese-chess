import Position from "../Position";
import Piece from "./Piece";
import { PieceType } from "./Piece";

export default class Horse extends Piece {
  getPieceType(): PieceType {
    return PieceType.Horse;
  }

  updatePossibleMoves(boardPieces: Piece[][]): void {
    const checkPossibleMoves: Position[] = [
      new Position(this.position.row - 2, this.position.col - 1),
      new Position(this.position.row - 2, this.position.col + 1),
      new Position(this.position.row - 1, this.position.col - 2),
      new Position(this.position.row - 1, this.position.col + 2),
      new Position(this.position.row + 1, this.position.col - 2),
      new Position(this.position.row + 1, this.position.col + 2),
      new Position(this.position.row + 2, this.position.col - 1),
      new Position(this.position.row + 2, this.position.col + 1),
    ];

    this.possibleMoves = checkPossibleMoves.filter((endPosition) => {
      //check if end position is on board
      if (!this.isOnBoard(endPosition)) {
        return false;
      }

      //check if way is blocked
      if (this.isBlocked(boardPieces, endPosition)) {
        return false;
      }

      //check if end position is stolen by ally piece
      if (this.isPositionHasAllyPiece(boardPieces, endPosition)) {
        return false;
      }

      return true;
    });
  }

  //check if the adjacent position of way to end position is blocked
  isBlocked(boardPieces: Piece[][], endPosition: Position): boolean {
    //way to top
    if (endPosition.row === this.position.row - 2) {
      return this.isPositionHasPiece(
        boardPieces,
        new Position(this.position.row - 1, this.position.col)
      );
    }
    //way to bottom
    if (endPosition.row === this.position.row + 2) {
      return this.isPositionHasPiece(
        boardPieces,
        new Position(this.position.row + 1, this.position.row)
      );
    }

    //way to left
    if (endPosition.col === this.position.col - 2) {
      return this.isPositionHasPiece(
        boardPieces,
        new Position(this.position.row, this.position.col - 1)
      );
    }

    //way to right
    if (endPosition.col === this.position.col + 2) {
      return this.isPositionHasPiece(
        boardPieces,
        new Position(this.position.row, this.position.col + 1)
      );
    }

    return true;
  }
}
