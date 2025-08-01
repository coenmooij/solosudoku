import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BarComponent, ButtonComponent, NotificationComponent, PuzzleComponent } from '@solosudoku/components';
import { PuzzleGenerator } from '@solosudoku/core';
import { GridHelper, GridValidator } from '@solosudoku/helpers';
import { Bitmask, Cell, Puzzle, Rating, RatingType } from '@solosudoku/models';

@Component({
  selector: 'ss-home',
  imports: [PuzzleComponent, BarComponent, ButtonComponent, NotificationComponent, ReactiveFormsModule],
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  public puzzle?: Puzzle;
  public grid: Cell[][] = [];
  public isValid?: boolean; // TODO : Change to state object
  public difficultyControl: FormControl<RatingType> = new FormControl(Rating.Medium, { nonNullable: true });

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

    PuzzleGenerator.generate$(Rating.Tutorial).subscribe((puzzle: Puzzle) => this.loadPuzzle(puzzle));
  }

  public getDifficultyName(rating: RatingType): string {
    switch (rating) {
      case Rating.Tutorial:
        return 'Tutorial';
      case Rating.VeryEasy:
        return 'VeryEasy';
      case Rating.Easy:
        return 'Easy';
      case Rating.Hard:
        return 'Hard';
      case Rating.Legendary:
        return 'Very Hard';
      case Rating.Impossible:
        return 'Impossible';
      case Rating.Medium:
      default:
        return 'Medium';
    }
  }

  public getDifficultyStars(rating: RatingType): number {
    switch (rating) {
      case Rating.Tutorial:
        return 0.5;
      case Rating.VeryEasy:
        return 1;
      case Rating.Easy:
        return 2;
      case Rating.Medium:
        return 3;
      case Rating.Hard:
        return 4;
      case Rating.Legendary:
        return 5;
      case Rating.Impossible:
        return 6;
    }
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
