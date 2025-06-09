import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPrincipalPageRoutingModule } from './menu-principal-routing.module';
import { MenuPrincipalPage } from './menu-principal.page';
import { HeaderComponent } from '../../components/header/header.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPrincipalPageRoutingModule,
    HeaderComponent
  ],
  declarations: [MenuPrincipalPage]
})
export class MenuPrincipalPageModule {}
