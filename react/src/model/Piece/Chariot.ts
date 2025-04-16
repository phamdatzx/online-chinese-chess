import Piece from "./Piece";
import { PieceType } from "./Piece";

export default class Chariot extends Piece {
  getPieceType(): PieceType {
    return PieceType.Chariot;
  }

  updatePossibleMoves(boardPieces: Piece[][]): void {
    //clear possible moves
    this.possibleMoves = [];
    //top
    let targetPosition = { row: this.position.row - 1, col: this.position.col };
    while (targetPosition.row >= 0) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        break;
      }

      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        this.possibleMoves.push(targetPosition);
        break;
      }

      this.possibleMoves.push(targetPosition);

      targetPosition = { row: targetPosition.row - 1, col: targetPosition.col };
    }
    //bottom
    targetPosition = { row: this.position.row + 1, col: this.position.col };
    while (targetPosition.row <= 9) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        break;
      }

      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        this.possibleMoves.push(targetPosition);
        break;
      }

      this.possibleMoves.push(targetPosition);

      targetPosition = { row: targetPosition.row + 1, col: targetPosition.col };
    }
    //left
    targetPosition = { row: this.position.row, col: this.position.col - 1 };
    while (targetPosition.col >= 0) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        break;
      }

      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        this.possibleMoves.push(targetPosition);
        break;
      }

      this.possibleMoves.push(targetPosition);

      targetPosition = { row: targetPosition.row, col: targetPosition.col - 1 };
    }
    //right
    targetPosition = { row: this.position.row, col: this.position.col + 1 };
    while (targetPosition.col <= 8) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        break;
      }

      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        this.possibleMoves.push(targetPosition);
        break;
      }

      this.possibleMoves.push(targetPosition);

      targetPosition = { row: targetPosition.row, col: targetPosition.col + 1 };
    }
  }

  getImagePath(): string {
    return `/pieces/${this.color}-rook.png`;
  }
}
