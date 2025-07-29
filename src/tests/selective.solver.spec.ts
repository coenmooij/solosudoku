import { Generator, GridHelper, numberSort } from '@solosudoku/helpers';
import { Grid, Position } from '@solosudoku/models';
import { COLUMN_POSITIONS } from '../app/configuration/column.position.config';
import { ROW_POSITIONS } from '../app/configuration/row.position.config';
import { SelectiveSolver } from '../app/core';

describe('SelectiveSolver', () => {
  it('should solve 1 value', () => {
    const grid: Grid = GridHelper.createEmptyGrid();
    const positions: Position[] = [[0, 0]];

    const result: Grid = SelectiveSolver.solve(grid, positions);
    const firstValue: number = result[0][0];

    expect(firstValue).toBeGreaterThan(0);
    expect(firstValue).toBeLessThanOrEqual(9);
  });

  // This can fail randomly but this case is tested below
  it('should solve 2 values', () => {
    const grid: Grid = GridHelper.createEmptyGrid();
    const positions: Position[] = [
      [0, 0],
      [0, 1],
    ];

    const result: Grid = SelectiveSolver.solve(grid, positions);

    expect(result[0][0]).not.toBe(result[0][1]);
  });

  it('should solve the first row', () => {
    const grid: Grid = GridHelper.createEmptyGrid();
    const rowIndex: number = 0;

    const positions: Position[] = ROW_POSITIONS[rowIndex];

    const result: Grid = SelectiveSolver.solve(grid, positions);
    const row: number[] = result[rowIndex];

    const sortedRow: number[] = row.sort(numberSort);

    expect(sortedRow).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should solve the first column', () => {
    const grid: Grid = GridHelper.createEmptyGrid();
    const columnIndex: number = 0;

    const positions: Position[] = COLUMN_POSITIONS[columnIndex];

    const result: Grid = SelectiveSolver.solve(grid, positions);
    const column: number[] = GridHelper.getColumnValues(result, columnIndex);
    const sortedColumn: number[] = column.sort(numberSort);

    expect(sortedColumn).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should solve the first box', () => {
    const grid: Grid = GridHelper.createEmptyGrid();
    const positions: Position[] = GridHelper.getBoxPositions(0, 0);

    const result: Grid = SelectiveSolver.solve(grid, positions);
    const column: number[] = GridHelper.getBoxValues(result, 0, 0);
    const sortedColumn: number[] = column.sort(numberSort);

    expect(sortedColumn).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  function assertRow(grid: Grid, rowIndex: number): void {
    const row: number[] = grid[rowIndex];
    const sortedRow: number[] = row.sort(numberSort);

    expect(sortedRow).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

  it('should solve full grid', () => {
    const grid: Grid = GridHelper.createEmptyGrid();
    const positions: Position[] = Generator.generatePositions();
    const result: Grid = SelectiveSolver.solve(grid, positions);

    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      assertRow(result, rowIndex);
    }
  });
});
