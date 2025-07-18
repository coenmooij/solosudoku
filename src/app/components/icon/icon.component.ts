import { Component, Input } from '@angular/core';

@Component({
  selector: 'ss-icon',
  templateUrl: 'icon.component.html',
  styleUrl: 'icon.component.scss',
})
export class IconComponent {
  @Input() public icon: string = 'home';
}
