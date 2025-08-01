import { Difficulty, Rating } from '@solosudoku/models';

export const DIFFICULTIES: Difficulty[] = [
  { rating: Rating.SuperEasy, name: 'Tutorial', stars: 0.5, holes: 20, bound: 6 },
  { rating: Rating.VeryEasy, name: 'Very Easy', stars: 1, holes: 30, bound: 5 },
  { rating: Rating.Easy, name: 'Easy', stars: 2, holes: 40, bound: 4 },
  { rating: Rating.Normal, name: 'Normal', stars: 3, holes: 50, bound: 3 },
  { rating: Rating.Hard, name: 'Hard', stars: 4, holes: 60, bound: 2 },
  { rating: Rating.VeryHard, name: 'Legendary', stars: 5, holes: 70, bound: 0 },
  { rating: Rating.SuperHard, name: 'Impossible', stars: 5.5, holes: 81, bound: 0 },
];
