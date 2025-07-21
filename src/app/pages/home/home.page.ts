import { Component, OnInit } from '@angular/core';
import {
  BarComponent,
  ButtonComponent,
  NotificationComponent,
  PuzzleComponent,
  PuzzleSummaryComponent,
} from '../../components';
import { Difficulty, Puzzle, PuzzleService, ValidatorService } from '../../core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ss-home',
  imports: [
    PuzzleSummaryComponent,
    PuzzleComponent,
    NgIf,
    BarComponent,
    ButtonComponent,
    NotificationComponent,
  ],
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {

  public difficulty!: Difficulty;
  public puzzle?: Puzzle;
  public isValid?: boolean;

  // TODO: Const / Enum for difficulty names
  public difficulties: Difficulty[] = [
    {name: 'Very Easy', stars: 1},
    {name: 'Easy', stars: 2},
    {name: 'Normal', stars: 3},
    {name: 'Hard', stars: 4},
    {name: 'Legendary', stars: 5},
  ];

  constructor(private puzzleService: PuzzleService, private validatorService: ValidatorService) {
  }

  public ngOnInit(): void {
    this.difficulty = this.difficulties[2];

    this.puzzleService.getPuzzle$(this.difficulty).subscribe((puzzle: Puzzle) => this.puzzle = puzzle);
  }

  public onCheckForMistakes(): void {
    this.isValid = this.validatorService.isValid(this.puzzle as Puzzle);
  }

  public onReset(): void {
    this.puzzleService.reset(this.puzzle as Puzzle);
    this.isValid = undefined;
  }
}
