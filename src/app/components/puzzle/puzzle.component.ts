import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Cell, Position, Puzzle } from '../../core';
import { NgForOf } from '@angular/common';

// TODO : move to config?
const numberKeys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const resetKeys: string[] = ['0', 'Backspace'];
const arrowKeys: string[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

@Component({
  selector: 'ss-puzzle',
  templateUrl: 'puzzle.component.html',
  styleUrl: 'puzzle.component.scss',
  imports: [NgForOf],
})
export class PuzzleComponent {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (numberKeys.includes(event.key)) this.handleNumber(Number(event.key));
    if (resetKeys.includes(event.key)) this.handleNumber(0);
    if (arrowKeys.includes(event.key)) this.handleMove(event.key);
  }

  @Input({required: true}) public puzzle!: Puzzle;

  @Output() public cellUpdate: EventEmitter<void> = new EventEmitter<void>();

  public selectedCell: Position = [4, 4];

  public onSelectCell(rowIndex: number, columnIndex: number): void {
    this.selectedCell = [rowIndex, columnIndex];
  }

  private handleNumber(number: number): void {
    const cell: Cell = this.puzzle.rows[this.selectedCell[0]][this.selectedCell[1]];
    if (cell.wasGiven) return;

    cell.value = number;
    this.cellUpdate.emit();
  }

  private handleMove(arrowKey: string): void {
    switch (arrowKey) {
      case 'ArrowUp':
        if (this.selectedCell[0] === 0) return;
        this.selectedCell[0]--;
        break;
      case 'ArrowDown':
        if (this.selectedCell[0] === 8) return;
        this.selectedCell[0]++;
        break;
      case 'ArrowLeft':
        if (this.selectedCell[1] === 0) return;
        this.selectedCell[1]--;
        break;
      case 'ArrowRight':
        if (this.selectedCell[1] === 8) return;
        this.selectedCell[1]++;
        break;
    }
  }
}
