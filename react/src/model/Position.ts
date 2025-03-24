export default class Position {
  row: number;
  col: number;
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  samePosition(otherPosition: Position): boolean {
    return this.row === otherPosition.row && this.col === otherPosition.col;
  }

  clone(): Position {
    return new Position(this.row, this.col);
  }
}
