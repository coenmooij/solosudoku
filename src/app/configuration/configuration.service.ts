import { DifficultyConfig, RatingType } from '@solosudoku/models';
import { DIFFICULTIES } from './index';

export class ConfigurationService {
  public static getDifficulty(rating: RatingType): DifficultyConfig {
    return DIFFICULTIES[rating];
  }
}
