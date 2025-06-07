import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GastosPageRoutingModule } from './gastos-routing.module';
import { GastosPage } from './gastos.page';
import { HeaderComponent } from '../../components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastosPageRoutingModule,
    HeaderComponent,
    ReactiveFormsModule
  ],
  declarations: [GastosPage]
})
export class GastosPageModule {}
