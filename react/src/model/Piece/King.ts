import Piece from "./Piece";
import { PieceType } from "./Piece";

export default class King extends Piece {
  getPieceType(): PieceType {
    return PieceType.King;
  }

  updatePossibleMoves(boardState: Piece[][]): void {
    const targetPositionsList = [
      { row: this.position.row - 1, col: this.position.col }, // top
      { row: this.position.row + 1, col: this.position.col }, // bottom
      { row: this.position.row, col: this.position.col - 1 }, // left
      { row: this.position.row, col: this.position.col + 1 }, // right
    ];

    this.possibleMoves = targetPositionsList.filter((targetPosition) => {
      if (!this.isPositionInPalace(targetPosition, this.color)) {
        return false;
      }

      if (this.isPositionHasAllyPiece(boardState, targetPosition)) {
        return false;
      }

      return true;
    });
  }

  getImagePath(): string {
    return `/pieces/${this.color}-king.png`;
  }
}
