import { Grid } from '../types/grid.type';
import { RatingType } from '../types/rating.type';

export interface Puzzle {
  rating: RatingType;
  puzzle: Grid;
  solution: Grid;
}
