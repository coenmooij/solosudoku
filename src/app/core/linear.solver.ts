import { BitmaskHelper, GridHelper, Randomizer } from '@solosudoku/helpers';
import { Cell, Grid } from '@solosudoku/models';

export class LinearSolver {
  public static solve(grid: Grid): Grid | null {
    const solveGrid: Cell[] = GridHelper.createCellGrid(grid);
    let isBacktracking: boolean = false;

    for (let index: number = 0; index < 81; index++) {
      if (index < 0) return null;

      const cell: Cell = solveGrid[index];

      if (cell.wasGiven) {
        if (isBacktracking) index -= 2;
        continue;
      }

      // First hit on cell
      if (cell.value === 0) {
        const options: number[] = BitmaskHelper.toArray(cell.possibilities);
        cell.options = Randomizer.generateOptions(options);
      }

      // Cell has been hit before
      if (cell.value > 0) {
        // Undo previous attempts if present
        GridHelper.undoPossibilities(solveGrid, cell.undo, cell.value);
        cell.undo = [];
      }

      // Out of options, go back to previous cell
      if (cell.options.length === 0) {
        cell.value = 0;
        isBacktracking = true;
        index -= 2;
        continue;
      }

      isBacktracking = false;

      // Try another option
      const newValue = cell.options.pop() as number;

      const rowIndex: number = Math.floor(index / 9);
      const columnIndex: number = index % 9;
      const result: boolean = GridHelper.setValue(solveGrid, rowIndex, columnIndex, newValue);
      if (!result) index--;
    }

    return GridHelper.toGrid(solveGrid);
  }
}
