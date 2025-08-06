import { LinearSolver } from '@solosudoku/core';
import { GridHelper, numberSort } from '@solosudoku/helpers';
import { Grid } from '@solosudoku/models';

const gridWithTwoSolutions: Grid = [
  [0, 8, 0, 0, 1, 6, 0, 0, 2],
  [6, 3, 4, 2, 0, 9, 0, 1, 0],
  [0, 0, 0, 8, 0, 0, 9, 5, 0],
  [8, 0, 0, 3, 2, 4, 1, 7, 0],
  [4, 0, 2, 0, 9, 0, 5, 8, 3],
  [3, 9, 7, 5, 8, 1, 2, 0, 4],
  [0, 0, 0, 0, 6, 8, 4, 9, 5],
  [9, 6, 0, 0, 3, 0, 0, 0, 0],
  [1, 0, 0, 9, 7, 2, 0, 3, 8],
];

const SOLUTION_1: string = '589716342634259817271843956856324179412697583397581264723168495968435721145972638';
const SOLUTION_2: string = '589716342634259817721843956856324179412697583397581264273168495968435721145972638';

describe('LinearSolver', () => {
  it('should solve 1 value', () => {
    const grid: Grid = GridHelper.createEmptyGrid();

    const result: Grid | null = LinearSolver.solve(grid);
    expect(result).not.toBeNull();

    const firstValue: number = (result as Grid)[0][0];
    expect(firstValue).toBeGreaterThan(0);
    expect(firstValue).toBeLessThanOrEqual(9);
  });

  it('should solve 2 values', () => {
    const grid: Grid = GridHelper.createEmptyGrid();

    const result: Grid | null = LinearSolver.solve(grid);
    expect(result).not.toBeNull();

    expect((result as Grid)[0][0]).not.toBe((result as Grid)[0][1]);
  });

  function assertRow(grid: Grid, rowIndex: number): void {
    const row: number[] = grid[rowIndex];
    const sortedRow: number[] = row.sort(numberSort);

    expect(sortedRow).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

  function assertColumn(grid: Grid, columnIndex: number): void {
    const column: number[] = grid[columnIndex];
    const sortedColumn: number[] = column.sort(numberSort);

    expect(sortedColumn).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

  it('should solve full grid', () => {
    const grid: Grid = GridHelper.createEmptyGrid();
    const result: Grid | null = LinearSolver.solve(grid);
    expect(result).not.toBeNull();

    for (let index: number = 0; index < 9; index++) {
      assertRow(result as Grid, index);
      assertColumn(result as Grid, index);
      // TODO : Assert box
    }
  });

  it('should solve grid with given cells', () => {
    const result: Grid | null = LinearSolver.solve(gridWithTwoSolutions);
    expect(result).not.toBeNull();

    if (result === null) return;

    const stringResult: string = GridHelper.toString(result);

    expect([SOLUTION_1, SOLUTION_2].includes(stringResult)).toBeTrue();
  });
});
