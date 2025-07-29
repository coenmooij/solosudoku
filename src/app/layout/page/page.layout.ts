import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, PageComponent } from '@solosudoku/components';

@Component({
  selector: 'ss-page-layout',
  imports: [RouterOutlet, PageComponent, HeaderComponent],
  templateUrl: 'page.layout.html',
})
export class PageLayout {}
