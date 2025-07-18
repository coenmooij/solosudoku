import { Routes } from '@angular/router';
import { HomePage } from './pages';

export const routes: Routes = [
  {path: '**', component: HomePage},
];
