import Piece from "./Piece";
import { PieceType } from "./Piece";
import Position from "../Position";

export default class Soldier extends Piece {
  getPieceType(): PieceType {
    return PieceType.Soldier;
  }

  updatePossibleMoves(boardPieces: Piece[][]): void {
    if (this.isCrossedRiver()) {
      const checkPossibleMoves: Position[] = [
        this.getAheadPosition(), //ahead
        new Position(this.position.row, this.position.col - 1), // left
        new Position(this.position.row, this.position.col + 1), // right
      ];

      this.possibleMoves = checkPossibleMoves.filter((endPosition) => {
        //check if end position is on board
        if (!this.isOnBoard(endPosition)) {
          return false;
        }

        //check if end position is stolen by ally piece
        if (this.isPositionHasAllyPiece(boardPieces, endPosition)) {
          return false;
        }

        return true;
      });
    }
    //not crossed river
    else {
      const checkPossibleMove = this.getAheadPosition();
      if (this.isOnBoard(checkPossibleMove)) {
        if (!this.isPositionHasAllyPiece(boardPieces, checkPossibleMove)) {
          this.possibleMoves = [checkPossibleMove];
        }
      }
    }
  }

  getAheadPosition(): Position {
    if (this.color === "red") {
      return new Position(this.position.row - 1, this.position.col);
    } else {
      return new Position(this.position.row + 1, this.position.col);
    }
  }

  //check if this soldier has crossed the river
  isCrossedRiver(): boolean {
    if (this.color === "red") {
      return this.position.row <= 4;
    } else {
      return this.position.row >= 5;
    }
  }
}
