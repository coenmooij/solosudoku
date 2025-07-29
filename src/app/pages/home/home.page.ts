import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PuzzleGenerator } from '@solosudoku/core';
import { Bitmask, Cell, Puzzle } from '@solosudoku/models';
import { BarComponent, ButtonComponent, NotificationComponent, PuzzleComponent } from '../../components';
import { GridHelper, GridValidator } from '../../helpers';

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
    this.grid.forEach((row: Cell[]) =>
      row.forEach((cell: Cell) => {
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
    this.grid = GridHelper.createCellGrid(puzzle.puzzle);
  }
}
