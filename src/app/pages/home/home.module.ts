import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { BotonesInicioComponent } from '../../components/botones-inicio/botones-inicio.component';
import { HeaderComponent } from '../../components/header/header.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderComponent
  ],
  declarations: [HomePage,BotonesInicioComponent],
})
export class HomePageModule {}
