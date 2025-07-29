import { BitmaskHelper, GridHelper, Randomizer } from '@solosudoku/helpers';
import { Cell, Grid, Position, UnsolvableException } from '@solosudoku/models';

export class SelectiveSolver {
  /** Selectively finds a solution by only filling the positions provided */
  public static solve(grid: Grid, positions: Position[]): Grid {
    const solveGrid: Cell[] = GridHelper.createCellGrid(grid);

    for (let positionIndex: number = 0; positionIndex < positions.length; positionIndex++) {
      if (positionIndex < 0) throw new UnsolvableException();

      const [rowIndex, columnIndex]: Position = positions[positionIndex];
      const cell: Cell = GridHelper.getCell(solveGrid, rowIndex, columnIndex);

      // First hit on cell
      if (cell.value === 0) {
        const options: number[] = BitmaskHelper.toArray(cell.possibilities);
        cell.options = Randomizer.generateOptions(options);
      }

      // Cell has been hit before
      if (cell.value > 0) {
        // Undo previous attempts if present
        GridHelper.addPossibilities(solveGrid, cell.undo, cell.value);
        cell.undo = [];

        // Out of options, go back to previous cell
        if (cell.options.length === 0) {
          cell.value = 0;
          positionIndex -= 2;
          continue;
        }
      }

      // Try another option
      const newValue = cell.options.pop() as number;

      const result: boolean = GridHelper.setValue(solveGrid, rowIndex, columnIndex, newValue);
      if (!result) {
        cell.undo = [];
        positionIndex--;
      }
    }

    return GridHelper.toGrid(solveGrid);
  }
}
