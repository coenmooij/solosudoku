import { Difficulty, RatingType } from '@solosudoku/models';
import { DIFFICULTIES } from './index';

export class ConfigurationService {
  public static getDifficulty(rating: RatingType): Difficulty {
    return DIFFICULTIES.find((difficulty: Difficulty) => difficulty.rating === rating) as Difficulty;
  }

  public static getDifficulties(): Difficulty[] {
    return DIFFICULTIES;
  }
}
