import { ConfigurationService } from '@solosudoku/configuration';
import { Randomizer, wrapInPromise } from '@solosudoku/helpers';
import { DifficultyConfig, Grid, Position, Puzzle, RatingType } from '@solosudoku/models';
import { from, Observable } from 'rxjs';
import { Digger } from './digger';
import { SolutionGenerator } from './solution.generator';

export class PuzzleGenerator {
  public static generate$(rating: RatingType): Observable<Puzzle> {
    const promise: Promise<Puzzle> = wrapInPromise(() => this.generate(rating));

    return from(promise);
  }

  public static generateAsync(rating: RatingType): Promise<Puzzle> {
    return wrapInPromise(() => this.generate(rating));
  }

  public static generate(rating: RatingType): Puzzle {
    const solutionGrid: Grid = SolutionGenerator.generate();
    const difficulty: DifficultyConfig = ConfigurationService.getDifficulty(rating);
    const holePositions: Position[] = Randomizer.generatePositions(difficulty.holes);
    const puzzleGrid: Grid = Digger.dig(solutionGrid, holePositions);

    return { rating, solution: solutionGrid, puzzle: puzzleGrid };
  }
}
