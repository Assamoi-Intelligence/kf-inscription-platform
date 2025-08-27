import { Routes } from '@angular/router';
import { CompetitionList } from './competition-list/competition-list';
import { CompetitionEdit } from './competition-edit/competition-edit';
import { CompetitionAdd } from './competition-add/competition-add';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', component: CompetitionList},
  { path: 'edit/:id', component: CompetitionEdit},
  { path: 'add', component: CompetitionAdd}
];
