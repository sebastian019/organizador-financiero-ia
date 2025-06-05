import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaGastosPageRoutingModule } from './lista-gastos-routing.module';

import { ListaGastosPage } from './lista-gastos.page';
import { HeaderComponent } from '../../components/header/header.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaGastosPageRoutingModule,
    HeaderComponent
  ],
  declarations: [ListaGastosPage]
})
export class ListaGastosPageModule {}
