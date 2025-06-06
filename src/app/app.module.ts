import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';

import { FormsModule } from '@angular/forms';
import { BotonesInicioComponent } from './components/botones-inicio/botones-inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalGraficoComponent } from './modal-grafico/modal-grafico.component';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [ModalGraficoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,HttpClientModule,NgChartsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agregar esta línea
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule {}
