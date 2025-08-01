import { ConfigurationService } from '@solosudoku/configuration';
import { wrapInPromise } from '@solosudoku/helpers';
import { DifficultyConfig, Grid, Puzzle, RatingType } from '@solosudoku/models';
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
    const solution: Grid = SolutionGenerator.generate();
    const difficulty: DifficultyConfig = ConfigurationService.getDifficulty(rating);
    const puzzle: Grid = Digger.dig(solution, difficulty.holes, difficulty.bound);

    return { rating, solution, puzzle };
  }
}
