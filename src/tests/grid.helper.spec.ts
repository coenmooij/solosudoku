import { GridHelper } from '@solosudoku/helpers';

const BOX_INDEX_CASES: [[number, number], number][] = [
  [[0, 0], 0],
  [[8, 8], 8],
  [[4, 4], 4],
  [[1, 1], 0],
  [[2, 2], 0],
  [[3, 0], 3],
  [[3, 4], 4],
];

describe('GridHelper', () => {
  BOX_INDEX_CASES.forEach(([[rowIndex, columnIndex], expectedIndex]: [[number, number], number]) => {
    it('should get the correct boxIndex', () => {
      const index: number = GridHelper.getBoxIndex(rowIndex, columnIndex);
      expect(index).toBe(expectedIndex);
    });
  });
});
