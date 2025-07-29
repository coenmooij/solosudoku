import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BarComponent, ButtonComponent, NotificationComponent, PuzzleComponent } from '@solosudoku/components';
import { PuzzleGenerator } from '@solosudoku/core';
import { GridHelper, GridValidator } from '@solosudoku/helpers';
import { Bitmask, Cell, Puzzle } from '@solosudoku/models';

@Component({
  selector: 'ss-home',
  imports: [PuzzleComponent, BarComponent, ButtonComponent, NotificationComponent, ReactiveFormsModule],
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  public puzzle?: Puzzle;
  public grid: Cell[][] = [];
  public isValid?: boolean; // TODO : Change to state object
  public difficultyControl: FormControl = new FormControl('medium');

  public ngOnInit(): void {
    this.onNewPuzzle();
  }

  public onCheckForMistakes(): void {
    this.isValid = GridValidator.isValid([]); // TODO : Implement
  }

  public onReset(): void {
    this.isValid = undefined; // TODO : Set initial state

    // TODO : Move to gridhelper
    this.grid.forEach((row: Cell[]): void =>
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

  public onNewPuzzle(): void {
    // TODO : Loading / disabled state for button / puzzle

    PuzzleGenerator.generate$(this.difficultyControl.value).subscribe((puzzle: Puzzle) => this.loadPuzzle(puzzle));
  }

  private loadPuzzle(puzzle: Puzzle): void {
    this.puzzle = puzzle;
    const flatGrid: Cell[] = GridHelper.createCellGrid(puzzle.puzzle);
    this.grid = this.convertFlatGrid(flatGrid);
  }

  // TODO : Move to GridHelper or delete
  private convertFlatGrid(flatGrid: Cell[]): Cell[][] {
    const grid: Cell[][] = [];
    for (let rowIndex: number = 0; rowIndex < 9; rowIndex++) {
      grid.push([]);
      for (let columnIndex: number = 0; columnIndex < 9; columnIndex++) {
        grid[rowIndex].push(flatGrid[rowIndex * 9 + columnIndex]);
      }
    }
    return grid;
  }
}
