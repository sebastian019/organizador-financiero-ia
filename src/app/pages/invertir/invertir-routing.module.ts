import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvertirPage } from './invertir.page';

const routes: Routes = [
  {
    path: '',
    component: InvertirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvertirPageRoutingModule {}
