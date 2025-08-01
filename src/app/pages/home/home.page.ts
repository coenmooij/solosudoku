import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BarComponent,
  ButtonComponent,
  NotificationComponent,
  PuzzleComponent,
  PuzzleSummaryComponent,
} from '@solosudoku/components';
import { ConfigurationService } from '@solosudoku/configuration';
import { PuzzleGenerator } from '@solosudoku/core';
import { GridHelper, GridValidator } from '@solosudoku/helpers';
import { Cell, Difficulty, Puzzle, Rating, RatingType } from '@solosudoku/models';

@Component({
  selector: 'ss-home',
  imports: [
    PuzzleComponent,
    BarComponent,
    ButtonComponent,
    NotificationComponent,
    ReactiveFormsModule,
    PuzzleSummaryComponent,
  ],
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  public puzzle?: Puzzle;
  public grid: Cell[][] = [];
  public isValid?: boolean;
  public difficultyControl: FormControl<RatingType> = new FormControl(Rating.Normal, { nonNullable: true });
  public difficulty: Difficulty = ConfigurationService.getDifficulty(Rating.Normal);
  public difficulties: Difficulty[] = ConfigurationService.getDifficulties();

  public ngOnInit(): void {
    this.onNewPuzzle();
  }

  public onCheckForMistakes(): void {
    this.isValid = GridValidator.isValid(this.grid);
  }

  public onReset(): void {
    this.isValid = undefined;

    GridHelper.resetGrid(this.grid);
  }

  public onNewPuzzle(): void {
    const puzzle: Puzzle = PuzzleGenerator.generate(this.difficultyControl.value);
    this.difficulty = ConfigurationService.getDifficulty(this.difficultyControl.value);

    this.loadPuzzle(puzzle);
  }

  private loadPuzzle(puzzle: Puzzle): void {
    this.puzzle = puzzle;
    const flatGrid: Cell[] = GridHelper.createCellGrid(puzzle.puzzle);
    this.grid = GridHelper.convertFlatGrid(flatGrid);
  }
}
