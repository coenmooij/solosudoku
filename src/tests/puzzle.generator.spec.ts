import { PuzzleGenerator } from '@solosudoku/core';
import { Rating } from '@solosudoku/models';

describe('PuzzleGenerator', () => {
  it(`measures average performance of generate over 1000 calls`, () => {
    const numberOfIterations = 1000;
    let totalTime: number = 0;
    for (let i: number = 0; i < numberOfIterations; i++) {
      const start: number = performance.now();
      PuzzleGenerator.generate(Rating.SuperHard);
      const end: number = performance.now();
      totalTime += end - start;
    }
    const averageInMs: number = totalTime / numberOfIterations;
    console.log(`Average time: ${averageInMs.toFixed(1)} ms`);

    expect(averageInMs).toBeLessThan(5);
  });
});

// Benchmark: 3.4ms average. good enough for users.
