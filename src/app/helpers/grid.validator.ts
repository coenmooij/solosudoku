import { Cell } from '@solosudoku/models';
import { GridHelper } from './index';

export class GridValidator {
  public static isValid(grid: Cell[][]): boolean {
    return this.hasValidRows(grid) && this.hasValidColumns(grid) && this.hasValidBoxes(grid);
  }

  private static hasValidRows(grid: Cell[][]): boolean {
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      const setIsValid: boolean = this.validateSet(grid[rowIndex]);

      if (!setIsValid) return false;
    }
    return true;
  }

  private static hasValidColumns(grid: Cell[][]): boolean {
    const columns: Cell[][] = GridHelper.getColumns(grid);

    for (const column of columns) {
      const columnIsValid: boolean = this.validateSet(column);
      if (!columnIsValid) return false;
    }
    return true;
  }

  private static hasValidBoxes(cellGrid: Cell[][]): boolean {
    const boxes: Cell[][] = GridHelper.getBoxes(cellGrid);

    for (const box of boxes) {
      const boxIsValid: boolean = this.validateSet(box);
      if (!boxIsValid) return false;
    }
    return true;
  }

  private static validateSet(set: Cell[]): boolean {
    const filteredSet: number[] = set.map((cell: Cell): number => cell.value).filter((value: number) => value !== 0);

    return new Set(filteredSet).size === filteredSet.length;
  }
}
