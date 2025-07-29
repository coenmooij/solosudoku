import { Component, Input } from '@angular/core';

@Component({
  selector: 'ss-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
})
export class HeaderComponent {
  @Input() public image?: string;
  @Input() public brand: string = '';
  @Input() public slogan: string = '';
}
