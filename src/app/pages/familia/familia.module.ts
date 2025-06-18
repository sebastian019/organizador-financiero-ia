import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- ASEGÚRATE DE TENER ESTOS

import { IonicModule } from '@ionic/angular';

import { FamiliaPageRoutingModule } from './familia-routing.module';

import { FamiliaPage } from './familia.page';
import { HeaderComponent } from '../../components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <-- Y DE QUE ESTÉ AQUÍ
    IonicModule,
    FamiliaPageRoutingModule,
    HeaderComponent
  ],
  declarations: [FamiliaPage]
})
export class FamiliaPageModule {}