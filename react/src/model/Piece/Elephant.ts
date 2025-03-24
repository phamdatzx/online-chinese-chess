import Piece from "./Piece";
import { PieceType } from "./Piece";
import Position from "../Position";

export default class Elephant extends Piece {
  getPieceType(): PieceType {
    return PieceType.Elephant;
  }

  updatePossibleMoves(boardPieces: Piece[][]): void {
    const checkPossibleMoves: Position[] = [
      new Position(this.position.row - 2, this.position.col - 2), // top left
      new Position(this.position.row - 2, this.position.col + 2), // top right
      new Position(this.position.row + 2, this.position.col - 2), // bottom left
      new Position(this.position.row + 2, this.position.col + 2), // bottom right
    ];

    this.possibleMoves = checkPossibleMoves.filter((endPosition) => {
      //check if end position is on board
      if (!this.isOnBoard(endPosition)) {
        return false;
      }

      //check if way is blocked
      if (this.isBlockedWay(boardPieces, endPosition)) {
        return false;
      }

      //check if end position is stolen by ally piece
      if (this.isPositionHasAllyPiece(boardPieces, endPosition)) {
        return false;
      }

      return true;
    });
  }

  isBlockedWay(boardPieces: Piece[][], endPosition: Position): boolean {
    if (this.isPositionHasAllyPiece(boardPieces, endPosition)) {
      return true;
    }
    const middlePosition = new Position(
      (this.position.row + endPosition.row) / 2,
      (this.position.col + endPosition.col) / 2
    );

    return this.isPositionHasPiece(boardPieces, middlePosition);
  }
}
