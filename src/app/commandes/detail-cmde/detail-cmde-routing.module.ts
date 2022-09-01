import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCmdePage } from './detail-cmde.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCmdePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCmdePageRoutingModule {}
