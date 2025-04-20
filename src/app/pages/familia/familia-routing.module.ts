import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamiliaPage } from './familia.page';

const routes: Routes = [
  {
    path: '',
    component: FamiliaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamiliaPageRoutingModule {}
