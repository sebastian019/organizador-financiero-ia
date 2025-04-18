import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaGptPage } from './consulta-gpt.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaGptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaGptPageRoutingModule {}
