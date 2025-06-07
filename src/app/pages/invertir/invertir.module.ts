import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvertirPageRoutingModule } from './invertir-routing.module';
import { HeaderComponent } from '../../components/header/header.component'

import { InvertirPage } from './invertir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvertirPageRoutingModule,
    HeaderComponent
  ],
  declarations: [InvertirPage]
})
export class InvertirPageModule {}
