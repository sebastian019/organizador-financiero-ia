import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPrincipalPageRoutingModule } from './menu-principal-routing.module';

import { MenuPrincipalPage } from './menu-principal.page';
//import { BotonesInicio2Component } from '../../components/botones-inicio-2/botones-inicio-2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPrincipalPageRoutingModule
  ],
  declarations: [MenuPrincipalPage]
})
export class MenuPrincipalPageModule {}
