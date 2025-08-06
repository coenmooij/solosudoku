import { BOX_POSITIONS, COLUMN_POSITIONS, ROW_POSITIONS } from '@solosudoku/configuration';
import { Bitmask, Cell, Grid, Position } from '@solosudoku/models';
import { BitmaskHelper } from './bitmask.helper';

export class GridHelper {
  public static createEmptyGrid(): Grid {
    const grid: Grid = [];
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      grid.push([]);
      for (let columnIndex: number = 0; columnIndex < 9; columnIndex++) {
        grid[rowIndex].push(0);
      }
    }
    return grid;
  }

  public static getCell(grid: Cell[], rowIndex: number, columnIndex: number): Cell {
    return grid[rowIndex * 9 + columnIndex];
  }

  public static createCellGrid(grid: Grid): Cell[] {
    const solveGrid: Cell[] = [];
    for (let index: number = 0; index < 81; index++) {
      solveGrid.push({ value: 0, wasGiven: false, undo: [], options: [], possibilities: Bitmask.Possibilities });
    }

    for (let row: number = 0; row < 9; row++) {
      for (let column: number = 0; column < 9; column++) {
        const value: number = grid[row][column];
        if (value === 0) continue;

        this.setValue(solveGrid, row, column, value);
        const cell: Cell = this.getCell(solveGrid, row, column);
        cell.wasGiven = true;
      }
    }

    return solveGrid;
  }

  public static resetGrid(solveGrid: Cell[][]): void {
    solveGrid.forEach((row: Cell[]): void =>
      row.forEach((cell: Cell): void => {
        if (!cell.wasGiven) {
          cell.value = 0;
          cell.options = [];
          cell.possibilities = Bitmask.Possibilities;
          cell.undo = [];
        }
      }),
    );
  }

  public static convertFlatGrid(flatGrid: Cell[]): Cell[][] {
    const grid: Cell[][] = [];
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      grid.push([]);
      for (let columnIndex: number = 0; columnIndex < 9; columnIndex++) {
        grid[rowIndex].push(flatGrid[rowIndex * 9 + columnIndex]);
      }
    }
    return grid;
  }

  public static undoPossibilities(grid: Cell[], positions: Position[], value: number): void {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index: number = 0; index < positions.length; index++) {
      const [rowIndex, columnIndex] = positions[index];
      const cell: Cell = this.getCell(grid, rowIndex, columnIndex);

      if (BitmaskHelper.isSet(cell.possibilities, value)) continue;

      cell.possibilities = BitmaskHelper.set(cell.possibilities, value);
    }
  }

  public static toGrid(cellGrid: Cell[]): Grid {
    const grid: Grid = [];
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      grid.push([]);
      for (let columnIndex: number = 0; columnIndex < 9; columnIndex++) {
        grid[rowIndex].push(cellGrid[rowIndex * 9 + columnIndex].value);
      }
    }
    return grid;
  }

  public static setValue(grid: Cell[], rowIndex: number, columnIndex: number, newValue: number): boolean {
    const cell: Cell = this.getCell(grid, rowIndex, columnIndex);
    cell.value = newValue;

    const positions: Position[] = [
      ...ROW_POSITIONS[rowIndex],
      ...COLUMN_POSITIONS[columnIndex],
      ...this.getBoxPositions(rowIndex, columnIndex),
    ];

    const undoPositions: Position[] | null = this.removePossibilities(grid, positions, newValue);

    cell.undo = undoPositions ?? [];
    return undoPositions !== null;
  }

  private static removePossibilities(grid: Cell[], positions: Position[], value: number): Position[] | null {
    const affectedPositions: Position[] = [];
    for (const [rowIndex, columnIndex] of positions) {
      const cell: Cell = this.getCell(grid, rowIndex, columnIndex);

      if (!BitmaskHelper.isSet(cell.possibilities, value)) continue;

      cell.possibilities = BitmaskHelper.unset(cell.possibilities, value);
      affectedPositions.push([rowIndex, columnIndex]);

      if (BitmaskHelper.isEmpty(cell.possibilities) && cell.value === 0) {
        this.restorePossibilities(grid, affectedPositions, value);

        return null;
      }
    }

    return affectedPositions;
  }

  public static restorePossibilities(grid: Cell[], positions: Position[], value: number): void {
    for (const [rowIndex, columnIndex] of positions) {
      const cell: Cell = this.getCell(grid, rowIndex, columnIndex);
      cell.possibilities = BitmaskHelper.set(cell.possibilities, value);
    }
  }

  public static getColumnValues(grid: Grid, columnIndex: number): number[] {
    const values: number[] = [];
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      values.push(grid[rowIndex][columnIndex]);
    }
    return values;
  }

  public static getBoxValues(grid: Grid, rowIndex: number, columnIndex: number): number[] {
    const positions: Position[] = this.getBoxPositions(rowIndex, columnIndex);

    return positions.map(([rowIndex, columnIndex]: Position) => grid[rowIndex][columnIndex]);
  }

  public static getBoxPositions(rowIndex: number, columnIndex: number): Position[] {
    const boxIndex: number = this.getBoxIndex(rowIndex, columnIndex);

    return BOX_POSITIONS[boxIndex];
  }

  public static getBoxIndex(rowIndex: number, columnIndex: number): number {
    const numberOfRows: number = Math.floor(rowIndex / 3);
    const numberOfColumns: number = Math.floor(columnIndex / 3);

    return numberOfRows * 3 + numberOfColumns;
  }

  public static getColumns(cellGrid: Cell[][]): Cell[][] {
    const columns: Cell[][] = [];
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      for (let columnIndex: number = 0; columnIndex < 9; columnIndex++) {
        if (rowIndex === 0) columns.push([]);
        columns[columnIndex].push(cellGrid[rowIndex][columnIndex]);
      }
    }
    return columns;
  }

  public static getBoxes(cellGrid: Cell[][]): Cell[][] {
    const boxes: Cell[][] = [];
    for (let boxIndex: number = 0; boxIndex < 9; boxIndex++) {
      const box: Cell[] = this.getBoxByIndex(cellGrid, boxIndex);
      boxes.push(box);
    }
    return boxes;
  }

  public static getBoxByIndex(cellGrid: Cell[][], boxIndex: number): Cell[] {
    const mod3: number = boxIndex % 3;
    const firstRowIndex: number = boxIndex - mod3;
    const firstColumnIndex: number = mod3 * 3;

    return this.getBox(cellGrid, firstRowIndex, firstColumnIndex);
  }

  public static getBox(grid: Cell[][], firstRowIndex: number, firstColumnIndex: number): Cell[] {
    const box: Cell[] = [];

    for (let rowIndex: number = firstRowIndex; rowIndex < firstRowIndex + 3; rowIndex++) {
      for (let columnIndex: number = firstColumnIndex; columnIndex < firstColumnIndex + 3; columnIndex++) {
        box.push(grid[rowIndex][columnIndex]);
      }
    }

    return box;
  }

  public static copyGrid(grid: Grid): Grid {
    const newGrid: Grid = [];
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      newGrid.push([]);
      for (let columnIndex: number = 0; columnIndex < 9; columnIndex++) {
        newGrid[rowIndex].push(grid[rowIndex][columnIndex]);
      }
    }
    return newGrid;
  }

  public static toString(grid: Grid, emptyValue: string = '.'): string {
    let string: string = '';
    for (let row: number = 0; row < 9; row++) {
      for (let column: number = 0; column < 9; column++) {
        const value: number = grid[row][column];
        string += value === 0 ? emptyValue : String(value);
      }
    }
    return string;
  }
}
