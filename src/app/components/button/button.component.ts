import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ss-button',
  templateUrl: 'button.component.html',
  styleUrl: 'button.component.scss',
})
export class ButtonComponent {
  @Input() public isDisabled: boolean = false;

  @Output() public buttonClick: EventEmitter<void> = new EventEmitter<void>();

  public onClick(): void {
    if (this.isDisabled) return;

    this.buttonClick.emit();
  }
}
