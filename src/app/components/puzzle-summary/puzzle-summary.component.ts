import { Component, Input } from '@angular/core';

@Component({
  selector: 'ss-puzzle-summary',
  templateUrl: 'puzzle-summary.component.html',
  styleUrl: 'puzzle-summary.component.scss',
})
export class PuzzleSummaryComponent {
  @Input({ required: true }) public numberOfStars!: number;

  public maxNumberOfStars: number = 5;
  protected readonly Math = Math;
}
