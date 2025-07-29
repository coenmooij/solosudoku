import { Generator, GridHelper } from '@solosudoku/helpers';
import { Grid, Position } from '@solosudoku/models';
import { SelectiveSolver } from './selective.solver';

export class SolutionGenerator {
  public static generate(): Grid {
    const positions: Position[] = Generator.generatePositions();
    const emptyGrid: Grid = GridHelper.createEmptyGrid();
    return SelectiveSolver.solve(emptyGrid, positions);
  }
}
