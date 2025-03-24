import Piece from "./Piece";
import { PieceType } from "./Piece";
import Position from "../Position";

export default class Chariot extends Piece {
  getPieceType(): PieceType {
    return PieceType.Chariot;
  }

  updatePossibleMoves(boardPieces: Piece[][]): void {
    //clear possible moves
    this.possibleMoves = [];
    //top
    let targetPosition = new Position(this.position.row - 1, this.position.col);
    while (targetPosition.row >= 0) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        break;
      }

      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        this.possibleMoves.push(targetPosition);
        break;
      }

      this.possibleMoves.push(targetPosition);

      targetPosition = new Position(targetPosition.row - 1, targetPosition.col);
    }
    //bottom
    targetPosition = new Position(this.position.row + 1, this.position.col);
    while (targetPosition.row <= 9) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        break;
      }

      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        this.possibleMoves.push(targetPosition);
        break;
      }

      this.possibleMoves.push(targetPosition);

      targetPosition = new Position(targetPosition.row + 1, targetPosition.col);
    }
    //left
    targetPosition = new Position(this.position.row, this.position.col - 1);
    while (targetPosition.col >= 0) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        break;
      }

      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        this.possibleMoves.push(targetPosition);
        break;
      }

      this.possibleMoves.push(targetPosition);

      targetPosition = new Position(targetPosition.row, targetPosition.col - 1);
    }
    //right
    targetPosition = new Position(this.position.row, this.position.col + 1);
    while (targetPosition.col <= 8) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        break;
      }

      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        this.possibleMoves.push(targetPosition);
        break;
      }

      this.possibleMoves.push(targetPosition);

      targetPosition = new Position(targetPosition.row, targetPosition.col + 1);
    }
  }
}
