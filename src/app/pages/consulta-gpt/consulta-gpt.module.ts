import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaGptPageRoutingModule } from './consulta-gpt-routing.module';

import { ConsultaGptPage } from './consulta-gpt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaGptPageRoutingModule
  ],
  declarations: [ConsultaGptPage]
})
export class ConsultaGptPageModule {}
