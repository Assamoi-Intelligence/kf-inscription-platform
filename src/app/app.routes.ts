import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'competitions', pathMatch: 'full'},
  {path: 'competitions', loadChildren: () => import('./competitions/competition.routes').then(r => r.routes)}
];
