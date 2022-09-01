import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandesPage } from './commandes.page';

const routes: Routes = [
  {
    path: '',
    component: CommandesPage
  },
  {
    path: ':id',
    loadChildren: () => import('./detail-cmde/detail-cmde.module').then( m => m.DetailCmdePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandesPageRoutingModule {}
