import { RatingType } from '../types';

export interface Difficulty {
  rating: RatingType;
  name: string;
  stars: number;
  holes: number;
  bound: number;
}
