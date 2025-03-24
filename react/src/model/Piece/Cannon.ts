import Piece from "./Piece";
import { PieceType } from "./Piece";
import Position from "../Position";

export default class Cannon extends Piece {
  getPieceType(): PieceType {
    return PieceType.Cannon;
  }

  updatePossibleMoves(boardPieces: Piece[][]): void {
    //top
    let targetPosition = new Position(this.position.row - 1, this.position.col);
    let hasJumped = false;
    while (targetPosition.row >= 0) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        if (hasJumped) break;
        else {
          hasJumped = true;
          targetPosition = new Position(
            targetPosition.row - 1,
            targetPosition.col
          );
          continue;
        }
      }
      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        if (hasJumped) {
          this.possibleMoves.push(targetPosition);
          break;
        } else {
          hasJumped = true;
          targetPosition = new Position(
            targetPosition.row - 1,
            targetPosition.col
          );
          continue;
        }
      }
      if (!hasJumped) {
        this.possibleMoves.push(targetPosition);
      }
      targetPosition = new Position(targetPosition.row - 1, targetPosition.col);
    }
    //bottom
    targetPosition = new Position(this.position.row + 1, this.position.col);
    hasJumped = false;
    while (targetPosition.row <= 9) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        if (hasJumped) break;
        else {
          hasJumped = true;
          targetPosition = new Position(
            targetPosition.row + 1,
            targetPosition.col
          );
          continue;
        }
      }
      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        if (hasJumped) {
          this.possibleMoves.push(targetPosition);
          break;
        } else {
          hasJumped = true;
          targetPosition = new Position(
            targetPosition.row + 1,
            targetPosition.col
          );
          continue;
        }
      }
      if (!hasJumped) {
        this.possibleMoves.push(targetPosition);
      }
      targetPosition = new Position(targetPosition.row + 1, targetPosition.col);
    }
    //left
    targetPosition = new Position(this.position.row, this.position.col - 1);
    hasJumped = false;
    while (targetPosition.col >= 0) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        if (hasJumped) break;
        else {
          hasJumped = true;
          targetPosition = new Position(
            targetPosition.row,
            targetPosition.col - 1
          );
          continue;
        }
      }
      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        if (hasJumped) {
          this.possibleMoves.push(targetPosition);
          break;
        } else {
          hasJumped = true;
          targetPosition = new Position(
            targetPosition.row,
            targetPosition.col - 1
          );
          continue;
        }
      }
      if (!hasJumped) {
        this.possibleMoves.push(targetPosition);
      }
      targetPosition = new Position(targetPosition.row, targetPosition.col - 1);
    }
    //right
    targetPosition = new Position(this.position.row, this.position.col - 1);
    hasJumped = false;
    while (targetPosition.col <= 8) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        if (hasJumped) break;
        else {
          hasJumped = true;
          targetPosition = new Position(
            targetPosition.row,
            targetPosition.col + 1
          );
          continue;
        }
      }
      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        if (hasJumped) {
          this.possibleMoves.push(targetPosition);
          break;
        } else {
          hasJumped = true;
          targetPosition = new Position(
            targetPosition.row,
            targetPosition.col + 1
          );
          continue;
        }
      }
      if (!hasJumped) {
        this.possibleMoves.push(targetPosition);
      }
      targetPosition = new Position(targetPosition.row, targetPosition.col + 1);
    }
  }
}
