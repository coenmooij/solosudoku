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
