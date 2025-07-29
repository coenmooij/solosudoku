import { Position } from '@solosudoku/models';

export class Randomizer {
  /** Generates a set of non-conflicting positions */
  public static generatePositions(amount: number): Position[] {
    const positions: Position[] = [];

    for (let i: number = 0; i < amount; i++) {
      const newPosition: Position = this.generatePosition();

      if (this.includesPosition(positions, newPosition)) {
        i--;
        continue;
      }
      positions.push(newPosition);
    }
    return positions;
  }

  public static generatePosition(): Position {
    const rowIndex: number = this.generateIndex();
    const columnIndex: number = this.generateIndex();

    return [rowIndex, columnIndex];
  }

  /** Generates an index value for either row or columns; an integer between 0-8 */
  public static generateIndex(): number {
    return Math.floor(Math.random() * 9);
  }

  /** Generates a random cell value; an integer between 1-9 */
  public static generateValue(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  public static generateOptions(possibilities: number[]): number[] {
    return this.shuffle([...possibilities]);
  }

  private static includesPosition(positions: Position[], newPosition: Position): boolean {
    return positions.some((position: Position) => position[0] === newPosition[0] && position[1] === newPosition[1]);
  }

  public static shuffle<T>(array: T[]): T[] {
    const result: T[] = [...array];
    for (let index: number = result.length - 1; index > 0; index--) {
      const newIndex: number = Math.floor(Math.random() * (index + 1));
      [result[index], result[newIndex]] = [result[newIndex], result[index]];
    }
    return result;
  }
}
