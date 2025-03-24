import Piece from "./Piece";
import { PieceType } from "./Piece";
import Position from "../Position";

export default class King extends Piece {
  getPieceType(): PieceType {
    return PieceType.King;
  }

  updatePossibleMoves(boardState: Piece[][]): void {
    const targetPositionsList = [
      new Position(this.position.row - 1, this.position.col), // top
      new Position(this.position.row + 1, this.position.col), // bottom
      new Position(this.position.row, this.position.col - 1), // left
      new Position(this.position.row, this.position.col + 1), // right
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
}
