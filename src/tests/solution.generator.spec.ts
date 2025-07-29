import { SolutionGenerator } from '../app/core';

describe('SolutionGenerator', () => {
  it(`measures average performance of generate over 1000 calls`, () => {
    const numberOfIterations = 1000;
    let totalTime: number = 0;
    for (let i: number = 0; i < numberOfIterations; i++) {
      const start: number = performance.now();
      SolutionGenerator.generate();
      const end: number = performance.now();
      totalTime += end - start;
    }
    const average: number = totalTime / numberOfIterations;
    console.log(`Average time: ${Math.round(average * 1000)} µs`);

    expect(average).toBeLessThan(1); // 1ms
  });
});
// Benchmarks in microseconds (µs)
// first try - 260 - 290
// JSON stringify slow compare - 250 - 280    // 10µs improvement
// replace error with boolean return - 210-230 // 40µs improvement
// replace with bitmask operators // 140-150 // 70µs improvement
// Replace row and column positions // 95-105 // 45µs improvement
// Replace box positions / 90 - 105 // 5µs improvement
// Replaced Cell[][] with Cell[] array // 85-90 // 10µs improvement
