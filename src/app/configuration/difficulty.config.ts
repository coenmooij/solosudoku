import { DifficultyConfig, Rating, RatingType } from '@solosudoku/models';

export const DIFFICULTIES: { [key in RatingType]: DifficultyConfig } = {
  [Rating.Tutorial]: { name: 'Tutorial', stars: 0.5, holes: 20, bound: 6 },
  [Rating.VeryEasy]: { name: 'Very Easy', stars: 1, holes: 30, bound: 5 },
  [Rating.Easy]: { name: 'Easy', stars: 2, holes: 40, bound: 4 },
  [Rating.Medium]: { name: 'Normal', stars: 3, holes: 50, bound: 3 },
  [Rating.Hard]: { name: 'Hard', stars: 4, holes: 60, bound: 2 },
  [Rating.Legendary]: { name: 'Legendary', stars: 5, holes: 70, bound: 1 },
  [Rating.Impossible]: { name: 'Impossible', stars: 6, holes: 81, bound: 0 },
};
