import Position from "../Position";

export enum PieceType {
  King,
  Advisor,
  Elephant,
  Horse,
  Chariot,
  Cannon,
  Soldier,
}

export default abstract class Piece {
  color: string;
  position: Position;
  isAlive: boolean = true;
  possibleMoves: Position[] = [];

  constructor(color: string, position: Position) {
    this.position = position;
    this.color = color;
  }

  abstract getPieceType(): PieceType;

  abstract updatePossibleMoves(boardPieces: Piece[][]): void;

  isPositionHasPiece(boardState: Piece[][], position: Position): boolean {
    return !!boardState[position.row][position.col];
  }

  isPositionHasAllyPiece(boardState: Piece[][], position: Position): boolean {
    return (
      boardState[position.row][position.col] &&
      boardState[position.row][position.col].color === this.color
    );
  }

  isPositionHasEnemyPiece(boardState: Piece[][], position: Position): boolean {
    return (
      boardState[position.row][position.col] &&
      boardState[position.row][position.col].color !== this.color
    );
  }

  isOnBoard(position: Position): boolean {
    return (
      position.col >= 0 &&
      position.col <= 8 &&
      position.row >= 0 &&
      position.row <= 9
    );
  }

  isPositionInPalace(position: Position, siteColor: string): boolean {
    if (siteColor === "black") {
      if (position.col < 3 || position.col > 5) {
        return false;
      }
      if (position.row < 0 || position.row > 2) {
        return false;
      }
    } else {
      if (position.col < 3 || position.col > 5) {
        return false;
      }
      if (position.row < 7 || position.row > 9) {
        return false;
      }
    }
    return true;
  }

  isOverRiverPosition(position: Position, color: string): boolean {
    if (color === "black") {
      return position.row >= 5;
    } else {
      return position.row <= 4;
    }
  }
}
