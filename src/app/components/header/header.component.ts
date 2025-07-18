import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ss-header',
  templateUrl: 'header.component.html',
  imports: [
    NgIf,
  ],
  styleUrl: 'header.component.scss',
})
export class HeaderComponent {
  @Input() public image?: string;
  @Input() public brand: string = '';
  @Input() public slogan: string = '';
}
