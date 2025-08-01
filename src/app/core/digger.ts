import { BOX_POSITIONS, COLUMN_POSITIONS, ROW_POSITIONS } from '@solosudoku/configuration';
import { BitmaskHelper, GridHelper, Randomizer } from '@solosudoku/helpers';
import { Bitmask, Grid, Position } from '@solosudoku/models';
import { LinearSolver } from './linear.solver';

export class Digger {
  public static dig(solution: Grid, holes: number, bound: number): Grid {
    const positions: Position[] = Randomizer.generatePositions(holes);
    const workingGrid: Grid = GridHelper.copyGrid(solution);

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index: number = 0; index < positions.length; index++) {
      const [rowIndex, columnIndex] = positions[index];
      if (this.canRemove(workingGrid, rowIndex, columnIndex, bound)) workingGrid[rowIndex][columnIndex] = 0;
    }

    return workingGrid;
  }

  public static canRemove(grid: Grid, rowIndex: number, columnIndex: number, bound: number): boolean {
    if (!this.hasValidBounds(grid, rowIndex, columnIndex, bound)) return false;

    let possibilities: number = this.getPossibilities(grid, rowIndex, columnIndex);
    const numberOfPossibilities: number = BitmaskHelper.count(possibilities);
    if (numberOfPossibilities === 0) return true;

    let testGrid: Grid;

    for (let index: number = 0; index < numberOfPossibilities; index++) {
      const value: number = BitmaskHelper.first(possibilities);
      possibilities = BitmaskHelper.unset(possibilities, value);

      testGrid = GridHelper.copyGrid(grid);
      testGrid[rowIndex][columnIndex] = value;
      const solution: Grid | null = LinearSolver.solve(testGrid);
      if (solution) return false;
    }

    return true;
  }

  private static hasValidBounds(grid: Grid, rowIndex: number, columnIndex: number, bound: number): boolean {
    const boxIndex: number = GridHelper.getBoxIndex(rowIndex, columnIndex);
    return (
      this.hasValidBound(grid, ROW_POSITIONS[rowIndex], bound) &&
      this.hasValidBound(grid, COLUMN_POSITIONS[columnIndex], bound) &&
      this.hasValidBound(grid, BOX_POSITIONS[boxIndex], bound)
    );
  }

  private static hasValidBound(grid: Grid, positions: Position[], bound: number): boolean {
    let count: number = 0;
    for (const [rowIndex, columnIndex] of positions) {
      if (grid[rowIndex][columnIndex] !== 0) count++;
    }
    return count > bound;
  }

  private static getPossibilities(grid: Grid, rowIndex: number, columnIndex: number): number {
    let mask: number = Bitmask.Possibilities;
    const boxIndex: number = GridHelper.getBoxIndex(rowIndex, columnIndex);
    const boxPositions: Position[] = BOX_POSITIONS[boxIndex];

    for (let i: number = 0; i < 9; i++) {
      const rowValue: number = grid[rowIndex][i];
      if (rowValue !== 0) mask = BitmaskHelper.unset(mask, rowValue);

      const columnValue: number = grid[i][columnIndex];
      if (columnValue !== 0) mask = BitmaskHelper.unset(mask, columnValue);

      const [boxRowIndex, boxColumnIndex] = boxPositions[i];
      const boxValue: number = grid[boxRowIndex][boxColumnIndex];
      if (boxValue !== 0) mask = BitmaskHelper.unset(mask, boxValue);
    }

    mask = BitmaskHelper.unset(mask, grid[rowIndex][columnIndex]);

    return mask;
  }
}
