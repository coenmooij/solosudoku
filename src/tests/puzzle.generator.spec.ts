import { PuzzleGenerator } from '@solosudoku/core';
import { Rating } from '@solosudoku/models';

describe('PuzzleGenerator', () => {
  it(`measures average performance of generating medium puzzles over 1000 calls`, () => {
    const numberOfIterations: number = 1000;
    let totalTime: number = 0;
    for (let i: number = 0; i < numberOfIterations; i++) {
      const start: number = performance.now();
      PuzzleGenerator.generate(Rating.Normal);
      const end: number = performance.now();
      totalTime += end - start;
    }
    const averageInMs: number = totalTime / numberOfIterations;
    console.log(`Average time: ${averageInMs.toFixed(1)} ms`);

    expect(averageInMs).toBeLessThan(10);
  });
});
