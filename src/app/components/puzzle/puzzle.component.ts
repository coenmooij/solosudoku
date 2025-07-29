import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Cell } from '@solosudoku/models';

// TODO : move to config
const numberKeys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const resetKeys: string[] = ['0', 'Backspace'];
const arrowKeys: string[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

@Component({
  selector: 'ss-puzzle',
  templateUrl: 'puzzle.component.html',
  styleUrl: 'puzzle.component.scss',
})
export class PuzzleComponent {
  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (numberKeys.includes(event.key)) this.handleNumber(Number(event.key));
    if (resetKeys.includes(event.key)) this.handleNumber(0);
    if (arrowKeys.includes(event.key)) this.handleMove(event.key);
  }

  @Input({ required: true }) public grid!: Cell[][];

  @Output() public cellUpdate: EventEmitter<void> = new EventEmitter<void>();

  public rowIndex: number = 4;
  public columnIndex: number = 4;

  public onSelectCell(rowIndex: number, columnIndex: number): void {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }

  private handleNumber(number: number): void {
    const cell: Cell = this.grid[this.rowIndex][this.columnIndex];
    if (cell.wasGiven) return;

    cell.value = number;
    this.cellUpdate.emit();
    // TODO : Handle all this in consumer
  }

  private handleMove(arrowKey: string): void {
    switch (arrowKey) {
      case 'ArrowUp':
        if (this.rowIndex === 0) return;
        this.rowIndex--;
        break;
      case 'ArrowDown':
        if (this.rowIndex === 8) return;
        this.rowIndex++;
        break;
      case 'ArrowLeft':
        if (this.columnIndex === 0) return;
        this.columnIndex--;
        break;
      case 'ArrowRight':
        if (this.columnIndex === 8) return;
        this.columnIndex++;
        break;
    }
  }
}
