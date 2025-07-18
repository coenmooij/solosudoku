import { Routes } from '@angular/router';
import { HomePage } from './pages';
import { PageLayout } from './layout';

export const routes: Routes = [
  {path: '**', redirectTo: ''},
  {path: '', pathMatch: 'full', component: PageLayout, children: [{path: '', component: HomePage}]},
];
