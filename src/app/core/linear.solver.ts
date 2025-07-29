import { BitmaskHelper, GridHelper, Randomizer } from '@solosudoku/helpers';
import { Cell, Grid, UnsolvableException } from '@solosudoku/models';

export class LinearSolver {
  public static solve(grid: Grid): Grid {
    const solveGrid: Cell[] = GridHelper.createCellGrid(grid);

    for (let index: number = 0; index < 81; index++) {
      if (index < 0) throw new UnsolvableException(); // Only applicable to partially-filled grids

      const rowIndex: number = Math.floor(index / 9);
      const columnIndex: number = index % 9;

      const cell: Cell = solveGrid[index];

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

        // Out of options, go back to previous cell
        if (cell.options.length === 0) {
          cell.value = 0;
          index -= 2;
          continue;
        }
      }

      // Try another option
      const newValue = cell.options.pop() as number;

      const result: boolean = GridHelper.setValue(solveGrid, rowIndex, columnIndex, newValue);
      if (!result) {
        cell.undo = [];
        index--;
      }
    }

    return GridHelper.toGrid(solveGrid);
  }
}
