import { BitmaskHelper, GridHelper, Randomizer } from '@solosudoku/helpers';
import { Cell, Grid, UnsolvableException } from '@solosudoku/models';

/** Smart Solver using Minimum Remaining Value (MRV) heuristic for smart next candidate selection
 *
 * It basically selects the option with the least possibilities to find low-hanging fruit (single value) & fails fast
 *
 */
export class SmartSelectiveSolver {
  public static solve(grid: Grid): Grid {
    const solveGrid: Cell[] = GridHelper.createCellGrid(grid);
    const [visitedPositions, unvisitedPositions] = this.splitIndices(solveGrid);

    // Find the initial candidate
    let index: number = visitedPositions.length === 0 ? 0 : this.findNextCandidate(solveGrid, unvisitedPositions);
    visitedPositions.push(index);

    while (visitedPositions.length < 81) {
      const cell: Cell = solveGrid[index];

      if (cell.wasGiven) throw new UnsolvableException(); // Can't change value of given cells

      if (cell.value === 0) {
        const options: number[] = BitmaskHelper.toArray(cell.possibilities);
        cell.options = Randomizer.generateOptions(options);
      } else {
        GridHelper.undoPossibilities(solveGrid, cell.undo, cell.value);
        cell.undo = [];

        // Out of options; reset & go back
        if (cell.options.length === 0) {
          cell.value = 0;
          visitedPositions.pop();
          unvisitedPositions.push(index);
          continue;
        }
      }

      // Try the next option
      const newValue = cell.options.pop() as number;
      const rowIndex: number = Math.floor(index / 9);
      const columnIndex: number = index % 9;
      const gridIsValid: boolean = GridHelper.setValue(solveGrid, rowIndex, columnIndex, newValue);

      if (gridIsValid) {
        index = this.findNextCandidate(solveGrid, unvisitedPositions);
        visitedPositions.push(index);
        unvisitedPositions.splice(unvisitedPositions.indexOf(index), 1);
      } else {
        cell.value = 0;
        visitedPositions.pop();
        unvisitedPositions.push(index);
      }
    }

    return GridHelper.toGrid(solveGrid);
  }

  // Find the next candidate with the lowest amount of possibilities
  private static findNextCandidate(grid: Cell[], candidateIndices: number[]): number {
    let minCount: number = 9;
    let minIndex: number = 0;
    for (let index: number = 0; index < candidateIndices.length; index++) {
      const count: number = BitmaskHelper.count(grid[index].possibilities);

      if (count === 1) return index;

      if (count < minCount) {
        minCount = count;
        minIndex = index;
      }
    }
    return minIndex;
  }

  private static splitIndices(grid: Cell[]): [number[], number[]] {
    const givenIndices: number[] = [];
    const emptyIndices: number[] = [];
    for (let index: number = 0; index < 81; index++) {
      grid[index].value === 0 ? emptyIndices.push(index) : givenIndices.push(index);
    }
    return [givenIndices, emptyIndices];
  }
}
