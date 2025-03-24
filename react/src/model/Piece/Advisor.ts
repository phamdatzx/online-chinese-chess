import Piece from "./Piece";
import { PieceType } from "./Piece";
import Position from "../Position";

export default class Advisor extends Piece {
  getPieceType(): PieceType {
    return PieceType.Advisor;
  }

  updatePossibleMoves(boardState: Piece[][]): void {
    const targetPositionsList = [
      new Position(this.position.row - 1, this.position.col - 1), // top left
      new Position(this.position.row - 1, this.position.col + 1), // top right
      new Position(this.position.row + 1, this.position.col - 1), // bottom left
      new Position(this.position.row + 1, this.position.col + 1), // bottom right
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

  isDiagonalPosition(startPosition: Position, endPosition: Position): boolean {
    return (
      Math.abs(startPosition.row - endPosition.row) === 1 &&
      Math.abs(startPosition.col - endPosition.col) === 1
    );
  }
}
