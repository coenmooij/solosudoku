import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'ss-puzzle-summary',
  templateUrl: 'puzzle-summary.component.html',
  styleUrl: 'puzzle-summary.component.scss',
  imports: [
    NgForOf,
  ],
})
export class PuzzleSummaryComponent {
  @Input({required: true}) public numberOfStars!: number;

  public maxNumberOfStars: number = 5;
}
