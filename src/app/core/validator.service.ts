import { Injectable } from '@angular/core';
import { Puzzle } from './puzzle.interface';
import { Cell } from './cell.interface';
import { PuzzleService } from './puzzle.service';

@Injectable({providedIn: 'root'})
export class ValidatorService {

  constructor(private puzzleService: PuzzleService) {
  }

  public isValid(puzzle: Puzzle): boolean {
    return this.hasValidRows(puzzle) && this.hasValidColumns(puzzle) && this.hasValidBoxes(puzzle);
  }

  private hasValidRows(puzzle: Puzzle): boolean {
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      const setIsValid: boolean = this.validateSet(puzzle.rows[rowIndex]);

      if (!setIsValid) return false;
    }
    return true;
  }

  private hasValidColumns(puzzle: Puzzle): boolean {
    const columns: Cell[][] = this.puzzleService.getColumns(puzzle);

    for (let columnIndex: number = 0; columnIndex < columns.length; columnIndex++) {
      const setIsValid: boolean = this.validateSet(columns[columnIndex]);
      if (!setIsValid) return false;
    }
    return true;
  }

  private hasValidBoxes(puzzle: Puzzle): boolean {
    const boxes: Cell[][] = this.puzzleService.getBoxes(puzzle);

    for (let boxIndex: number = 0; boxIndex < boxes.length; boxIndex++) {
      const setIsValid: boolean = this.validateSet(boxes[boxIndex]);
      if (!setIsValid) return false;
    }
    return true;
  }

  private validateSet(set: Cell[]): boolean {
    const filteredSet: number[] = set.map((cell: Cell): number => cell.value).filter((value: number) => value !== 0);

    return new Set(filteredSet).size === filteredSet.length;
  }
}