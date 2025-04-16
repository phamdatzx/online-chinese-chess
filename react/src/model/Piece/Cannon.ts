import Piece from "./Piece";
import { PieceType } from "./Piece";

export default class Cannon extends Piece {
  getPieceType(): PieceType {
    return PieceType.Cannon;
  }

  updatePossibleMoves(boardPieces: Piece[][]): void {
    //clear possible moves
    this.possibleMoves = [];
    //top
    let targetPosition = { row: this.position.row - 1, col: this.position.col };
    let hasJumped = false;
    while (targetPosition.row >= 0) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        if (hasJumped) break;
        else {
          hasJumped = true;
          targetPosition = {
            row: targetPosition.row - 1,
            col: targetPosition.col,
          };
          continue;
        }
      }
      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        if (hasJumped) {
          this.possibleMoves.push(targetPosition);
          break;
        } else {
          hasJumped = true;
          targetPosition = {
            row: targetPosition.row - 1,
            col: targetPosition.col,
          };
          continue;
        }
      }
      if (!hasJumped) {
        this.possibleMoves.push(targetPosition);
      }
      targetPosition = { row: targetPosition.row - 1, col: targetPosition.col };
    }
    //bottom
    targetPosition = { row: this.position.row + 1, col: this.position.col };
    hasJumped = false;
    while (targetPosition.row <= 9) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        if (hasJumped) break;
        else {
          hasJumped = true;
          targetPosition = {
            row: targetPosition.row + 1,
            col: targetPosition.col,
          };
          continue;
        }
      }
      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        if (hasJumped) {
          this.possibleMoves.push(targetPosition);
          break;
        } else {
          hasJumped = true;
          targetPosition = {
            row: targetPosition.row + 1,
            col: targetPosition.col,
          };
          continue;
        }
      }
      if (!hasJumped) {
        this.possibleMoves.push(targetPosition);
      }
      targetPosition = { row: targetPosition.row + 1, col: targetPosition.col };
    }
    //left
    targetPosition = { row: this.position.row, col: this.position.col - 1 };
    hasJumped = false;
    while (targetPosition.col >= 0) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        if (hasJumped) break;
        else {
          hasJumped = true;
          targetPosition = {
            row: targetPosition.row,
            col: targetPosition.col - 1,
          };
          continue;
        }
      }
      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        if (hasJumped) {
          this.possibleMoves.push(targetPosition);
          break;
        } else {
          hasJumped = true;
          targetPosition = {
            row: targetPosition.row,
            col: targetPosition.col - 1,
          };
          continue;
        }
      }
      if (!hasJumped) {
        this.possibleMoves.push(targetPosition);
      }
      targetPosition = { row: targetPosition.row, col: targetPosition.col - 1 };
    }
    //right
    targetPosition = { row: this.position.row, col: this.position.col + 1 };
    hasJumped = false;
    while (targetPosition.col <= 8) {
      if (this.isPositionHasAllyPiece(boardPieces, targetPosition)) {
        if (hasJumped) break;
        else {
          hasJumped = true;
          targetPosition = {
            row: targetPosition.row,
            col: targetPosition.col + 1,
          };
          continue;
        }
      }
      if (this.isPositionHasEnemyPiece(boardPieces, targetPosition)) {
        if (hasJumped) {
          this.possibleMoves.push(targetPosition);
          break;
        } else {
          hasJumped = true;
          targetPosition = {
            row: targetPosition.row,
            col: targetPosition.col + 1,
          };
          continue;
        }
      }
      if (!hasJumped) {
        this.possibleMoves.push(targetPosition);
      }
      targetPosition = { row: targetPosition.row, col: targetPosition.col + 1 };
    }
  }

  getImagePath(): string {
    return `/pieces/${this.color}-cannon.png`;
  }
}
