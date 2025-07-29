import { Position } from '@solosudoku/models';

export class Generator {
  /** Generates a set of non-conflicting positions */
  public static generatePositions(): Position[] {
    const positions: Position[] = [];

    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      for (let columnIndex: number = 0; columnIndex < 9; columnIndex++) {
        positions.push([rowIndex, columnIndex]);
      }
    }
    return positions;
  }

  public static generateIndices(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }
}
