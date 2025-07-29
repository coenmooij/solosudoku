import { BitmaskHelper, GridHelper, Randomizer } from '@solosudoku/helpers';
import { Cell, Grid, UnsolvableException } from '@solosudoku/models';

// TODO : Finish implementation

/** Smart Solver using Minimum Remaining Value (MRV) heuristic for smart next candidate selection */
export class SmartSelectiveSolver {
  public static solve(grid: Grid): Grid {
    const solveGrid: Cell[] = GridHelper.createCellGrid(grid);
    const stack: number[] = this.prepopulateStack(solveGrid); // skips given cells

    // TODO :  decide the first index
    stack.push(0); // TODO : do smart selection here

    let index: number = 0; // avoid repetitive dynamic variable creation in while scope

    while (stack.length < 81) {
      index = stack[stack.length - 1];
      const cell: Cell = solveGrid[index];

      if (cell.wasGiven) throw new UnsolvableException(); // Can't change value of given cells

      if (cell.value === 0) {
        const options: number[] = BitmaskHelper.toArray(cell.possibilities);
        cell.options = Randomizer.generateOptions(options);
      } else {
        GridHelper.addPossibilities(solveGrid, cell.undo, cell.value);
        cell.undo = [];

        if (cell.options.length === 0) {
          cell.value = 0;
          stack.pop();
          continue;
        }
      }

      // Try another option
      const newValue = cell.options.pop() as number;

      const rowIndex: number = Math.floor(index / 9);
      const columnIndex: number = index % 9;
      const result: boolean = GridHelper.setValue(solveGrid, rowIndex, columnIndex, newValue);
      if (!result) {
        cell.undo = [];
      }

      // if success, Determine next candidate position / index
      // if fail, pop from stack.
    }

    return GridHelper.toGrid(solveGrid);
  }

  private static prepopulateStack(grid: Cell[]): number[] {
    const stack: number[] = [];
    for (let index: number = 0; index < 81; index++) {
      if (grid[index].value > 0) {
        stack.push(index);
      }
    }
    return stack;
  }
}
