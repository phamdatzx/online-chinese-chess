export enum Player {
  RED = "red",
  BLACK = "black",
}

export enum PieceType {
  GENERAL = "General",
  ADVISOR = "Advisor",
  ELEPHANT = "Elephant",
  HORSE = "Horse",
  CHARIOT = "Chariot",
  CANNON = "Cannon",
  SOLDIER = "Soldier",
}

export interface Piece {
  type: PieceType;
  player: Player;
}

export type BoardType = (Piece | null)[][];

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  resultedInCheck?: boolean;
}

export type GameStatus = "playing" | "redWin" | "blackWin" | "draw";

export interface GameState {
  board: BoardType;
  currentPlayer: Player;
  selectedPiece: Position | null;
  moveHistory: Move[];
  gameStatus: GameStatus;
  redCaptures: (Piece | null)[];
  blackCaptures: (Piece | null)[];
}

export type AvailableMoves = Position[];
