import { BitmaskHelper, GridHelper, Randomizer } from '@solosudoku/helpers';
import { Cell, Grid } from '@solosudoku/models';

export class MultiSolver {
  public static solve(grid: Grid): Grid[] {
    const solutions: Grid[] = [];
    const solveGrid: Cell[] = GridHelper.createCellGrid(grid);
    let isBacktracking: boolean = false;

    for (let index: number = 0; index < 81; index++) {
      if (index < 0) break; // possibilities exhausted

      const cell: Cell = solveGrid[index];

      // If going back, skip backwards to previous cell
      if (cell.wasGiven && isBacktracking) {
        index -= 2; // Double to negate the default increase
        continue;
      }

      if (cell.wasGiven && index < 80) continue; // Skip over given cells

      // End of puzzle reached on a given cell, means solution found
      if (cell.wasGiven && index === 80) {
        // Rollback to most recent cell with alternative branch
        index = this.addSolutionAndRollback(solutions, solveGrid);
        index--; // To negate the default increasing index
        continue;
      }

      // Fill the options for virgin cell based on possibilities
      if (cell.value === 0) {
        const options: number[] = BitmaskHelper.toArray(cell.possibilities);
        cell.options = Randomizer.generateOptions(options);
      }

      // If cell has been tried before, undo its consequences
      if (cell.value > 0) {
        GridHelper.undoPossibilities(solveGrid, cell.undo, cell.value);
        cell.undo = [];
      }

      // If no more options (either virgin or repeat-offender), go back
      if (cell.options.length === 0) {
        cell.value = 0;
        isBacktracking = true;
        index -= 2; // Double for negating the default increasing index
        continue;
      }

      isBacktracking = false;
      // Try a new possible value from the options
      const newValue = cell.options.pop() as number;

      // Set the value in the grid
      const rowIndex: number = Math.floor(index / 9);
      const columnIndex: number = index % 9;
      const result: boolean = GridHelper.setValue(solveGrid, rowIndex, columnIndex, newValue);
      // If setting the value results in invalid state, try the next option
      if (!result) {
        index--; // Only once to negate the default index increasing and stay on the current cell
        continue;
      }

      if (index === 80) {
        index = this.addSolutionAndRollback(solutions, solveGrid);
        index--; // To negate the default increasing index
      }
    }
    return solutions;
  }

  private static addSolutionAndRollback(solutions: Grid[], solveGrid: Cell[]): number {
    const solution: Grid = GridHelper.toGrid(solveGrid);
    solutions.push(solution);

    const index: number = this.indexOfCellWithOptions(solveGrid);
    if (index >= 0) this.rollback(solveGrid, index);

    return index;
  }

  private static indexOfCellWithOptions(grid: Cell[]): number {
    for (let index: number = 80; index > -1; index--) {
      if (grid[index].options.length > 0) return index;
    }
    return -1;
  }

  private static rollback(grid: Cell[], rollbackIndex: number): void {
    for (let index: number = 80; index > rollbackIndex; index--) {
      const cell: Cell = grid[index];

      if (cell.wasGiven) continue;

      if (cell.value > 0) GridHelper.undoPossibilities(grid, cell.undo, cell.value);
      cell.value = 0;
      cell.undo = [];
      cell.options = [];
    }
  }
}
