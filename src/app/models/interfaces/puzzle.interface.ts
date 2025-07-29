import { Grid, RatingType } from '../types';

export interface Puzzle {
  rating: RatingType;
  puzzle: Grid;
  solution: Grid;
}
