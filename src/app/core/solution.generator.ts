import { GridHelper } from '@solosudoku/helpers';
import { Grid } from '@solosudoku/models';
import { LinearSolver } from './linear.solver';

export class SolutionGenerator {
  public static generate(): Grid {
    const emptyGrid: Grid = GridHelper.createEmptyGrid();
    return LinearSolver.solve(emptyGrid) as Grid; // Empty grids are always solvable
  }
}
