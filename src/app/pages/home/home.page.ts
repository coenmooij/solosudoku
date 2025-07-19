import { Component, OnInit } from '@angular/core';
import { PuzzleSummaryComponent } from '../../components';
import { Difficulty, Position, Puzzle, PuzzleService } from '../../core';
import { PuzzleComponent } from '../../components/puzzle';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ss-home',
  imports: [
    PuzzleSummaryComponent,
    PuzzleComponent,
    NgIf,
  ],
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {

  public difficulty!: Difficulty;
  public puzzle?: Puzzle;

  // TODO: Const / Enum for difficulty names
  public difficulties: Difficulty[] = [
    {name: 'Very Easy', stars: 1},
    {name: 'Easy', stars: 2},
    {name: 'Normal', stars: 3},
    {name: 'Hard', stars: 4},
    {name: 'Legendary', stars: 5},
  ];

  constructor(private puzzleService: PuzzleService) {
  }

  public ngOnInit(): void {
    this.difficulty = this.difficulties[2];

    this.puzzleService.getPuzzle$(this.difficulty).subscribe((puzzle: Puzzle) => this.puzzle = puzzle);
  }
}
