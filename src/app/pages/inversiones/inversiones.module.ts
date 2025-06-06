import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InversionesPageRoutingModule } from './inversiones-routing.module';

import { InversionesPage } from './inversiones.page';
import { HeaderComponent } from '../../components/header/header.component'
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    InversionesPageRoutingModule,
    HeaderComponent
  ],
  declarations: [InversionesPage]
})
export class InversionesPageModule {}
