import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Difficulty } from './difficulty.interface';
import { Puzzle } from './puzzle.interface';
import { Cell } from './cell.interface';

@Injectable({providedIn: 'root'})
export class PuzzleService {
  // TODO : Yeah this should be dynamic
  private puzzle: string = '080510390651394070490000650810009435004870009000005728045638007138057200906400500';

  public getPuzzle$(difficulty: Difficulty): Observable<Puzzle> {
    return of(this.puzzle).pipe(map(this.deserialize));
  }

  public getColumns(puzzle: Puzzle): Cell[][] {
    const columns: Cell[][] = [];
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      for (let columnIndex: number = 0; columnIndex < 9; columnIndex++) {
        if (rowIndex === 0) columns.push([]);
        columns[columnIndex].push(puzzle.rows[rowIndex][columnIndex]);
      }
    }
    return columns;
  }

  public getBoxes(puzzle: Puzzle): Cell[][] {
    const boxes: Cell[][] = [];
    for (let boxIndex: number = 0; boxIndex < 9; boxIndex++) {
      const box: Cell[] = this.getBoxByIndex(puzzle, boxIndex);
      boxes.push(box);
    }
    return boxes;
  }

  public getBoxByIndex(puzzle: Puzzle, boxIndex: number): Cell[] {
    const mod3: number = boxIndex % 3;
    const firstRowIndex: number = boxIndex - mod3;
    const firstColumnIndex: number = mod3 * 3;

    return this.getBox(puzzle, firstRowIndex, firstColumnIndex);
  }

  public getBox(puzzle: Puzzle, firstRowIndex: number, firstColumnIndex: number): Cell[] {
    console.log(firstRowIndex, firstColumnIndex);
    const box: Cell[] = [];

    for (let rowIndex: number = firstRowIndex; rowIndex < firstRowIndex + 3; rowIndex++) {
      for (let columnIndex: number = firstColumnIndex; columnIndex < firstColumnIndex + 3; columnIndex++) {
        box.push(puzzle.rows[rowIndex][columnIndex]);
      }
    }

    return box;
  }

  private deserialize(serializedPuzzle: string): Puzzle {
    if (serializedPuzzle.length !== 81) throw new Error('Invalid Serialized Puzzle Length');

    const numbers: number[] = serializedPuzzle.split('').map(Number);

    const rows: Cell[][] = [];
    for (let i: number = 0; i < 9; i++) {
      rows.push([]);
      for (let j: number = 0; j < 9; j++) {
        const value: number = numbers.shift() as number;
        rows[i].push({value, wasGiven: value !== 0});
      }
    }
    return {rows};
  }
}
